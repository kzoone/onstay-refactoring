import { useState, useEffect } from "react";
import axios from "axios";

export default function ManageAcc() {
    const [accs, setAccs] = useState([]);

    useEffect(()=>{
        axios
        .get('http://localhost:8000/adminpage/accs')
        .then((res) => {
            if(res.data){
                setAccs(res.data);
            }
        })
        .catch((err) => {
            console.error('axios 에러 발생 => ' + err);
        })
    }, [])

    return (
        <div className="manage_accs">
            <table className='accs_table'>
                <thead>
                    <tr>
                        <th>숙소명</th>
                        <th>객실명</th>
                        <th>가격</th>
                        <th>숙소등록날짜</th>
                        <th>지역</th>
                        {/* <th>이미지</th> */}
                    </tr>
                </thead>
                <tbody>
                    {accs.map((acc) =>
                        <tr>
                            <td className="acc_name">{acc.acc_name}</td>
                            <td className="room_name">{acc.room_name}</td>
                            <td className="room_price">₩{acc.room_price}</td>
                            <td className="acc_register_date">{
                                new Date(acc.register_date).toLocaleString()
                            }</td>
                            <td className="acc_area_code">{acc.area_code}</td>
                            {/* <td className="acc_img"><img src={`assets/images/room/${acc.room_img1}`} /></td> */}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    ); 
}