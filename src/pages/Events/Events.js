import "./Events.scss";
import { Typography, Fab } from "@mui/material";
import Event from "../../components/events/Event";
import useEvents from "../../hooks/useEvents";
import { lightBlue } from "@mui/material/colors";
import AddEventModal from "../../components/events/addEventModal";

function Events() {
  const [events, setEvents] = useEvents();
  return (
    <div className="eventsPage">
      <div className="pageContent">
        <div className="eventsList">
          <Typography variant="h2">Wspomnienia</Typography>
          {events.map((item) => {
            return (
              <Event
                data={item}
                key={item?.comments?.length}
                setEvents={setEvents}
              />
            );
          })}
        </div>
        <AddEventModal setEvents={setEvents} />
      </div>
    </div>
  );
}

export default Events;
