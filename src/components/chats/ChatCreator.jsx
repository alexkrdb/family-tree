import {
  Avatar,
  Box,
  Button,
  Checkbox,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "./chats.scss";
import { FixedSizeList } from "react-window";
import { memo, useContext } from "react";
import { FormContext } from "../../context/FormContext";
import { AuthContext } from "../../context/AuthContex";
import { saveOne, updateOne } from "../../hooks/useDB";
import { ModalDismissButton } from "../modal/newModal";
import { v1 } from "uuid";
import UseFileUpload from "../../hooks/useFileUpload";

const renderRow = memo(({ index, data, style }) => {
  const { form, setForm } = useContext(FormContext);
  const people = form.selectedPeople;
  const value = data[index];
  const { currentUser } = useContext(AuthContext);

  const handleToggle = (newValue) => {
    const currentIndex = people.indexOf(newValue);
    const newChecked = [...people];
    if (currentIndex === -1) newChecked.push(newValue);
    else newChecked.splice(currentIndex, 1);
    setForm((oldForm) => ({ ...oldForm, selectedPeople: newChecked }));
  };
  if (currentUser?.uid !== data[index])
    return (
      <ListItem
        key={index}
        style={style}
        // className="container borderTop"
        secondaryAction={
          <Checkbox
            onChange={() => handleToggle(value)}
            checked={people.indexOf(value) !== -1}
          />
        }
      >
        <ListItemAvatar>
          <Avatar>{value}</Avatar>
        </ListItemAvatar>
        <ListItemText primary="Imie nazwisko" />
      </ListItem>
    );
});

const ChatCreator = ({ people: people, ...other }) => {
  const { form, setForm } = useContext(FormContext);

  return (
    <div className="modal" style={{ flex: 1 }}>
      <Box className="flex container" sx={{ flex: "1" }}>
        <div className="photoInput centered">
          <label htmlFor="imageInput">
            {form.photos.length > 0 && <img src={URL.createObjectURL(form.photos[0])} />}
            {form.photos.length === 0 && <CameraAltIcon sx={{ fontSize: "100px" }} />}
          </label>
          <input
            id="imageInput"
            type="file"
            hidden
            accept="image/png, image/jpeg"
            onChange={(e) => {
              setForm((oldForm) => ({...oldForm, photos: Array.from(e.target.files)}));
            }}
          />
        </div>
        <div className="flex column container" style={{ flex: "1" }}>
          <div>
            <TextField
              fullWidth
              label="Podaj nazwę czatu"
              onChange={(event) =>
                setForm((oldForm) => ({
                  ...oldForm,
                  chatName: event.target.value,
                }))
              }
            />
          </div>
          <FixedSizeList
            height={240}
            width={"100%"}
            itemSize={60}
            itemData={people}
            itemCount={people.length}
            style={{ marginTop: "4rem", backgroundColor: "#eeeeee" }}
          >
            {renderRow}
          </FixedSizeList>
        </div>
      </Box>
    </div>
  );
};

export const SaveNewChatButton = () => {
  const { form } = useContext(FormContext);
  const [, , uploadFiles] = UseFileUpload();
  const save = async () => {
    const id = v1();
    const people = form.selectedPeople;
    const url = await uploadFiles(form.photos)
    await saveOne(
      {
        id: id,
        name: form.chatName,
        messages: [],
        users: people,
        photoUrl: url || null,
      },
      "chats",
      id
    );
  };

  return (
    <ModalDismissButton>
      <Button variant="button" color="success" onClick={save}>
        Save
      </Button>
    </ModalDismissButton>
  );
};


export default ChatCreator;
