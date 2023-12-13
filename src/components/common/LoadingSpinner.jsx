import Spinner from 'react-bootstrap/Spinner';

export default function LoadingSpinner(props) {
    return (
        <div className='loading_spinner_container'>
            <div className='loading_spinner_wrapper'>
                <Spinner className='loading_spinner'/>
                <span>{props.text}</span>
            </div>
        </div>

    );
}