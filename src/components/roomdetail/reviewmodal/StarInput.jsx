import { FaStar, FaStarHalf, FaRegStar } from 'react-icons/fa';

export default function startInput({setClickRating, handleClickRating, value, isHalf, isSelected}) {

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
        value={value} />
      <label 
        htmlFor={`star_${value}`}
        onClick={handleClickStar} >
      { isHalf ? <FaStarHalf /> : <FaStar />}
      </label>
    </>
  );
}