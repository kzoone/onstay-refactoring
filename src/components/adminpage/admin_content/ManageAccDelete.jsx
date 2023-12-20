import axios from 'axios';
import useUserInfo from '../../../util/useUserInfo';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN; 

export default function ManageAccDelete({closeDeleteModal, detail}){
    const userName = useUserInfo().user_name;
    const accId = detail[0]?.acc_id || '';
    const roomName = detail[0]?.room_name || '';

    const handleDelete = () => {
        axios  
        .delete(`${apiBaseUrl}/adminpage/accs/delete`,{
           data: {accId, roomName}
        })
        .then((res) => {
            alert('삭제되었습니다.');
            window.location.reload();
        })
        .catch((error) => {
            console.error('axios delete 에러 발생 => ', error);
        })
    }

    return(
        <div className="modal_container">
            <div className="delete_confirm">
                <div className='logo_img'>
                    <img src="/assets/images/main_logo.png" />
                </div>  
                <div className='delete'>
                    <p>{userName} 관리자님</p>
                    <p>선택한 객실은 <span>{detail[0]?.acc_name || ''}</span> 의</p>
                    <p><span>{detail[0]?.room_name || ''}</span> 입니다.</p>
                    <p>정말 삭제하시겠습니까?</p>
                </div>
                <div className="btns">
                    <button type="button" onClick={closeDeleteModal}>취소</button>
                    <button type="button" onClick={handleDelete}>삭제</button>
                </div>
            </div>
        </div>
    );
}