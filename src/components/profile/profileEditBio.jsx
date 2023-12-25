import React, { useContext, useState } from "react";
import { updateOne } from "../../hooks/useDB";
import { getLocalUser, setLocalUser } from "../../hooks/useLocalUser";
import { AuthContext } from "../../context/AuthContex";
import { Button, TextField } from "@mui/material";
import {
  Modal,
  ModalContents,
  ModalDismissButton,
  ModalOpenButton,
} from "../modal/newModal";
import "./helper.scss";
import { Timestamp } from "firebase/firestore";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
const ProfileEditBio = ({ user, ...props }) => {
  const { currentUser } = useContext(AuthContext);
  console.log(user);
  const [newBio, setNewBio] = useState({
    fName: user.bio?.fName,
    lName: user.bio?.lName,
    dBirth: user.bio?.dBirth.toDate(),
    location: user.bio?.location,
    bio: user.bio?.bio,
  });
  const saveNewBio = () => {
    updateOne(
      { bio: { ...newBio, dBirth: Timestamp.fromDate(newBio.dBirth) } },
      "users",
      currentUser.uid
    );
    const user = getLocalUser();
    setLocalUser({ ...user, bio: newBio });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal>
        <ModalOpenButton>
          <Button variant="contained">Edytuj</Button>
        </ModalOpenButton>
        <ModalContents
          width="sm"
          title="Zmiana danych biograficznych"
          actions={
            <div>
              <ModalDismissButton>
                <Button color="error">Cofnij</Button>
              </ModalDismissButton>
              <ModalDismissButton>
                <Button onClick={saveNewBio}>Zapisz</Button>
              </ModalDismissButton>
            </div>
          }
        >
          <div className="grid c2">
            <span className="grid-item">Imie:</span>
            <span className="grid-item">
              <TextField
                variant="standard"
                fullWidth
                value={newBio.fName}
                onChange={(e) =>
                  setNewBio((old) => ({
                    ...old,
                    fName: e.target.value,
                  }))
                }
                label="Wprowadź nowe imie"
              />
            </span>
            <span className="grid-item">Nazwisko:</span>
            <span className="grid-item">
              <TextField
                variant="standard"
                fullWidth
                value={newBio.lName}
                onChange={(e) =>
                  setNewBio((old) => ({
                    ...old,
                    lName: e.target.value,
                  }))
                }
                label="Wprowadź nowe nazwisko"
              />
            </span>
            <span className="grid-item">Data urodzenia:</span>
            <span className="grid-item">
              <DatePicker
                variant="standard"
                fullWidth
                value={dayjs(newBio.dBirth)}
                onChange={(e) =>
                  setNewBio((old) => ({
                    ...old,
                    dBirth: e.toDate(),
                  }))
                }
              />
            </span>
            <span className="grid-item">Miejscowość:</span>
            <span className="grid-item">
              <TextField
                variant="standard"
                fullWidth
                value={newBio.location}
                onChange={(e) =>
                  setNewBio((old) => ({
                    ...old,
                    location: e.target.value,
                  }))
                }
                label="Wprowadź nową miejscowość"
              />
            </span>
            <span className="grid-item">Biografia:</span>
            <span className="grid-item">
              <TextField
                variant="standard"
                fullWidth
                value={newBio.bio}
                onChange={(e) =>
                  setNewBio((old) => ({
                    ...old,
                    bio: e.target.value,
                  }))
                }
                label="Wprowadź nową biografią"
              />
            </span>
          </div>
        </ModalContents>
      </Modal>
    </LocalizationProvider>
  );
};

export default ProfileEditBio;
