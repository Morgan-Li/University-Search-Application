import { useLocation } from "react-router";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Header from "../../components/header/header";
//import Topbar from "../../components/topbar/Topbar";
//import Header from "../../components/header/header";
import UniList from "../../components/uniList/uniList";
import "./homepage.css";


export default function Homepage() {
  const location = useLocation();
  console.log(location);
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');


  useEffect(() => {
    const fetchUnis = async () => {
      const res = await axios.get("/uniPages");
      setData(res.data);
    };
    fetchUnis();
  }, []);


  function search(rows) {
    return rows.filter(row => row.Uname.toLowerCase().indexOf(q) > -1)
  }

  return (
  <div>
    <Header/>
    <div className="Home">
      <div className="searchAndTable">
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
    </div>
  </div>
  );
}