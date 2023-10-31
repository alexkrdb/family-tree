import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContex";
import "./Profile.scss";

import Header from "../../components/profile/header";
import ProfileTab from "../../components/profile/profileTab";

import { useParams } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);
  let { userId } = useParams();
  console.log(userId);

  // if(userId==currentUser.uid){
  //   //redirect to another user profile
  // }
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data from the database");
      const userData = await getDoc(doc(db, "users", userId));
      setUser(userData.data());
    };

    currentUser && fetchData();
  }, [currentUser]);

  return (
    <div className="Profile">
      <Header user={user} />
      <ProfileTab user={user} currentUser={currentUser} />
    </div>
  );
};

export default Profile;
