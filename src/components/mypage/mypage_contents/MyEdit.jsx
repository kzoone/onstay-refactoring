import { useEffect, useRef, useState } from 'react';
import { IoCamera } from "react-icons/io5";
import  axios  from 'axios';
import { MEMBER_REGEX, TERM_DETAIL_EVENT, INVALID_NOTI_ALERT, INVALID_NOTI_TEXT} 
from '../../../constants/constants';
import { IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import useAxiosAuth from './../../../hooks/useAxiosAuth';
import ConfirmModal from '../../../components/common/ConfirmModal'
import getImgPath from '../../../util/getImgPath';

const apiBaseUrl = process.env.REACT_APP_BACKEND_ORIGIN; 

export function MyEdit({ user_id }) {
  let [userInfo, setUserInfo] = useState({});
  let [showTermDetail, setShowTermDetail] = useState(false)
  let [form, setForm] = useState({
    user_id : '', user_email : '', user_name : '', phone : '', 
    current_pw : '', new_pw : '', new_pw_repeat : ''
  })
  const [valid, setValid] = useState({
    user_email: false, user_name: false, phone: false, user_pw_repeat: false, 
    phone: false, new_pw : false, new_pw_repeat : false})
  const [profileView, setProfileView] = useState(null)
  const [imgFile, setImgFile] = useState(null)
  let [showQuitModal, setShowQuitModal] = useState(false)
  let refElement = useRef(null);
  const axiosAuth = useAxiosAuth();


  useEffect(()=>{
      axios.get(`${apiBaseUrl}/member/userinfo/${user_id}`)
      .then(res => {
        setForm({
          ...form,
          user_id : user_id,
          user_email : res.data.user_email,
          user_name : res.data.user_name,
          phone : res.data.user_phone,
        })
        setUserInfo(res.data)
        setProfileView(res.data.user_img ? getImgPath.userProfile(res.data.user_img) : null) 
      })
      .catch((err)=>{
        console.log(err);
      })
  },[user_id]) // 유저 정보 가져오는 코드

  useEffect(()=>{
    setValid({
      ...valid,
      user_email: MEMBER_REGEX.user_email.test(form.user_email),
      user_name: MEMBER_REGEX.user_name.test(form.user_name),
      new_pw: MEMBER_REGEX.user_pw.test(form.new_pw),
      new_pw_repeat: form.new_pw === form.new_pw_repeat,
      phone: MEMBER_REGEX.phone.test(form.phone)
  })
  },[form])


  const handleChange = e => setForm({...form, [e.target.name] : e.target.value})


  const handleFileChange = e => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = e => {
        setImgFile(selectedFile);
        setProfileView(e.target.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const setProfileImgDefault = () => {
    setImgFile(null)
    setProfileView(null)
  }
  


  // 비밀번호 변경 
  const changePassword = () => {
    if (!(form.current_pw && form.new_pw)) return alert('현재 비밀번호 및 변경할 비밀번호를 모두 입력해주세요.')
    if (form.current_pw===form.new_pw) return alert('현재 비밀번호와 동일한 비밀번호로 변경할 수 없습니다.')
    if (!valid.new_pw) return alert('변경할 비밀번호를 형식에 맞게 입력해주세요.')
    if (!valid.new_pw_repeat) return alert('변경할 비밀번호와 동일한 비밀번호를 확인란에 입력해주세요')

    axiosAuth({
      url : `${apiBaseUrl}/mypage/edit/pw`,
      method : 'post',
      data : {user_id : user_id , current_pw : form.current_pw, new_pw : form.new_pw}
    })
    .then(res => {
      alert(res.data.message)
      window.location.href = '/mypage?showContent=MyEdit'
    })
    .catch(err => {
      alert(err.response.data.message)
    })
  }


  // 변경 사항 저장
  const handleSubmit = (e) => {
    e.preventDefault();

    let userInfos = ['user_id','user_email','user_name','phone'];
    let checkInfos = userInfos.slice(1) // id는 변경 불가능이라 체크할 필요 없으므로 제외함

    // valid 객체 안의 항목들이 모두 true인지 체크
    let isEditPossible = checkInfos.every(checkType => valid[checkType] === true)

    // 회원 정보 수정 불가능한 경우 (valid 안의 항목 중 하나라도 false인 경우)
    if (!isEditPossible) {
        let invalidNotiMsg = '폼 작성 내용을 다시 확인해주세요.'; // 혹시 몰라서 설정해놓은 디폴트값
        for (let checkType of checkInfos) { // 체크할 항목들을 하나하나 확인함
            if (!valid[checkType]) {
                refElement.current = document.getElementById(checkType) // submit 실패 시 focus 또는 스크롤이동할 엘리먼트
                invalidNotiMsg = INVALID_NOTI_ALERT[checkType]; // submit 실패 시 띄워줄 에러 메시지 설정
                break; 
            }
        }
        refElement.current.focus()
        return alert(invalidNotiMsg)
    }
    
    const body = new FormData();
    userInfos.forEach(info => {body.append(info, form[info])})
    body.append('file', imgFile)
    body.append('current_user_img', userInfo.user_img || null)
    body.append('isProfileDefault', profileView ? 'false' : 'true')

    axiosAuth({
      url : `${apiBaseUrl}/mypage/edit/userinfo`,
      method : 'post',
      data : body
    })
    .then(res => {
      alert(res.data.message)
      window.location.href = '/mypage?showContent=MyEdit'
    })
    .catch(err => {
      alert(err.response.data.message) 
    })
  }


  // 회원 탈퇴 확인 모달창
  const handleQuitModal = () => {
    setShowQuitModal(!showQuitModal)
  }
  // 회원 탈퇴
  const quitMember = () => {
    axiosAuth({
      url : `${apiBaseUrl}/mypage/quit`,
      method : 'delete',
      data : {user_id}
    })
    .then(res => {
      alert('회원 탈퇴되었습니다. 홈으로 이동합니다.')
      window.location.href = '/'
    })
    .catch(err => {
      alert(err.response.data.message)
    })
  }

  return (
    <div className='my_edit'>
      <h2>회원 정보 수정</h2>
      <form className='edit_form' action="" onSubmit={handleSubmit}>
        <div> 
          <div className='edit_infos'>
            <p>
              <label htmlFor="user_id">아이디 (변경 불가)</label>
              <input onChange={handleChange} value={form.user_id} type="text" name='user_id' id='user_id' disabled/>
            </p>
            <p>
              <label htmlFor="user_email">이메일</label>
              <input onChange={handleChange} value={form.user_email} type="text" name="user_email" id="user_email" placeholder="@까지 정확하게 입력하세요" />
              {(!valid.user_email && form.user_email !== '') &&
                        <small className="invalid_noti user_email">{INVALID_NOTI_TEXT.user_email}</small>}
            </p> 
            <p>
              <label htmlFor="user_name">이름</label>
              <input onChange={handleChange} value={form.user_name} type="text" name="user_name" id="user_name" placeholder="이용자 본인의 이름을 입력하세요" autoComplete='username'/>
              {(!valid.user_name && form.user_name !== '') &&
                        <small className="invalid_noti user_name">{INVALID_NOTI_TEXT.user_name}</small>}
            </p>
            <p>
              <label htmlFor="phone">휴대전화번호</label>
              <input onChange={handleChange} value={form.phone} type="phone" name="phone" id="phone" placeholder="- 없이 휴대전화 번호를 입력하세요" />
              {(!valid.phone && form.phone !== '') &&
                        <small className="invalid_noti phone">{INVALID_NOTI_TEXT.phone}</small>}
            </p>
            <p>
              <label htmlFor="user_pw">비밀번호</label>
              <input value={form.current_pw} onChange={handleChange} type="password" name="current_pw" id="current_pw" placeholder="현재 비밀번호를 입력하세요" autoComplete='current-password'/>
              <input value={form.new_pw} onChange={handleChange} type="password" name="new_pw" id="user_pw" placeholder="변경할 비밀번호를 입력하세요." autoComplete='new-password'/>
              {(!valid.new_pw && form.new_pw !== '') &&
                        <small className="invalid_noti user_pw">{INVALID_NOTI_TEXT.user_pw}</small>}
              <input value={form.new_pw_repeat} onChange={handleChange} type="password" name="new_pw_repeat" id="user_pw_repeat" placeholder="변경할 비밀번호를 한번 더 입력하세요." autoComplete='new-password' />
              {(!valid.new_pw_repeat && form.user_pw !== '') &&
                        <small className="invalid_noti user_pw_repeat">{INVALID_NOTI_TEXT.user_pw_repeat}</small>}
              <button type='button' className='black_box' onClick={changePassword}>비밀번호 변경</button>
            </p>
          </div>
          <div className='edit_photo_container'>
            <div className='edit_photo_wrapper'>
              <h3>프로필 사진</h3>
              <div className='profile_img'>
                <img src={profileView || getImgPath.userProfile(null)} alt="" />
              </div>
              <label className='profile_img_select'htmlFor="profile_img_input">
                  <IoCamera/>
              </label>
              <input id='profile_img_input' type="file" accept='image/*' name='profile_img' onChange={handleFileChange}/>
            </div>
            {profileView && 
            <button onClick={setProfileImgDefault} className='profile_set_default_btn' type='button' style={{display:'block', margin : '0 auto'}}>기본 이미지로 변경</button>}
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
          <button onClick={handleQuitModal} type='button'>회원탈퇴</button>
        </div>
      </form>
      {showQuitModal && <ConfirmModal handleModal={handleQuitModal} handleConfirm={quitMember}
      noti_1={'회원님의 모든 정보 및 쿠폰 혜택이 사라집니다'} noti_2={'정말 온스테이 하우스를 탈퇴하시겠습니까?'} />}
    </div>
  );
}