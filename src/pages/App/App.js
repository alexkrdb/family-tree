import { Suspense, lazy, useContext} from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import SearchFamily from "../SearchFamily/SearchFamily";
import { getLocalUser } from "../../hooks/useLocalUser";
import { AuthContext } from "../../context/AuthContex";


const Home = lazy(() => import("../Home/Home"));
const Login = lazy(() => import("../Login/Login"));
const Register = lazy(() => import("../Register/Register"));
const Tree = lazy(() => import("../Tree/Tree"));
const Events = lazy(() => import("../Events/Events"));
const Chats = lazy(() => import("../Chats/Chats"));
const Profile = lazy(() => import("../Profile/Profile"));
const NotFound = lazy(() => import("../NotFound/NotFound"));
function App() {
  const user = getLocalUser()
  const {currentUser} = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route element={<ProtectedRoute isAllowed={!!user || !!currentUser} key={currentUser?.uid}/>}>
              <Route path="tree" element={<Tree />} />
              <Route path="events" element={<Events />} />
              <Route path="chats" element={<Chats />} />
              <Route path="profile/:userId" element={<Profile />} />
              <Route path="search" element={<SearchFamily/>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

const ProtectedRoute = ({children, isAllowed, redirectPath="/login"}) => {
  if(!isAllowed){
    return <Navigate to={redirectPath} replace/>
  }
  return ( <Outlet/> );
}
