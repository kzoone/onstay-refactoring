import AccCity from './AccCity';

export default function NewAccContent(props) {
  return (
    <div className="new_acc_content">
      <p>{props.acc_name}</p>
      <AccCity area_code={props.area_code} />
    </div>
  );
};