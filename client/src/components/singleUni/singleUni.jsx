
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singleUni.css";

export default function SingleUni() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [uni, setUni] = useState({});
  const { user } = useContext(Context);
  const [Username, setUsername] = useState("");
  const [Uname, setUname] = useState("");
  const [rank, setRank] = useState("");
  const [uniLocation, setLocation] = useState("");
  const [DFRatio, setDom_Frgn_Ratio] = useState("");
  const [DFCalc, setDFCalc] = useState(0);
  const [PriLang, setPriLang] = useState("");
  const [FTutition_Range, setFTutition_Range] = useState("");
  const [DTutition_Range, setDTutition_Range] = useState("");
  const [Website, setWebsite] = useState("");
  const [Type, setType] = useState("");
  const [Programs, setPrograms] = useState([]);
  const [Comments, setComments] = useState([]);
  const [AlreadySaved, setAlreadySaved] = useState("");

  const [Description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/uniPages/comment", {
        Uname,
        Username,
        Description,
      });
      res.data && window.location.reload();
    } catch (err) {
    }
  };
  
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/watchlist", {
        username: user.username,
        Rank: rank,
        Uname: Uname,
        Location: uniLocation,
        UniID: path,
      });
      res.data && window.location.reload();
    } catch (err) {
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete("/watchlist/alreadySaved", {params: {
        username: user.username,
        UniID: path,
      }});
      res.data && window.location.reload();
    } catch (err) {
    }
  };

  useEffect(() => {
    const getUni = async () => {
      const res = await axios.get("/uniPages/" + path);
      {user && (setUsername(user.username))};
      setUni(res.data);
      setUname(res.data.Uname);
      setRank(res.data.Rank);
      setLocation(res.data.Location);
      setDom_Frgn_Ratio(res.data.Dom_Frgn_Ratio);
      setDFCalc(100-res.data.Dom_Frgn_Ratio);
      setPriLang(res.data.PriLang);
      setFTutition_Range(res.data.FTutition_Range);
      setDTutition_Range(res.data.DTutition_Range);
      setWebsite(res.data.Website);
      setType(res.data.Type);
      setPrograms(res.data.Prog_Offered);
      const res2 = await axios.get("/uniPages/" + path + "/comment", {params: {UniName: res.data.Uname}});
      setComments(res2.data);
      const res3 = await axios.get("/watchlist/alreadySaved", {params: {username: user.username, UniID: path}});
      setAlreadySaved(res3.data);
    };
    getUni();
  }, [path]);

  return (
    <div>
      <div className="uniPage">
          <div className="uniPageWrapper">
              <h1 className="uniNameTitle">
                <u><a href={Website} target="_blank" rel="noopener noreferrer" className="link">
                  {Uname}
                </a></u>
              </h1>
              <div className="uniPageInfo">
                <div className="rankDiv"> Rank: #{rank } </div>
                <div className="locationDiv"> Location: {uniLocation} </div>
                <div className="DFRatioDiv"> Domestic to Foreign Student Ratio: {DFRatio}:{DFCalc} </div>
                <div className="priLangDiv"> Primary Language: {PriLang} </div>
                <div className="FTutition_RangeDiv"> Foreign Tutition Range (Avg): {FTutition_Range} </div>
                <div className="DTutition_RangeDiv"> Domestic Tutition Range (Avg): {DTutition_Range}</div>
                <div className="verifiedDiv"> Verification Status: {Type} </div>
                <div className="programsListDiv"> Programs Offered: 
                  {Programs.map((c) => (
                    <li className="programsListItem">{c}</li>
                  ))}
                </div>

                <div className="commentsListDiv"> 
                {user && (
                  <form className="commentForm" onSubmit={handleSubmit}>
                    <textarea
                      type="text"
                      maxLength="100"
                      className="commentInput"
                      placeholder="Post a comment..."
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <button className="postButton" type="submit">
                      Post
                    </button>
                  </form>
                )}
                
                <b>Comments: </b>
                  {Comments.map((c) => (
                    <div className="commentDiv">
                    <div className="commentAuthor">Author: {c.username}</div>
                    <div>Comment: {c.desc}</div>
                    </div>

                  ))}
                </div>
              </div>
          </div>
      </div>

      <div className="saveDiv"> 
        {AlreadySaved.length ==0 ?(<i className="saveIcon fas fa-save" onClick={handleClick}></i> ):
        (<i className="alreadySavedIcon fas fa-save" onClick={handleDelete}></i>)}
      </div>


    </div>
  );
}