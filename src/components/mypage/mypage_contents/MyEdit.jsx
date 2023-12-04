import { useEffect, useRef, useState } from 'react';
import { IoCamera } from "react-icons/io5";
import  axios  from 'axios';
import { TERM_DETAIL_EVENT } from '../../../constants/constants';
import { IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';

export function MyEdit({ user_id }) {
  let [userInfo, setUserInfo] = useState({})
  let [showTermDetail, setShowTermDetail] = useState(false)
  let [form, setForm] = useState({
    user_id : '', user_email : '', user_name : '', current_pw : '', 
    new_pw : '', new_pw_repeat : '', phone : ''
  })


  useEffect(()=>{
    axios.get('http://localhost:8000/member/userinfo/' + user_id)
    .then(res => {
      setForm({
        ...form,
        user_id : user_id,
        user_email : res.data.user_email,
        user_name : res.data.user_name,
        phone : res.data.user_phone,
      })
      setUserInfo(res.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])


  const handleChange = e => setForm({...form, [e.target.name] : e.target.value})

  return (
    <div className='my_edit'>
      <h2>회원 정보 수정</h2>
      <form className='edit_form' action="">
        <div> 
          <div className='edit_infos'>
            <p>
              <label htmlFor="user_id">아이디 (변경 불가)</label>
              <input onChange={handleChange} value={form.user_id} type="text" name='user_id' id='user_id' disabled/>
            </p>
            <p>
              <label htmlFor="user_email">이메일</label>
              <input onChange={handleChange} value={form.user_email} type="text" name="user_email" id="user_email" placeholder="@까지 정확하게 입력하세요" />
            </p>
            <p>
              <label htmlFor="user_name">이름</label>
              <input onChange={handleChange} value={form.user_name} type="text" name="user_name" id="user_name" placeholder="이용자 본인의 이름을 입력하세요" />
            </p>
            <p>
              <label htmlFor="phone">휴대전화번호</label>
              <input onChange={handleChange} value={form.phone} type="text" name="phone" id="phone" placeholder="- 없이 휴대전화 번호를 입력하세요" />
            </p>
            <p>
              <label htmlFor="user_pw">비밀번호</label>
              <input onChange={handleChange} type="password" name="current_pw" id="current_pw" placeholder="현재 비밀번호를 입력하세요" />
              <input onChange={handleChange} type="password" name="new_pw" id="new_pw" placeholder="변경할 비밀번호를 입력하세요." />
              <input onChange={handleChange} type="password" name="new_pw_repeat" id="new_pw_repeat" placeholder="변경할 비밀번호를 한번 더 입력하세요." />
              <button type='button' className='black_box'>비밀번호 변경</button>
            </p>
          </div>
          <div className='edit_photo_container'>
            <div className='edit_photo_wrapper'>
              <h3>프로필 사진</h3>
              <div className='profile_img'>
                <img src="" alt="" />
              </div>
              <label className='profile_img_select'htmlFor="profile_img_input">
                  <IoCamera/>
              </label>
              <input id='profile_img_input' type="file" accept='image/*' />
            </div>
          </div>
        </div> {/** 레이아웃용 컨테이너 - 기본정보, 프로필사진 */}

        <div className='term_service'>
            <div>
             <input className='join_checkbox option' type="checkbox" id='term_event' name='event'/> 
              <label htmlFor="term_event">쿠폰,이벤트 등 혜택 알림 동의 (선택)</label>
              <button type='button'  className='term_detail_btn' data-term='event' onClick={()=>setShowTermDetail(!showTermDetail)}>
                {showTermDetail ? <IoIosArrowUp/> : <IoIosArrowDown/>}
              </button>
            </div> 
            {showTermDetail && <div className='term_detail'>{TERM_DETAIL_EVENT}</div>}
        </div> {/** 이용약관 컨테이너 */}
        
        <div className='edit_submit_btn'>
          <button type='submit' className='black_box'>저장하기</button>
        </div>
        <div className='edit_quit_btn'>
          <button type='button'>회원탈퇴</button>
        </div>
      </form>
    </div>
  );
}