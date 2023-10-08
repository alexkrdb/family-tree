import "./Events.scss"; 
import { Typography } from "@mui/material";
import Event from "../../components/events/Event";


function Events() {
  const data = [
    {
      text: "My grandma have just died ☠️",
      images: [
        "https://media.gettyimages.com/id/514877042/photo/sarah-bernhardt-lying-in-her-coffin-sleeping-photograph.jpg?s=612x612&w=0&k=20&c=-SaVjRwsrqM_C39CdxACejYPra5iJ5HSvhIjWkqal8U=",
        "https://media.gettyimages.com/id/137657382/photo/a-woman-pays-her-respect-in-front-of-the-casket-of-joe-paterno-for-public-viewing-at-the.jpg?s=612x612&w=0&k=20&c=IsauYQGSvxCbnTbfcEVLyHEVlpHlCx0r6Zn6KMPaWlA=",
        "https://media.gettyimages.com/id/517758114/photo/the-body-of-famed-woman-athlete-babe-didrikson-zaharias-lies-in-state-at-bethlehem-lutheran.jpg?s=612x612&w=0&k=20&c=dGKYHhz_6MICSGVkzP3EOAolTENmtP7H-mvH3F5e39w=",
      ],
    },
  ];

  return (
    <div className="eventsPage">
      <div className="pageContent">
        <Typography variant="h1">Events</Typography>
        {data.map((item) => {
          // console.log(item)
          return <Event data={item} />;
        })}
      </div>
    </div>
  );
}

export default Events;
