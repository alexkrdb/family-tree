import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Tree from "../Tree/Tree";
import Events from "../Events/Events";
import Chats from "../Chats/Chats";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContex";
import { Navbar } from "../../components/Navbar/Navbar";




function App() {

  const {currentUser} = useContext(AuthContext);

  // console.log("current user from App: ", currentUser);
  
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="tree" element={<Tree />} />
          <Route path="events" element={<Events />} />
          <Route path="chats" element={<Chats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
