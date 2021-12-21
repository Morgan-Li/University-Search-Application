import { useLocation } from "react-router";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import UniList from "../../components/uniList/uniList";
import "./search.css";

export default function Search() {

    const [data, setData] = useState([]);
    const [q, setQ] = useState('');
    const [PriLang, setPriLang] = useState("English");
    const [Location, setLocation] = useState("Canada");
    const [Dom_Frgn_Ratio, setDom_Frgn_Ratio] = useState("All");
    const [Program, setProgram] = useState("Math");
    const [FTutition, setFTutition] = useState("100000");
    const [DTutition, setDTutition] = useState("100000");
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get("/search" , {params: 
                {PriLang: PriLang,
                Location: Location,
                Dom_Frgn_Ratio: Dom_Frgn_Ratio,
                Program: Program,
                FTutition: FTutition,
                DTutition: DTutition
                }
            });
            setData(res.data);
            console.log(res.data);
        } catch (err) {
        }
      };
  
    /*useEffect(() => {
      const fetchUnis = async () => {
        const res = await axios.get("/uniPages");
        setData(res.data);
      };
      fetchUnis();
    }, []);*/
  
  
    function search(rows) {
      return rows.filter(row => row.Uname.toLowerCase().indexOf(q) > -1)
    }
  
    return (
    <div>
        <form className="searchForm" onSubmit={handleSubmit}>
            <label className="PriLangLabel">Primary Language:</label>
            <select className="PriLang" name="PriLang" onChange={e=> setPriLang(e.target.value)}>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Mandarin">Mandarin</option>
                <option value="Spanish">Spanish</option>
                <option value="Hindi">Hindi</option>
                <option value="Bengali">Bengali</option>
                <option value="German">German</option>
            </select>
            <label className="LocationLabel"> Country:</label>
            <select className="Location" name="Location" onChange={e=> setLocation(e.target.value)}>
                <option value="Canada">Canada</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="China">China</option>
                <option value="India">India</option>
                <option value="Japan">Japan</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
            </select>
            <label className="Dom_Frgn_RatioLabel"> Domestic to Foreign Students (GTE):</label>
            <select className="Dom_Frgn_Ratio" name="Dom_Frgn_Ratio" onChange={e=> setDom_Frgn_Ratio(e.target.value)}>
                <option value="All">All</option>
                <option value="90">90:10</option>
                <option value="80">80:20</option>
                <option value="70">70:30</option>
                <option value="60">60:40</option>
                <option value="50">50:50</option>
                <option value="40">40:60</option>
                <option value="30">30:70</option>
                <option value="20">20:80</option>
            </select>
            <label className="ProgramLabel"> Program:</label>
            <select className="Program" name="Program" onChange={e=> setProgram(e.target.value)}>
                <option value="Math">Math</option>
                <option value="Engineering">Engineering</option>
                <option value="English">English</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Psychology">Psychology</option>
                <option value="Arts">Arts</option>
                <option value="Biology">Biology</option>
                <option value="Education">Education</option>
            </select>
            <label className="FTutitionLabel"> Foreign Tutition (Max):</label>
            <select className="FTutition" name="FTutition" onChange={e=> setFTutition(e.target.value)}>
                <option value="None">No limit</option>
                <option value="5000">5000</option>
                <option value="10000">10000</option>
                <option value="15000">15000</option>
                <option value="20000">20000</option>
                <option value="25000">25000</option>
                <option value="50000">50000</option>
                <option value="100000">100000</option>
            </select>
            <label className="DTutitionLabel"> Domestic Tutition (Max):</label>
            <select className="DTutition" name="DTutition" onChange={e=> setDTutition(e.target.value)}>
                <option value="None">No limit</option>
                <option value="3000">3000</option>
                <option value="5000">5000</option>
                <option value="8000">8000</option>
                <option value="10000">10000</option>
                <option value="15000">15000</option>
                <option value="25000">25000</option>
                <option value="50000">50000</option>
            </select>
            <button className="searchButton" type="submit">
                Search
            </button>
        </form>

        <input
          type="text"
          placeholder="Search Universities"
          className = "queryBox"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      <div className = "listDiv"> 
        <UniList data={search(data)} />
      </div>
    </div>
    );
  }