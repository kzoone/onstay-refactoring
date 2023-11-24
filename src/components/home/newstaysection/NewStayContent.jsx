export default function NewStayContent(props) {
  const codeinfo = {
    1: '서울',
    2: '강원',
    3: '부산',
    4: '경기',
    5: '충북',
    6: '충남',
    7: '경북',
    8: '경남',
    9: '전북',
    10: '전남',
    11: '인천',
    12: '광주',
    13: '대전',
    14: '대구',
    15: '제주',
  };

  const city = codeinfo.hasOwnProperty(props.area_code) ? ('| ' + codeinfo[props.area_code]) : ''

  return (
    <>
      <div>
        <p>{props.acc_name}</p>
        <p>{city}</p>
      </div>
      <p>{props.acc_summary1}</p>
    </>
  );
};