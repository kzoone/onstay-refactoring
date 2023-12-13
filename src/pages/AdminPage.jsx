import { useEffect, useState } from 'react'
import PageTitle from '../components/common/PageTitle'
import { MyPageContent } from '../components/mypage/MyPageContent'
import { MyPageGreet } from '../components/mypage/MyPageGreet'
import AdminPageNavbar from '../components/adminpage/AdminPageNavbar'
import useUserInfo from '../util/useUserInfo'
import AdminPageContent from '../components/adminpage/AdminPageContent'


export function AdminPage() {
    const user = useUserInfo({blockAccessByAuth : true, adminRequired : true})
    const [showContent, setShowContent] = useState('ManageMember')

    return user.isAdmin && (
        <main className='adminpage mypage'>
            <PageTitle title='ADMIN PAGE' />
            <MyPageGreet userName={'관리자'} isAdmin={true} />
            <div className='mypage_main_container'>
                <AdminPageNavbar setShowContent={setShowContent} showContent={showContent} />
                <AdminPageContent showContent={showContent}/>
            </div>
        </main>
    ) 
}