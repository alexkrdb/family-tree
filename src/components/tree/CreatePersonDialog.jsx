import PersonIcon from "@mui/icons-material/Person";
import {
  Modal,
  ModalContents,
  ModalDismissButton,
  ModalOpenButton,
} from "../modal/newModal";
import "./formDialog.scss";
import {
  Avatar,
  Checkbox,
  FormControlLabel,
  InputLabel,
  Select,
  TextField,
  Button,
  MenuItem,
  FormControl,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Fragment, useContext, useState } from "react";
import ImageInput from "../imageInput/ImageInput";
import { TreeContext } from "../../context/TreeContext";
import NodeSearchList from "./NodeSearchList";
import dayjs from "dayjs";

const CreatePersonDialog = ({
  title = "",
  buttonText = "Dodaj",
  onSave,
  color="primary",
  defState ={},
  ...props
}) => {
  const { nodes } = useContext(TreeContext);
  const [changes, setChanges] = useState({
    nodeId: defState.id || null,
    fName: defState.fName || "",
    lName: defState.lName || "",
    dBirth: defState.dBirth || null,
    dDeath: defState.dDeath || null,
    photoUrls: defState.photoUrls || "",
    file: null,
    sex: defState.sex || "male",
    bio: defState.bio || "",
  });

  return (
    <Modal>
      <ModalOpenButton>
        <Button color={color}>{buttonText}</Button>
      </ModalOpenButton>
      <ModalContents
        actions={
          <Fragment>
            <ModalDismissButton>
              <Button color="error">Cofnij</Button>
            </ModalDismissButton>
            <ModalDismissButton>
              <Button color="primary" onClick={() => onSave(changes)}>
                Zapisz
              </Button>
            </ModalDismissButton>
          </Fragment>
        }
        width="md"
        title={title}
      >
        <div className="personForm" style={{ padding: "6px 12px", width: "100%"}}>
          <div className="container">
            <label htmlFor={"avatar" + changes.userId}>
              <Avatar
                src={changes.avatar}
                sx={{ width: "200px", height: "200px" }}
              >
                <PersonIcon sx={{ fontSize: "100px" }} />
              </Avatar>
            </label>
            <ImageInput
              id={"avatar" + changes.userId}
              onChange={(e) =>
                setChanges((old) => ({
                  ...old,
                  file: e.target.files[0],
                  avatar: [URL.createObjectURL(e.target.files[0])],
                }))
              }
            />
            <div className="grid" style={{flex: 2}} >
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
                <DatePicker
                  label="Data urodzenia"
                  defaultValue={defState.dBirth && dayjs(defState.dBirth)}
                  onChange={(e) =>
                    setChanges((old) => ({ ...old, dBirth: e.toDate() }))
                  }
                />
                <FormControl >
                  <InputLabel id="personSex">Płeć</InputLabel>
                  <Select
                    value={changes.sex}
                    labelId="personSex"
                    defaultOpen={false}
                    label="Płeć"
                    onChange={(e) =>
                      setChanges((old) => ({ ...old, sex: e?.target?.value }))
                    }
                  >
                    <MenuItem value="female">Kobieta</MenuItem>
                    <MenuItem value="male">Mężczyzna</MenuItem>
                  </Select>
                </FormControl>
                <DatePicker
                  label="Data śmierci"
                  disabled={changes.isDead}
                  defaultValue={null}
                  onChange={(e) =>
                    setChanges((old) => ({ ...old, dDeath: e.toDate() }))
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!changes.isDead}
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

              <div
                className="grid-item-scaled"
                style={{ maxHeight: "146px", overflowX: "auto" }}
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
            <NodeSearchList nodes={nodes} onChange={(e, selectedPerson) => setChanges(old => ({...old, nodeId: selectedPerson.data.id}))}/>
          </div>
        </div>
      </ModalContents>
    </Modal>
  );
};

export default CreatePersonDialog;
