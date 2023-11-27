import AccCity from '../../newstay/AccCity';

export default function NewStayContent(props) {
  return (
    <>
      <div className=''>
        <p>{props.acc_name}</p>
        <AccCity area_code={props.area_code} />
      </div>
      <p>{props.acc_summary1}</p>
    </>
  );
};