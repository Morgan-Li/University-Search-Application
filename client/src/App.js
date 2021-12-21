import Topbar from "./components/topbar/Topbar";
import Header from "./components/header/header";
import Homepage from "./pages/homepage/homepage";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Single from "./pages/uniPage/uniPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
  <>
  <BrowserRouter>
    <Topbar/>
    <Header/>
    <Routes>
      <Route exact path="/" element={<Homepage/>} />
      <Route path="/register" element={user ? <Homepage /> : <Register />} />
      <Route path="/login" element={user ? <Homepage /> : <Login />}/>
      <Route path="/uniPage/:uniPageId" element={<Single />}/>
    </Routes>
  </BrowserRouter>

  </>
  );
}

export default App;
