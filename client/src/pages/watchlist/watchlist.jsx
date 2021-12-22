import "./watchlist.css";
import React, { useState, useEffect } from 'react';
import UniWatchList from "../../components/uniWatchList/uniWatchList";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Watchlist() {

const { user } = useContext(Context);
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  //{user.username}


  useEffect(() => {
    const fetchUnis = async () => {
      const res = await axios.get("/watchlist", {params: {username: user.username} });
      setData(res.data);
    };
    fetchUnis();
  }, []);


  function search(rows) {
    return rows.filter(row => row.Uname.toLowerCase().indexOf(q) > -1)
  }

  return (
    <div className="watchlist">
        <h1 className="watchlistTitle">
            <u>My Watchlist</u>
        </h1>
        <input
            type="text"
            placeholder="Search Universities"
            className = "queryBox"
            value={q}
            onChange={(e) => setQ(e.target.value)}
        />
        <div className = "listDiv"> 
            <UniWatchList data={search(data)} />
        </div>
    </div>
  );
}