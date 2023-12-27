import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContex";
import "./Profile.scss";

import Header from "../../components/profile/header";
import ProfileTab from "../../components/profile/profileTab";

import { useParams } from "react-router-dom";
import ProfileTabBio from "../../components/profile/profileTabBio";
import { Button } from "@mui/material";
import { readOne, updateOne } from "../../hooks/useDB";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  let { userId } = useParams();

  console.log(userId);
  useEffect(() => {
    const fetchData = async () => {
      const userDoc = await readOne("users", userId);
      setUser(userDoc);
    };

    currentUser && fetchData();
  }, [currentUser, userId]);
  
  const addFamilyMember = () => {
    const updatedData = { family: [userId] };
    updateOne(updatedData, "users", currentUser.uid);
  };
  // console.log("user?.family:", user?.family);
  // console.log("userId:", userId);
  return (
    <div className="Profile">
      <Header user={user} currentUser={currentUser} />
      {userId === currentUser?.uid ? (
          <ProfileTab user={user} currentUser={currentUser} />
      ) : (
        <>
          <ProfileTabBio
            user={user}
            logged={userId !== currentUser?.uid}
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
