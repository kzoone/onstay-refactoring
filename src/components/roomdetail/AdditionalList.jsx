import Additional from './Additional';

export default function AdditionalList(props) {  
  const featureCodes = props.featureCodes || '';
  const amenities = props.amenities || '';

  let featureCodesStr = featureCodes.split(',');
  let amenitiesStr = amenities.split(',');

  return(
    <>
    <Additional str={featureCodesStr} type='features' title='FEATURES'/>
    <Additional str={amenitiesStr} type='amenities' title='AMENITIES'/>
  </>
  );
}