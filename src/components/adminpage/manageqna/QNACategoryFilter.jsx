import { FaFilter } from "react-icons/fa";
import { QUESTION_CATEGORY } from '../../../constants/constants';

export default function QNACategoryFilter ({categoryFilter, setCategoryFilter}) {
   
    const handleFilterModal = () => {
        setCategoryFilter({...categoryFilter, modalShow : !categoryFilter.modalShow})
      }

    const handleCategoryFilter = e => {
        setCategoryFilter({
          ...categoryFilter, 
          showCategory:{...categoryFilter.showCategory, [e.target.dataset.category] : !categoryFilter.showCategory[e.target.dataset.category]}})
    }

    return (
    <div className='qna_category_filter'>
        <button className={categoryFilter.modalShow ? 'active' : ''} type='button' onClick={handleFilterModal}>
          <FaFilter/><span>문의 유형</span>
        </button>
        <form className={`${categoryFilter.modalShow ? 'active' : ''}`} action="">
          <h4>표시할 카테고리</h4>
          
          {Object.entries(QUESTION_CATEGORY).map(arr => {
            let [code, title] = arr
          return(
            <p key={code}>
              <label htmlFor={`cateogry${code}`}>{title}</label>
              <input type="checkbox" data-category={code} id={`cateogry${code}`} onChange={handleCategoryFilter}
              checked={categoryFilter.showCategory[code]}/>
            </p>
          )
          })}
        </form>
      </div>
    );
}