import { useEffect, useRef, useState } from 'react';
import { IoCamera } from "react-icons/io5";
import  axios  from 'axios';

export function MyEdit({ user_id }) {
  let [form, setForm] = useState({
    user_id : '', user_email : '', user_name : '', current_pw : '', 
    new_pw : '', new_pw_repeat : '', phone : ''
  })


  useEffect(()=>{
    axios.get('http://localhost:8000/member/userinfo/' + user_id)
    .then(res => {
      setForm({
        ...form,
        user_id : user_id,
        user_email : res.data.user_email,
        user_name : res.data.user_name,
        phone : res.data.user_phone,
      })
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])


  const handleChange = e => {setForm({...form, [e.target.name] : e.target.value}); console.log(form);}

  return (
    <div className='my_edit'>
      <h2>회원 정보 수정</h2>
      <form className='edit_form' action="">
        <div className='edit_infos'>
          <p>
            <label htmlFor="user_id">아이디</label>
            <input onChange={handleChange} value={form.user_id} type="text" name='user_id' id='user_id' disabled/>
          </p>
          <p>
            <label htmlFor="user_email">이메일</label>
            <input onChange={handleChange} value={form.user_email} type="text" name="user_email" id="user_email" placeholder="@까지 정확하게 입력하세요" />
          </p>
          <p>
            <label htmlFor="user_name">이름</label>
            <input onChange={handleChange} value={form.user_name} type="text" name="user_name" id="user_name" placeholder="이용자 본인의 이름을 입력하세요" />
          </p>
          <p>
            <label htmlFor="user_pw">비밀번호</label>
            <input onChange={handleChange} type="password" name="user_pw" id="user_pw" placeholder="비밀번호를 입력하세요" />
            <input onChange={handleChange} type="password" name="user_pw_repeat" id="user_pw_repeat" placeholder="비밀번호를 한번 더 입력하세요." />
          </p>
          <p>
            <label htmlFor="phone">휴대전화번호</label>
            <input onChange={handleChange} value={form.phone} type="text" name="phone" id="phone" placeholder="- 없이 휴대전화 번호를 입력하세요" />
          </p>
        </div>
        <div className='edit_photo_container'>
          <div className='edit_photo_wrapper'>
            <h3>프로필 사진</h3>
            <div className='profile_img'>
              <img src="" alt="" />
            </div>
            <label className='profile_img_select'htmlFor="profile_img_input">
                <IoCamera/>
            </label>
            <input id='profile_img_input' type="file" accept='image/*' />
          </div>
        </div>
      </form>
    </div>
  );
}