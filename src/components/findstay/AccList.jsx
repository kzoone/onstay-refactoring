import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Acc from './Acc';

export default function AccList(){
    /**
     * 전체 숙소 리스트 출력
     */
    const [accList, setAccList] = useState([]);

    useEffect(() => {
        axios
        .get('http://localhost:8000/findstay/')
        .then((res) => {
            setAccList(res.data);
        })
        .catch((err) => {
            console.error('axios 에러 발생 => ',err);
        })
    }, []);

    return(
        <div className="acc_list">
            {accList.map(acc => 
                <Acc key={acc.acc_id} acc={acc} />
            )}
        </div>
    );
};