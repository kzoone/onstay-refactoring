import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from 'react-js-pagination';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import { BsHouseAddFill } from "react-icons/bs";
import ManageAccRegister from "./ManageAccRegister";

export default function ManageAcc() {
    const [accs, setAccs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [isModal, setIsModal] = useState(false);

    const handlePageChange = (pageNumber) => {
        console.log(pageNumber);
        setPage(pageNumber);
    };

    const getAccs = () => {
        axios
        .get(`http://localhost:8000/adminpage/accs/${page}`)
        .then((res) => {
            if(res.data){
                setAccs(res.data);
                setTotalCount(res.data[0].total_count);
            }
        })
        .catch((err) => {
            console.error('axios 에러 발생 => ' + err);
        })
    }

    useEffect(()=>{
        getAccs();
    }, [page])

    const openModal = () => {  
        if(isModal){
            closeModal();
        }else{
            setIsModal(true);
            document.querySelector('.accs_table').style.display = 'none';
            document.querySelector('.pagination_container').style.display = 'none';
            document.querySelector('.open_btn').style.display = 'none';
            document.querySelector('.manage_accs_title').innerText = '새 숙소 등록';
        }
    };
    const closeModal = () => { 
        setIsModal(false);
        document.querySelector('.accs_table').style.display = 'table';
        document.querySelector('.pagination_container').style.display = 'block';
        document.querySelector('.open_btn').style.display = 'flex';
        document.querySelector('.manage_accs_title').innerText = '숙소 관리';
    };

    

    return (
        <div>
            <div className="manage_accs">
                <span className="manage_accs_title">숙소 관리</span>
                <button className='open_btn' onClick={openModal}>
                    <BsHouseAddFill />
                    <span>추가</span>
                </button>
            </div>
            <table className='accs_table'>
                <thead>
                    <tr>
                        <th colSpan={2} className="title_acc_name">Accommodation</th>
                        <th className="title_room_name">Room</th>
                        <th className="title_room_price">Price</th>
                        <th className="title_acc_register_date">Register date</th>
                        <th className="title_edit" />
                        <th className="title_delete" />
                    </tr>
                </thead>
                <tbody>
                    {accs.map((acc, index) =>
                        <tr key={index}>
                            {index % 2 === 0 ? <td className='room_img' rowSpan={2}><img src={`assets/images/room/${acc.room_img1}`} /></td> : ''}
                            {index % 2 === 0 ? <td className="acc_name" rowSpan={index % 2 === 0 ? 2 : ''}>{acc.acc_name}</td> : ''}
                            <td className={index % 2 === 0 ? "room_name" : "room_name_anchae"}>{acc.room_name}</td>
                            <td className={index % 2 === 0 ? "room_price" : "room_price_anchae"}>₩{acc.room_price}</td>
                            <td className={index % 2 === 0 ? "acc_register_date" : "acc_register_date_anchae"}>{
                                new Date(acc.register_date).toLocaleString()
                            }</td>
                            <td className={index % 2 === 0 ? "edit" : "edit_anchae"}><button><BiSolidEditAlt /></button></td>
                            <td className={index % 2 === 0 ? "delete" : "delete_anchae"}><button><TiDeleteOutline /></button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="pagination_container">
                <Pagination
                    activePage={page}
                    itemsCountPerPage={20}  // 한 페이지에 보여줄 아이템 수
                    totalItemsCount={totalCount}   // 전체 아이템 수
                    pageRangeDisplayed={5}  // 표시할 페이지 범위 수
                    onChange={handlePageChange}
                    prevPageText='이전'
                    nextPageText='다음'
                    firstPageText={<MdKeyboardDoubleArrowLeft />}
                    lastPageText={<MdKeyboardDoubleArrowRight />}
                    itemClassPrev='prev_btn'
                    itemClassNext='next_btn'
                />
            </div>
            {isModal && <ManageAccRegister closeModal={closeModal} />}
        </div>
    ); 
}