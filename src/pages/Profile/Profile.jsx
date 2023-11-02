import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContex";
import "./Profile.scss";

import Header from "../../components/profile/header";
import ProfileTab from "../../components/profile/profileTab";

import { useParams } from "react-router-dom";
import ProfileTabBio from "../../components/profile/profileTabBio";
import { Button } from "@mui/material";
import { updateOne } from "../../hooks/useDB";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  let { userId } = useParams();
  console.log(userId);
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data from the database");
      const userData = await getDoc(doc(db, "users", userId));
      setUser(userData.data());
    };

    currentUser && fetchData();
  }, [currentUser]);
  const addFamilyMember = () => {
    const updatedData = { family: [userId] };
    updateOne(updatedData, "users", currentUser.uid);
  };
  console.log("user?.family:", user?.family);
  console.log("userId:", userId);
  return (
    <div className="Profile">
      {userId === currentUser?.uid ? (
        <>
          <Header user={user} />
          <ProfileTab user={user} currentUser={currentUser} />
        </>
      ) : (
        <>
          <Header user={user} />
          <ProfileTabBio
            user={user}
            logged={userId != currentUser?.uid}
            key={currentUser?.uid}
          />

          {user?.family?.includes(userId) ? (
            <Button>Usun</Button>
          ) : (
            <Button onClick={addFamilyMember}>Dodaj</Button>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
