import { useState } from 'react';
import { MyPageGreet } from '../components/mypage/MyPageGreet';
import PageTitle from './../components/common/PageTitle';
import useUserInfo from './../util/useUserInfo';
import { Link, useLocation } from 'react-router-dom';
import { MyPageNavbar } from './../components/mypage/MyPageNavbar';
import { MyPageContent } from '../components/mypage/MyPageContent';

export function MyPage() {
    const location = useLocation();
    let [showContent, setShowContent] = useState(location.state?.showContent || 'MyReservation')
    const user = useUserInfo();

    return (
        <main className="mypage">
            <PageTitle title='MY PAGE' />
            <MyPageGreet userName={user.user_name} />
            <div className='mypage_main_container'>
                <MyPageNavbar setShowContent={setShowContent} showContent={showContent} />
                <MyPageContent user_id={user.user_id} showContent={showContent} />
            </div>
        </main>
    )
}
