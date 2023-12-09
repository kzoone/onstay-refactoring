import React, { useEffect, useState } from 'react';
import Acc from './Acc';
import axios from "axios";
import useUserInfo from '../../util/useUserInfo';

export default function AccList({accs, location, codeinfo, locationName, handleLove}){

    const userId = useUserInfo().user_id;
    const [userLovedAccs, setUserLovedAccs] = useState([]);

    const getUserIsLovedAccs = () => {
        axios
        .get(`http://localhost:8000/findstay/love/${userId}`)
        .then((res) => {
            const accIds = res.data.map(accs => accs.acc_id);
            setUserLovedAccs(accIds);
        })
        .catch((err) => {
            console.error('axios get 에러 발생 => ' + err);
        })
    }

    useEffect(() => {
        if(userId !== null){
            getUserIsLovedAccs();
        }
    }, [userId]);

    return(
        <>
        <div className='acc_list'>
            {accs.length > 0 ? (
                accs.map((acc) => 
                <React.Fragment key={acc.acc_id}>
                    <Acc acc={acc} location={location} codeinfo={codeinfo} locationName={locationName} userId={userId} handleLove={handleLove} userLoved={userLovedAccs.includes(acc.acc_id)} getUserIsLovedAccs={getUserIsLovedAccs} />
                </React.Fragment>
                )
            ) : (
                <p className='nothing'>조건에 해당하는 숙소가 없습니다.</p>
            )}
        </div>
        </>
    );
};