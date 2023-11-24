import { Typography } from "@mui/material";

export const Message = ({ message, user }) => {
  return (
    <li className={user ? "message self" : "message"}>
      <div className="messageBody" style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="body1">{message.message}</Typography>
        <Typography variant="body2" fontSize="9pt" >
          {message.time
            .toDate()
            .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Typography>
      </div>
    </li>
  );
};
