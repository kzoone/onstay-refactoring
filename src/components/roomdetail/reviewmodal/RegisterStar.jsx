import React from 'react';
import StarInput from './StarInput';

export default function RegisterStar({setClickRating, handleClickRating, initialRating}) {
  const inputValues = [ { score : 0.5, isHalf : true }, 
                        { score : 1, isHalf : false }, 
                        { score : 1.5, isHalf : true }, 
                        { score : 2, isHalf : false }, 
                        { score : 2.5, isHalf : true }, 
                        { score : 3, isHalf : false }, 
                        { score : 3.5, isHalf : true }, 
                        { score : 4, isHalf : false }, 
                        { score : 4.5, isHalf : true }, 
                        { score : 5, isHalf : false } ]

  return(
    <div className='star_wrap'>
    {
      inputValues.reverse().map(input => (
        <React.Fragment key={input.score}>
          <StarInput setClickRating={setClickRating}
                      handleClickRating={handleClickRating}
                      value={input.score}
                      isHalf={input.isHalf} 
                      isSelected={initialRating !== null && initialRating == input.score} />
        </React.Fragment>
      ))
    }
    </div>
  );
}