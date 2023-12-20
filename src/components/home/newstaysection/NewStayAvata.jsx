import getImgPath from '../../../util/getImgPath';

export default function NewStayAvata({acc_img}) {
  return (
      <figure>
        <img src={getImgPath.acc(acc_img)} alt='New Stay' />
      </figure>
  );
};