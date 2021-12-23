import Topbar from "./components/topbar/Topbar";
import Header from "./components/header/header";
import Homepage from "./pages/homepage/homepage";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Single from "./pages/uniPage/uniPage";
import Search from "./pages/search/search";
import Watchlist from "./pages/watchlist/watchlist";
import Admin from "./pages/admin/admin";
import About from "./pages/about/about";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
//disallow admin/institute from accessing links
function App() {
  const { user } = useContext(Context);

  return (
  <>
  <BrowserRouter>
    <Topbar/>
    <Header/>
    <Routes>
      <Route exact path="/" element={<Homepage/>} />
      <Route path="/about" element={<About/>}/>
      <Route path="/register" element={user ? <Homepage /> : <Register />} />
      <Route path="/login" element={user ? <Homepage /> : <Login />}/>
      <Route path="/uniPage/:uniPageId" element={<Single />}/>
      <Route path="/search" element={user ? <Search /> : <Login />}/>
      <Route path="/watchlist" element={user ? <Watchlist /> : <Login />}/>
      <Route path="/admin" element={user && user.isAdmin? <Admin /> : <Homepage />}/>
    </Routes>
  </BrowserRouter>

  </>
  );
}

export default App;
