

export default function MyContentNavbar(props) {

    const handleClick = e => props.setCategory(e.target.dataset.category)

    return (
        <ul className="mypage_content_navbar">
            <li
              onClick={handleClick}
              data-category={props.contents[0]}
              className={props.category === props.contents[0] ? 'active' : ''}
            >
              {props.contents_string[0]}
            </li>
            <li
              onClick={handleClick}
              data-category={props.contents[1]}
              className={props.category === props.contents[1]? 'active' : ''}
            >
              {props.contents_string[1]}
            </li>
      </ul>
    );
}