import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {  useState } from "react";


export const Navbar = () => {
  const [user] = useAuthState(auth);
  // const [dropDown, setDropdown] = useState(true);
  const navigate = useNavigate();

  function signOut() {
    return (
      auth.currentUser && (
        <a
          onClick={() => {
            navigate("/");
            auth.signOut();
          }}
        >
          Sign out
        </a>
      )
    );
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">LOGO</Link>
        </li>
        <li>
          <Link to="/">Strona Głowna</Link>
        </li>
        <li>
          <Link to="/tree">Drzewo</Link>
        </li>
        <li>
          <Link to="/chats">Chats</Link>
        </li>
        <li>
          <Link to="/events">Wspomnienia</Link>
        </li>
      </ul>
      {user ? (
        <div className="buttonGroup">
          <Link to={`/profile/${auth.currentUser.uid}`}>Profil</Link>
          {signOut()}
        </div>
      ) : (
        <Link to="/login">Zaloguj sie</Link>
      )}
    </nav>
  );
};
