import { FaStar, FaStarHalf, FaRegStar } from 'react-icons/fa';

export default function startInput({setClickRating, handleClickRating, value, isHalf}) {

  const handleClickStar = () => {
    handleClickRating(value);
  };

  return(
    <>
      <label 
        htmlFor={`star_${value}`}
        onClick={handleClickStar}
        isHalf={isHalf}>
      { isHalf ? <FaStarHalf /> : <FaStar />}
      </label>
      <input 
        type='radio'
        name='rating'
        id={`star_${value}`}
        value={value} />
    </>
  );
}