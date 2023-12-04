export function MyQNAForm({user_id}) {

  return (
    <form>
      <p>
        <label htmlFor="qna_title">제목</label>
        <input type="text" id='qna_title'/>
      </p>
      <p>
        <label htmlFor="qna_content">문의 내용</label>
        <textarea id='qna_content'/>
      </p>
    </form>
  );
}

export default MyQNAForm