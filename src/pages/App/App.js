import { useContext, Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { AuthContext } from "../../context/AuthContex";

const Home = lazy(() => import("../Home/Home"));
const Login = lazy(() => import("../Login/Login"));
const Register = lazy(() => import("../Register/Register"));
const Tree = lazy(() => import("../Tree/Tree"));
const Events = lazy(() => import("../Events/Events"));
const Chats = lazy(() => import("../Chats/Chats"));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
