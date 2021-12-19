import { useLocation } from "react-router";
import Topbar from "../../components/topbar/Topbar";
import Header from "../../components/header/header";
import UniList from "../../components/uniList/uniList";
import "./homepage.css";


export default function Homepage() {
  const location = useLocation();
  console.log(location);
  return (
    <div className = "listDiv"> 
      <UniList />
    </div>

  );
}