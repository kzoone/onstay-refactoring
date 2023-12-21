import { FaStar, FaStarHalf } from 'react-icons/fa';

export default function StarInput({handleClickRating, value, isHalf, isSelected}) {

  const handleClickStar = () => {
    handleClickRating(value);
  };

  return(
    <>
      <input 
        type='radio'
        name='rating'
        id={`star_${value}`}
        checked={isSelected}
        readOnly
        value={value} />
      <label 
        htmlFor={`star_${value}`}
        onClick={handleClickStar} >
      { isHalf ? <FaStarHalf /> : <FaStar />}
      </label>
    </>
  );
}