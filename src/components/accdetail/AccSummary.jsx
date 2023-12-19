import axios from "axios";
import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";


export function AccSummary() {
    const [accSummary, setAccSummary] = useState({});
    const {accid} = useParams();

    useEffect(() =>{
        axios
        .get(`http://localhost:8000/findstay/acc/${accid}/summary`)
        .then((result) => {
            setAccSummary(result.data);
        })
        .catch((error) => console.log(error));
    }, [accid]);
    return(
        <div className="summary-whole-container">
            <div className="summary-container">
                <div className="summary-title">{accSummary.acc_name}</div>
                <div className="summary-subtitle">온스테이</div>
                <div className="border"></div>
                <div className="summary-top">{accSummary.acc_summary1}</div>
                <div className="summary-bottom">{accSummary.acc_summary2}</div>
            </div>
        </div>
    );
}