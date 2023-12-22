import { useEffect, useState } from 'react';
import axios from 'axios';
import MyContentNavbar from '../mypage_common/MyContentNavbar';
import Pagination from 'react-js-pagination';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN;

export function MyCoupon({ user_id }) {
  let [category, setCategory] = useState('valid')
  let [coupons, setCoupons] = useState([])
  let [page, setPage] = useState(1)

  useEffect(() => {
    axios.get(`${apiBaseUrl}/mypage/coupons/${user_id}`)
      .then(res => {
        if (category === 'valid') {
          setCoupons(res.data)
        } else { // 현재 테이블에 만료 기한 컬럼이 없어, 임시로 만료쿠폰 리스트 선택한 경우 빈 배열 반환하도록 함
          setCoupons([])
        }
      })
      .catch(err => {
        console.log(err);
      })
  }, [user_id, category])

  const handleSubmit = (e) => {
    e.preventDefault();
    return alert('준비중입니다.')
  }

  const handlePage = page => setPage(page)

  return (
    <div className='my_coupon'>
      <MyContentNavbar contents={['valid', 'invalid']} contents_string={['보유 쿠폰', '만료된 쿠폰']}
        category={category} setCategory={setCategory} />

      {coupons.length ?
        <div className='coupon_list_container'>
          {coupons.slice((page - 1) * 3, page * 3).map(coupon =>
            <div className='coupon_wrapper' key={coupon.coupon_id}>
              <span className='discount_price'>{coupon.discount_price.toLocaleString()}원</span>
              <span className='coupon_name'>{coupon.coupon_name}</span>
              <small className='coupon_expire_date'>만료일자 : 2024-12-23 </small>
              <small className='pay_price_min'>100,000원 이상 결제 시 사용가능</small>
            </div>)}
        </div> : null}

      {!coupons.length ? 
      <div className='coupon_nolist'>
        <div>{category === 'valid' ? '보유한 쿠폰이 없습니다.' : '만료된 쿠폰 내역이 없습니다.'}</div>
      </div> : null}

      {coupons.length ? <div className='border_pagination'>
        <Pagination
          activePage={page}
          itemsCountPerPage={3}
          totalItemsCount={coupons.length}
          pageRangeDisplayed={5}
          prevPageText={"<"}
          nextPageText={">"}
          onChange={handlePage}
        />
      </div> : null}

    </div>
  );
}