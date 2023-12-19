import { useState } from 'react'
import PageTitle from '../components/common/PageTitle'
import { MyPageGreet } from '../components/mypage/MyPageGreet'
import AdminPageNavbar from '../components/adminpage/AdminPageNavbar'
import useUserInfo from '../util/useUserInfo'
import AdminPageContent from '../components/adminpage/AdminPageContent'
import { useLocation } from 'react-router-dom'


export function AdminPage() {
    const location = useLocation()
    let defaultShowContent = new URLSearchParams(location.search).get('showContent') || 'ManageMember'
    const user = useUserInfo({blockAccessByAuth : true, adminRequired : true})
    const [showContent, setShowContent] = useState(defaultShowContent)

    return user.isAdmin && (
        <main className='adminpage mypage'>
            <PageTitle title='ADMIN PAGE' />
            <MyPageGreet userName={`${user.user_name} 관리자`} isAdmin={true} />
            <div className='mypage_main_container'>
                <AdminPageNavbar setShowContent={setShowContent} showContent={showContent} />
                <AdminPageContent showContent={showContent}/>
            </div>
        </main>
    ) 
}