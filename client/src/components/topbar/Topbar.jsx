import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
      <div className="topLeft">
        <Link className="link" to="/">
          <i className="topIcon fas fa-home"></i>
        </Link>
        <Link className="link" to="/about">
          <i className="topIcon fas fa-info-circle"></i>
        </Link>
      </div>
      <div className="topCenter">
        {user != null && user.isAdmin && <div className="adminText"> ADMIN </div>}
        {user != null && user.isInstitution && <div className="instituteText"> INSTITUTE </div>}
      </div>
      <div className="topRight">
        {user ? (
          <ul className = "topList"> 
            {user.isAdmin &&  <Link className="link" to="/admin">
                <i className="adminIcon fas fa-cog"></i>
              </Link> }
            <Link className="link" to="/search">
              <i className="topSearchIcon fas fa-search"></i>
            </Link>
            <Link className="link" to="/watchlist">
              <i class="topIconSaved fas fa-list"></i>
            </Link>
            <li className= "topListItem">
              <Link className="link" to="/settings">
                <i className="topIcon fas fa-user-circle"> {user.username}</i>
              </Link>
            </li>
            <li className="topListItem" onClick={handleLogout}>
              {user && "LOGOUT"}
            </li>
          </ul>

          
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}