import AccCity from './AccCity';

export default function NewAccContent(props) {
const {acc_name, area_code, min_capa, max_capa, day_diff} = props;

  return (
    <div className='new_acc_content'>
      <p>{acc_name}</p>
      <AccCity area_code={area_code} />
      <p>{min_capa} ~ {max_capa}명</p>
      <p>Open + {day_diff}일</p>
      <p>자세히 보기</p>
    </div>
  );
};