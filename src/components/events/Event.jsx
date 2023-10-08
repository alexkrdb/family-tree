import {
  Button,
  ImageListItem,
  ImageList,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import MModal from "../modal/MModal";
import Comment from "./Comment";

const Event = ({ data }) => {
  console.log(data);

  const comments = [
    {
      author: {
        id: "a",
        fullName: "Gregor O'Neil",
        photoUrl:
          "https://media.gettyimages.com/id/1358205700/photo/shot-of-a-young-man-using-his-smartphone-to-send-text-messages.jpg?s=612x612&w=0&k=20&c=TV26GSLYVo3p2QyjKRCe6KdfQbIlZs638IGrViakNbk=",
      },
      text: "Hahahahhahahahha",
      likes: 12,
      timestamp: Date("1995-12-17T03:24:00"),
    },
    {
      author: {
        id: "b",
        fullName: "Gregorius O'Nilo",
        photoUrl:
          "https://media.gettyimages.com/id/1284284200/photo/hes-on-a-mission.jpg?s=612x612&w=0&k=20&c=Zs8e1adNt025RcBNZ7pg1vjdgO4SHetBwQJCnJDZR0U=",
      },
      text: "Sexy",
      likes: 1,
      timestamp: Date("2000-12-17T03:24:00"),
    },
  ];
  return (
    <Paper elevation={6} className="event">
      <div className="header">
        <Avatar
          sx={{ height: 50, width: 50 }}
          src="https://media.gettyimages.com/id/1310533180/photo/cheerful-fashionable-adult-man-in-city-setting.jpg?s=612x612&w=0&k=20&c=hfy_5L8llmz_sUp1_n1NbM5Gsyk0kUbJRmR3TXAaoMM="
          alt="Adam"
        />
        <Typography> Adam O'Neil</Typography>
      </div>
      <hr />

      <div className="eventContent">
        <Typography variant="body1">{data?.text}</Typography>
        <ImageList variant="masonry" cols={2} gap={8}>
          {data.images?.map((image) => (
            <ImageListItem key={image}>
              <img src={image} alt={"Image"} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      <hr />

      <div className="footer">
        <Button startIcon={<FavoriteBorderIcon />} color="error">
          Like
        </Button>
        <MModal buttonText="Comments" startIcon={<CommentIcon />}>
          <Typography variant="h3">Comments</Typography>
          {comments.map((comment) => {
            // console.log(comment);
            return <Comment comment={comment} />;
          })}
        </MModal>
      </div>
    </Paper>
  );
};

export default Event;
