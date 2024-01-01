import { useEffect, useState } from "react";
import "./Profile.scss";
import Header from "../../components/profile/header";
import ProfileTab from "../../components/profile/profileTab";
import { useParams } from "react-router-dom";
import ProfileTabBio from "../../components/profile/profileTabBio";
import { readOne} from "../../hooks/useDB";
import { getLocalUser} from "../../hooks/useLocalUser";

const Profile = () => {
  let { userId } = useParams();
  const [user, setUser] = useState({});
  const currentUser = getLocalUser()

  useEffect(() => {
    const fetchData = async () => {
      const userDoc = await readOne("users", userId);
      setUser(userDoc);
    };

    currentUser && fetchData();
  }, [currentUser, userId]);

  return (
    <div className="Profile">
      <Header user={user} currentUser={currentUser} />
      {userId === currentUser?.uid ? (
        <ProfileTab user={user} currentUser={currentUser} />
      ) : (
        <ProfileTabBio user={user} currentUser={currentUser} />
      )}
    </div> 
  );
};

export default Profile;
