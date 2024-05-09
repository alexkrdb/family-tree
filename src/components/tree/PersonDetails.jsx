import { Fragment, memo } from "react";
import MTabs, { MTabsMenu, MTabsPanels } from "../tabs/MTabs";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import "./formDialog.scss";
import {
  Avatar,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import ImageInput from "../imageInput/ImageInput";
import Gallery from "../gallery/Gallery";
import PersonRelations from "./personRelations";

const PersonDetails = ({ person, changes, setChanges }) => {
  return (
    <div className="personForm" style={{ width: "100%" }}>
      <MTabs>
        <MTabsMenu
          labels={["Główna informacja", "Zdjęcia", "Rodzina"]}
          centered={true}
        />
        <MTabsPanels>
          <PersonMainInfo
            changes={changes}
            setChanges={setChanges}
            key={person.id}
          />
          <PersonGallery
            person={person}
            setChanges={setChanges}
            changes={changes}
          />
          <PersonRelations person={person} />
        </MTabsPanels>
      </MTabs>
    </div>
  );
};



const PersonGallery = memo(({ person, changes, setChanges }) => {
  const addPhotos = (e) => {
    const urls = [];
    for (var file of e.target.files) {
      urls.push(URL.createObjectURL(file));
    }
    setChanges((old) => ({
      ...old,
      tempPhotos: [...urls, ...old.tempPhotos],
      files: [...old.files, ...e.target.files],
    }));
  };
  return (
    <Fragment>
      <Gallery images={[...changes.tempPhotos, ...person.photoUrls]} />
      <label htmlFor={`${person.id}_gallery`}>
        <Typography variant="button" sx={{ color: "#2c81d5" }}>
          Dodaj zdjęcia
        </Typography>
      </label>
      <ImageInput id={`${person.id}_gallery`} multiple onChange={addPhotos} />
    </Fragment>
  );
});

const PersonMainInfo = memo(({ changes, setChanges }) => {
  // console.log("changes: ", changes);
  return (
    <div style={{ padding: "6px 12px" }}>
      <div className="container">
        <label htmlFor={"avatar" + changes.userId}>
          <Avatar
            src={changes.tempAvatar || changes.avatar}
            sx={{ width: "200px", height: "200px" }}
          >
            <PersonIcon sx={{ fontSize: "100px" }} />
          </Avatar>
        </label>
        {changes.editing && (
          <ImageInput
            id={"avatar" + changes.userId}
            onChange={(e) => {
              const url = URL.createObjectURL(e.target.files[0]);
              setChanges((old) => ({
                ...old,
                file: e.target.files[0],
                tempAvatar: url,
              }));
            }}
          />
        )}
        {!changes.editing ? (
          <div className="container-vert p centered" style={{ flex: "3" }}>
            <Typography variant="h4">
              {changes.fName + " " + changes.lName}
            </Typography>
            <Typography variant="h5">
              {(changes.dBirth?.toLocaleDateString() || "?") +
                " - " +
                (changes.dDeath?.toLocaleDateString() || "")}
            </Typography>
            <Typography sx={{ overflowY: "auto" }} maxHeight={"200px"}>
              {changes.bio}
            </Typography>
          </div>
        ) : (
          <div className="container-vert centered" style={{ flex: "3" }}>
            <div className="container p">
              <TextField
                variant="standard"
                label="Imię"
                defaultValue={changes.fName}
                onChange={(e) =>
                  setChanges((old) => ({ ...old, fName: e.target.value }))
                }
              />
              <TextField
                variant="standard"
                label="Nazwisko"
                defaultValue={changes.lName}
                onChange={(e) =>
                  setChanges((old) => ({ ...old, lName: e.target.value }))
                }
              />
            </div>

            <div className="container" style={{ width: "90%" }}>
              <DatePicker
                label="Data urodzenia"
                sx={{ width: "50%" }}
                value={changes.dBirth && dayjs(changes.dBirth)}
                onChange={(e) =>
                  setChanges((old) => ({ ...old, dBirth: e.toDate() }))
                }
              />
              <FormControl style={{ width: "40%" }}>
                <InputLabel id="personSex">Płeć</InputLabel>
                <Select
                  value={changes.sex}
                  labelId="personSex"
                  defaultOpen={false}
                  label="Płeć"
                  onChange={(ev) =>
                    setChanges((old) => ({ ...old, sex: ev.target.value }))
                  }
                >
                  <MenuItem value="female">Kobieta</MenuItem>
                  <MenuItem value="male">Mężczyzna</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="container" style={{ width: "90%" }}>
              <DatePicker
                id="dDeath"
                label="Data śmierci"
                sx={{ width: "50%" }}
                disabled={changes.isDead}
                defaultValue={changes.dDeath && dayjs(changes?.dDeath)}
                onChange={(e) =>
                  setChanges((old) => ({ ...old, dDeath: e.toDate() }))
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={changes.isDead}
                    onChange={(e) =>
                      setChanges((old) => ({
                        ...old,
                        isDead: e.target.checked,
                      }))
                    }
                  />
                }
                label="Osoba żyjąca?"
              />
            </div>

            <div
              style={{ width: "90%", maxHeight: "146px", overflowX: "auto" }}
            >
              <TextField
                variant="standard"
                label="Biografia"
                multiline
                fullWidth
                defaultValue={changes.bio}
                onChange={(e) =>
                  setChanges((old) => ({ ...old, bio: e.target.value }))
                }
              />
            </div>
          </div>
        )}
        <div style={{ flex: "1", paddingTop: "1rem" }}>
          <IconButton
            sx={{ position: "absolute", right: "35px" }}
            onClick={() =>
              setChanges((old) => ({ ...old, editing: !old.editing }))
            }
          >
            <EditIcon />
          </IconButton>
        </div>
      </div>
      <div></div>
    </div>
  );
});

export default PersonDetails;
