export function Join() {

    return (
        <div style={{ margin: '0 auto', width: '43vh', padding: '0 2vh', paddingBottom: '5vh' }}>
            <div className="member_title">
                <h2>JOIN</h2>
                <span>회원가입</span>
            </div>

            <form className="join_form member_form" action="">
                <p>
                    <label htmlFor="user_email">이메일</label>
                    <input type="text" name="user_email" id="user_email" placeholder="@까지 정확하게 입력하세요" />
                    <small className="input_check_error">이메일 형식이 올바르지 않습니다</small>
                    <button type="button">중복체크</button>
                </p>
                <p>
                    <label htmlFor="user_name">이름</label>
                    <input type="text" name="user_name" id="user_name" placeholder="이용자 본인의 이름을 입력하세요" />
                    <small className="input_check_error">1자 이상 30자 이하의 한글 및 영문으로 입력해주세요</small>
                </p>
                <p>
                    <label htmlFor="user_pw">비밀번호</label>
                    <input type="password" name="user_pw" id="user_pw" placeholder="비밀번호를 입력하세요" />
                    <small className="input_check_error">영문, 숫자, 특수문자를 모두 포함하여 6~18자로 입력해주세요.</small>
                    <input type="password" name="user_pw" id="user_pw_conf" placeholder="비밀번호를 한번 더 입력하세요." />
                    <small className="input_check_error user-pw-conf">비밀번호가 일치하지 않습니다.</small>
                </p>
                <p>
                    <label htmlFor="phone">휴대전화 번호</label>
                    <input type="text" name="phone" id="phone" placeholder="- 없이 휴대전화 번호를 입력하세요" />
                    <small className="input_check_error">휴대전화 형식이 올바르지 않습니다</small>
                </p>

                <button className="join_btn black_btn">회원가입</button>
                <button className="login_btn white_btn">로그인</button>
            </form>
        </div>
    );
}