import {
  Avatar,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import UseFileUpload from "../../hooks/useFileUpload";
import { updateOne } from "../../hooks/useDB";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import ImageInput from "../imageInput/ImageInput";
import { setLocalUser } from "../../hooks/useLocalUser";

const Header = ({ user, currentUser }) => {
  const [, , uploadFiles] = UseFileUpload();
  const isFamilyMember = currentUser.family.includes(user.id);
  const userId = user.id;
  const renderEmail = () => {
    if (user?.privacySettings?.includes("email")) {
      return <Typography variant="body1">{user?.email}</Typography>;
    }
    return null;
  };

  const updateAvatar = async (event) => {
    const url = await uploadFiles([event.target.files[0]]);
    updateOne({ photoUrl: url[0] }, "users", currentUser.uid);
  };

  const addFamilyMember = () => {
    updateOne({ family: arrayUnion(userId) }, "users", currentUser.uid);
    setLocalUser({ ...currentUser, family: [...currentUser.family, userId] });
  };

  const deleteFamilyMember = () => {
    updateOne({ family: arrayRemove(userId) }, "users", currentUser.uid);
    const familyWithoutUser = currentUser.family.filter((id) => id !== userId);
    setLocalUser({ ...currentUser, family: familyWithoutUser });
  };

  return (
    <Paper elevation={10} className="header">
      <div className="row centered"
        style={{
          justifyContent: "space-between",
          width: "100%"
        }}
      >
        <div className="row centered" style={{width: "max-content"}}>
        <Avatar sx={{ width: 150, height: 150 }} src={user?.photoUrl} />
        {currentUser?.uid === user.id && (
          <label htmlFor="avatar-input">
            <CreateIcon />
            <ImageInput id="avatar-input" onChange={updateAvatar} />
          </label>
        )}
        </div>

        <div className="user-info">
          <Typography variant="h4">
            {user?.bio?.fName} {user?.bio?.lName}
          </Typography>
          {renderEmail()}
        </div>
        <div>
          {currentUser.uid !== user.id &&
            (isFamilyMember ? (
              <Button variant="contained" size="large" onClick={deleteFamilyMember}>Usuń</Button>
            ) : (
              <Button variant="contained" size="large" onClick={addFamilyMember}>Dodaj</Button>
            ))}
        </div>
      </div>
    </Paper>
  );
};

export default Header;
