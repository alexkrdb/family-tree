import { Avatar, Typography } from "@mui/material";

const Header = (props) => {
    const user = props.user;
  return (
    <div className="header">
      <Avatar sx={{ width: 150, height: 150 }} src={user?.photoUrl} />
      <div className="user-info">
        <Typography variant="h4">
          {user?.bio?.fName} {user?.bio?.lName}
        </Typography>
        <Typography variant="body1">{user?.email}</Typography>
      </div>
    </div>
  );
};

export default Header;
