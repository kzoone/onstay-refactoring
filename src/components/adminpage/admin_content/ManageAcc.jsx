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
import ManageAccDetail from './ManageAccDetail';

export default function ManageAcc() {
    const [accs, setAccs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [isInsertModal, setIsInsertModal] = useState(false);
    const [isDetailModal, setIsDetailModal] = useState(false);
    const [selectedAccId, setSelectedAccId] = useState('');
    const [selectedRoomName, setSelectedRoomName] = useState('');
    const [detail, setDetail] = useState([]);

    /* 리스트, 페이지네이션 */
    const handlePageChange = (pageNumber) => {
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

    /* 숙소 등록 모달 */
    const openInsertModal = () => {  
        if(isInsertModal){
            closeInsertModal();
        }else{
            setIsInsertModal(true);
            document.querySelector('.accs_table').style.display = 'none';
            document.querySelector('.pagination_container').style.display = 'none';
            document.querySelector('.open_btn').style.display = 'none';
            document.querySelector('.manage_accs_title').innerText = '숙소 등록';
        }
    };
    const closeInsertModal = () => { 
        setIsInsertModal(false);
        document.querySelector('.accs_table').style.display = 'table';
        document.querySelector('.pagination_container').style.display = 'block';
        document.querySelector('.open_btn').style.display = 'flex';
        document.querySelector('.manage_accs_title').innerText = '숙소 관리';
    };

    /* 상세 정보 모달 */
    const handleTrClick = (acc) => {
        setSelectedAccId(acc.acc_id);
        setSelectedRoomName(acc.room_name);
    };

    useEffect(() => {
        if (selectedAccId && selectedRoomName) {
            getDetail();
            openDetailModal();
        }
    }, [selectedAccId, selectedRoomName]);

    const openDetailModal = () => {
        if(isDetailModal){
            closeDetailModal();
        }else{
            setIsDetailModal(true);
            document.querySelector('.accs_table').style.display = 'none';
            document.querySelector('.pagination_container').style.display = 'none';
            document.querySelector('.open_btn').style.display = 'none';
            document.querySelector('.manage_accs_title').innerText = '상세 정보';
        }
    }
    const closeDetailModal = () => { 
        setIsDetailModal(false);
        document.querySelector('.accs_table').style.display = 'table';
        document.querySelector('.pagination_container').style.display = 'block';
        document.querySelector('.open_btn').style.display = 'flex';
        document.querySelector('.manage_accs_title').innerText = '숙소 관리';
    };

    const getDetail = () => {
        axios({
            url : `http://localhost:8000/adminpage/accs/detail/`,
            method : 'get',
            params: { accId: selectedAccId, roomName: selectedRoomName }
        })
        .then((res) => {
            if(res.data){
                setDetail(res.data);
                console.log(res.data);
            }
        })
        .catch((err) => {
            console.error('axios 에러 발생 => ' + err);
        })
    }

    return (
        <div>
            <div className="manage_accs">
                <span className="manage_accs_title">숙소 관리 ( {totalCount}개의 객실 )</span>
                <button className='open_btn' onClick={openInsertModal}>
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
                        <tr key={index} onClick={() => handleTrClick(acc)} style={index%2===0?{background:'rgb(234,234,234)'}:{background:'none'}}>
                            <td className='room_img'><img src={`assets/images/room/${acc.room_img1}`} /></td>
                            <td className="acc_name">{acc.acc_name}</td>
                            <td className='room_name'>{acc.room_name}</td>
                            <td className='room_price'>₩{acc.room_price}</td>
                            <td className='acc_register_date'>{
                                new Date(acc.register_date).toLocaleString()
                            }</td>
                            <td className='edit'><button><BiSolidEditAlt /></button></td>
                            <td className='delete'><button><TiDeleteOutline /></button></td>
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
            {isInsertModal && <ManageAccRegister closeInsertModal={closeInsertModal} />}
            {isDetailModal && <ManageAccDetail closeDetailModal={closeDetailModal} detail={detail} />}
            
        </div>
    ); 
}