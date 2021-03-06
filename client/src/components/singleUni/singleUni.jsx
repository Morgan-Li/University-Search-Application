
import axios from "axios";
import React,{ useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Context } from "../../context/Context";
import "./singleUni.css";

export default function SingleUni() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { user } = useContext(Context);
  const [uni, setUni] = useState({});
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
  const [Updating, setUpdating] = useState(false);

  const [Description, setDescription] = useState("");

  let prog = React.createRef();

  //function to add programs to uni programs_offered array during edit
  function appendToArray () {
    setPrograms(Programs=>[...Programs, prog.current.value]);
  };

  //adding user comment to uni page
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/uniPages/comment", {
        UniID: path,
        Username,
        Description,
      });
      res.data && window.location.reload();
    } catch (err) {
    }
  };

  //putting university into user watchlist
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

  //Cascade updating university + university watchlist instances
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/uniPages/" + path, {
        Website: Website,
        Rank: rank,
        Prog_Offered: Programs,
        Dom_Frgn_Ratio: DFRatio,
        PriLang: PriLang,
        Location: uniLocation,
        FTutition_Range: FTutition_Range,
        DTutition_Range: DTutition_Range,
        Type: Type
      });
      await updateSavedUnis();
      res.data && window.location.reload();
      setUpdating(false);
    } catch (err) {
    }
  };

  const updateSavedUnis = async () => {
    try {
      const res2 = await axios.put("/watchlist/" + path, {
        Rank: rank,
        Location: uniLocation,
      });
      res2.data && console.log("Updated saved pages!");
    } catch (err) {
    }
  };

  //remove uni from a user watchlist
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

  /*Cascade deletes unipage, instances saved in watchlist, then comments
    In the future, comments + watchlist instances should be saved with the 
    University info collection to avoid doing this and for better non-relational
    database design
  */
  const handleDeletePage = async (e) => {

    e.preventDefault();
    try {
      const res4 = await axios.delete("/uniPages/" + path, {
        data: {isAdmin: user.isAdmin},
      });
      await deleteSavedUnis();
      res4.data && console.log("Deleted uni page!");
    } catch (err) {
    }

  };

  const deleteSavedUnis = async () => {
    try {
      const res5 = await axios.delete("/watchlist/" + path, {
        data: {isAdmin: user.isAdmin},
      });
      await deleteComments();
      res5.data && console.log("Deleted saved pages!");
    } catch (err) {
    }
  };

  const deleteComments = async () => {
    try {
      const res6 = await axios.delete("/uniPages/" + path + "/comment", {
        data: {isAdmin: user.isAdmin},
      });
      res6.data && window.location.replace("/");
    } catch (err) {
    }
  };

  useEffect(() => {
    const getUni = async () => {
      const res = await axios.get("/uniPages/" + path);
      user && setUsername(user.username);
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
      const res2 = await axios.get("/uniPages/" + path + "/comment");
      setComments(res2.data);
      const res3 = await axios.get("/watchlist/alreadySaved", {params: {username: user.username, UniID: path}});
      setAlreadySaved(res3.data);
    };
    getUni();
  }, [path,user]);


  return (
    <div>
      <div className="uniPage">
          <div className="uniPageWrapper">
              <h1 className="uniNameTitle">
                <a href={Website} target="_blank" rel="noopener noreferrer" className="link">
                  {Uname}
                </a>
              </h1>
              <div className="uniPageInfo">
                {Updating ? (
                  <div className="displayPage"> 
                    <div className="websiteDiv"> Website link: 
                      <input
                      type="text"
                      className="createInput"
                      placeholder="Website URL"
                      onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                    <div className="rankDiv"> Rank: 
                    {user && user.isAdmin && (<input
                      type="number"
                      className="createInput"
                      placeholder="Enter a rank #1-999"
                      onChange={(e) => setRank(e.target.value)}
                      />)}
                    </div>
                    <div className="locationDiv"> Location: 
                      <input
                      type="text"
                      className="createInput"
                      placeholder="Country, State/Province, City"
                      onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <div className="DFRatioDiv"> Domestic to Foreign Student Ratio: 
                      <input
                      type="text"
                      className="createInput"
                      placeholder="Enter a single number 1-100"
                      onChange={(e) => setDom_Frgn_Ratio(e.target.value)}
                      />
                    </div>
                    <div className="priLangDiv"> Primary Language: 
                      <select className="PriLangSel" name="PriLang" onChange={e=> setPriLang(e.target.value)}>
                      <option value="English">English</option>
                      <option value="French">French</option>
                      <option value="Mandarin">Mandarin</option>
                      <option value="Spanish">Spanish</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Bengali">Bengali</option>
                      <option value="German">German</option>
                      </select>
                    </div>
                    <div className="FTutition_RangeDiv"> Foreign Tutition Range (Avg): 
                      <input
                      type="number"
                      className="createInput"
                      placeholder="Enter average tuition cost"
                      onChange={(e) => setFTutition_Range(e.target.value)}
                      />
                    </div>
                    <div className="DTutition_RangeDiv"> Domestic Tutition Range (Avg):
                      <input
                      type="number"
                      className="createInput"
                      placeholder="Enter average tuition cost"
                      onChange={(e) => setDTutition_Range(e.target.value)}
                      /> 
                    </div>
                    <div className="verifiedDiv"> Verification Status: 
                      {user && user.isAdmin && (<select className="VerificationSel" name="Verification" onChange={e=> setType(e.target.value)}>
                      <option value="Unverified">Unverified</option>
                      <option value="Verified">Verified</option>
                      </select>)}
                    </div>
                    <div className="programsListDiv"> Programs Offered: 
                      <input
                      type="text"
                      ref={prog}
                      className="createInput"
                      id="programInput"
                      placeholder="Enter a program"
                      />
                      <button className="addButton" type="button" onClick={appendToArray}>
                          Add Program
                      </button> 
                    </div> 
                  </div>
                  ) : (
                  <div className="editPage"> 
                    <div className="rankDiv"> Rank: <b>#{rank }</b> </div>
                    <div className="locationDiv"> Location: {uniLocation} </div>
                    <div className="DFRatioDiv"> Domestic to Foreign Student Ratio: {DFRatio}:{DFCalc} </div>
                    <div className="priLangDiv"> Primary Language: {PriLang} </div>
                    <div className="FTutition_RangeDiv"> Foreign Tutition Range (Avg): {FTutition_Range} </div>
                    <div className="DTutition_RangeDiv"> Domestic Tutition Range (Avg): {DTutition_Range}</div>
                    <div className="verifiedDiv"> Verification Status: {Type} {Type==="Verified"? (<i className="verifiedIcon fas fa-check-circle"></i>):
                    (<i className="unverifiedIcon fas fa-times-circle"></i>)}</div>
                    <div className="programsListDiv"> Programs Offered: 
                      {Programs.map((c) => (
                        <li className="programsListItem">{c}</li>
                      ))}
                    </div>
                    <div className="UpdateTime"> Last Updated: <b>{new Date(uni.updatedAt).toDateString()} </b>
                      {user && (<div className="buttonDiv"> 
                      {AlreadySaved.length ===0 ?(<i className="saveIcon fas fa-save" onClick={handleClick}></i> ):
                      (<i className="alreadySavedIcon fas fa-save" onClick={handleDelete}></i>)}
                      </div>)}
                    </div>
                  </div>
                  )}

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
                    <div className="commentAuthor"><b>Author:</b> {c.username} </div>
                    <div className ="dateDiv"><b>Date:</b> {new Date(c.createdAt).toDateString()}</div>
                    <div><b>Comment:</b> {c.desc}</div>
                    </div>

                  ))}
                </div>
              </div>
          </div>
          {user && (user.isAdmin || user.isInstitution) && (user.isAdmin || user.username === Uname) && (<div className="updateDiv"> 
          {Updating ?(<i className="saveChangesIcon fas fa-check-square" onClick={handleUpdate}></i> ):
          (<i class="updateIcon fas fa-edit" onClick={() => setUpdating(true)}></i>)}
          </div>)}

          <div className="deleteDiv"> 
          {user && user.isAdmin && (<i className="deleteIcon fas fa-trash-alt" onClick={handleDeletePage}></i> )}
          </div>
      </div>
    </div>
  );
}