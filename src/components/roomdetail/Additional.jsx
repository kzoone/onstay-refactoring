import React from "react";

export default function Additional({str, type, title}) {
  const features = ['빅테이블', '정원', '테라스', '독립 키친', '독립 화장실', '산책로', '샤워실', 'BBQ'];

  return (
    <>
      <div className={`${type}_container common_container`}>
        <p className='title'>{title}</p>
        <div className='info'>
          { type === 'features' ? 
            ( str.map((code, idx) => (
              code ? (
                <div key={code}>
                  <img src={`/assets/images/features/${parseInt(code)}.png`} alt="" />
                  <p className="features">{features[parseInt(code - 1)]}</p>
                </div>
                ) : null
              ))) 
            : ( str.map(p => ( <p className="amenities" key={p}>{p}</p> )))
          } 
        </div>
      </div>
    </>
  );
}