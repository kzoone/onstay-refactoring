import React from 'react';
import CategorySwiper from './CategorySwiper';
import CategoryTitle from './CategoryTitle';

const category = [
  { key:'1', type : 'only', className: 'content_category_1'},
  { key:'2', type : 'price', className: 'content_category_2' }
]

export default function ContentCategory() {
  return(
    <section className='category_section'> 
    { category.map(category => (
      <div key={category.key} className={`content_category ${category.className}`}>
        <CategoryTitle type={category.type} />
        <CategorySwiper type={category.type} />
      </div>
    ))}
    </section>
  );
}