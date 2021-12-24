import { useLocation } from "react-router";
import React,{ useRef, useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import "./admin.css";


export default function Admin() {
    const [rank, setRank] = useState(0);
    const [Uname, setUname] = useState("");
    const [Programs, setPrograms] = useState([]);
    const [Dom_Frgn_Ratio, setDom_Frgn_Ratio] = useState("");
    const [PriLang, setPriLang] = useState("English");
    const [Location, setLocation] = useState("");
    const [FTutition, setFTutition] = useState(0);
    const [DTutition, setDTutition] = useState(0);
    const [Website, setWebsite] = useState("");
    const [Verification, setVerification] = useState("Unverified");

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleCreate = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("/uniPages", {
            Rank: rank,
            Uname: Uname,
            Prog_Offered: Programs,
            Dom_Frgn_Ratio: Dom_Frgn_Ratio,
            PriLang: PriLang,
            Location: Location,
            FTutition_Range: FTutition,
            DTutition_Range: DTutition,
            Website: Website,
            Type: Verification,
          });
          res.data && window.location.reload();
        } catch (err) {
        }
      };

      const handleCreateAcc = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("/auth/register", {
            username,
            email,
            password,
            isInstitution: true,
          });
          res.data && window.location.reload();
        } catch (err) {
        }
      };

    let prog = React.createRef();

    function appendToArray () {
        setPrograms(Programs=>[...Programs, prog.current.value]);
      };

            /*<button className="addButton" type="button" onClick={console.log(Programs)}>
                LOG
            </button>*/

  return (
  <div className = "adminDiv">
      <div className="adminPanel">
        <div className="createUniDiv">
          <h1 className= "createTitle">Create University </h1>
          <form className="createUniForm" onSubmit={handleCreate}>
            <div>
            <label> Rank: </label>
            <input
            type="number"
            className="createInput"
            placeholder="Enter a rank #1-999"
            onChange={(e) => setRank(e.target.value)}
            />
            </div>

            <div>
            <label> University name: </label>
            <input
            type="text"
            className="createInput"
            placeholder="Enter a university name"
            onChange={(e) => setUname(e.target.value)}
            />
            </div>

            <div>
            <label> Programs: </label>
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

            <div>
            <label> Domestic to Foreign Ratio: </label>
            <input
            type="text"
            className="createInput"
            placeholder="Enter a single number 1-100"
            onChange={(e) => setDom_Frgn_Ratio(e.target.value)}
            />
            </div>

            <div>
            <label className="PriLangInput"> Primary Language: </label>
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

            <div>
            <label> Location: </label>
            <input
            type="text"
            className="createInput"
            placeholder="Country, State/Province, City"
            onChange={(e) => setLocation(e.target.value)}
            />
            </div>

            <div>
            <label> Foreign Tuition Average: </label>
            <input
            type="number"
            className="createInput"
            placeholder="Enter average tuition cost"
            onChange={(e) => setFTutition(e.target.value)}
            />
            </div>

            <div>
            <label> Domestic Tuition Average: </label>
            <input
            type="number"
            className="createInput"
            placeholder="Enter average tuition cost"
            onChange={(e) => setDTutition(e.target.value)}
            />
            </div>

            <div>
            <label> Website link: </label>
            <input
            type="text"
            className="createInput"
            placeholder="URL"
            onChange={(e) => setWebsite(e.target.value)}
            />
            </div>

            <div>
            <label className="VerificationInput"> Verification Status: </label>
            <select className="VerificationSel" name="Verification" onChange={e=> setVerification(e.target.value)}>
                <option value="Unverified">Unverified</option>
                <option value="Verified">Verified</option>
            </select>
            </div>

            <div className="uniCreateButton">
            <button className="createButton" type="submit">
                Create
            </button>
            </div>
          </form>
        </div>

        <div className="createUniAccDiv"> 
          <h1 className= "createTitle"> Create Institution Account </h1>
          <form className="createAccForm" onSubmit={handleCreateAcc}>
            <label> Institution name: </label>
            <input
            type="text"
            className="createInput"
            placeholder="Both names must match!"
            onChange={(e) => setUsername(e.target.value)}
            />
            <label> Institution Email: </label>
            <input
            type="text"
            className="createInput"
            placeholder="Enter institution email"
            onChange={(e) => setEmail(e.target.value)}
            />
            <label> Password: </label>
            <input
            type="text"
            className="createInput"
            placeholder="Enter a password"
            onChange={(e) => setPassword(e.target.value)}
            />
            <div className="accCreateButton">
            <button className="createButton" type="submit">
                Create
            </button>
            </div>
          </form>
        </div>
      </div>
  </div>
  );
}