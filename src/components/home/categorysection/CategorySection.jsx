import React from 'react';
import CategorySwiper from './CategorySwiper';

export default function ContentCategory() {
  return(
    <section className='category_section'> 
        <CategorySwiper type='only'/>
        <CategorySwiper type='price'/>
    </section>
  );
}