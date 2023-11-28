import { useState } from "react";
import PageTitle from '../components/common/PageTitle';
import SubCategory from '../components/newstay/SubCategory';
import NewAcc from '../components/newstay/NewAcc';
import PrePare from '../components/newstay/Prepare';

export function NewStay() {
  const [tab, setTab] = useState(1);
  const subCategories = [
    { id: 1, cateName: '신규 오픈' },
    { id: 2, cateName: '공개 예정' }
  ];

  const handleTabClick = (tabId) => {
    setTab(tabId)
  }

  return (
    <div className='new_stay_page'>
      <PageTitle title='NEW STAY' subtitle='온 스테이 하우스가 선보이는 신규 스테이' />
      <SubCategory subCategories={subCategories} tab={tab} onClick={handleTabClick} />
      {tab === subCategories[0].id && <NewAcc />}
      {tab === subCategories[1].id && <PrePare />}
    </div>
  );
};