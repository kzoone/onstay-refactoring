import { useState } from "react";

export default function SubCategory(props) {
  const [tab, setTab] = useState(1);
  const subCategories = props.subCategories;

  const handleTabClick = (tabId) => {
    setTab(tabId)
  }

  return (
    <ul className='new_stay_tap'>
      {subCategories.map((category) =>
        <li key={category.id}>
          <button type="button" className={tab === category.id ? 'active' : ''}
            onClick={() => handleTabClick(category.id)}>{category.cateName}</button>
        </li>)}
    </ul>
  );
};