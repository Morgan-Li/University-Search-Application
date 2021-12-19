import { Link } from "react-router-dom";
import "./singleUni.css";

export default function singleUni() {
  return (
    <div className="uniPage">
        <div className="uniPageWrapper">
            <h1 className="uniNameTitle">
                University of Calgary
            </h1>
            <div className="uniPageInfo">
                Rank: 1
                Location: Calgary Alberta Canada
            </div>
        </div>
      
    </div>
  );
}