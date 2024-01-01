import React, { useContext, useState } from "react";
import { Button, TextField } from "@mui/material";
import { AuthContext } from "../../context/AuthContex";
import {
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import {
  Modal,
  ModalContents,
  ModalDismissButton,
  ModalOpenButton,
} from "../modal/newModal";
import "./helper.scss";
import { updateOne } from "../../hooks/useDB";

export const EditEmail = ({ ...props }) => {
  const { currentUser } = useContext(AuthContext);
  const [newEmail, setNewEmail] = useState({
    email: currentUser?.email,
    pwd: "",
  });
  const defaultError = {
    email: "",
    pwd: "",
  }
  const [errors, setErrors] = useState(defaultError);

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(newEmail.email);
  };

  const saveNewEmail = async (event) => {
    if (!validateEmail()) {
      setErrors({
        ...errors,
        email: "Proszę wprowadzić poprawny adres email",
      });
      event.stopPropagation();
      return;
    }

    const credential = EmailAuthProvider.credential(
      currentUser?.email,
      newEmail.pwd
    );

    reauthenticateWithCredential(currentUser, credential)
      .catch((error) => {
        console.log(error);
        setErrors({
          ...errors,
          pwd: "Nieprawidłowe hasło",
        });
        return
      })
      .then(() => {
        updateEmail(currentUser, newEmail.email).then(() => {
          updateOne({ email: newEmail.email }, "users", currentUser.uid);
          console.log("Successful email update");
          setErrors(defaultError);
        });
      });
  };
  return (
    <Modal>
      <ModalOpenButton>
        <Button variant="contained">Edytuj</Button>
      </ModalOpenButton>
      <ModalContents
        width="sm"
        title="Zmiana email"
        actions={
          <div>
            <ModalDismissButton>
              <Button color="error">Cofnij</Button>
            </ModalDismissButton>
            <Button onClick={saveNewEmail}>Zapisz</Button>
          </div>
        }
      >
        <div className="grid c2">
          <span className="grid-item">Nowy email:</span>
          <span className="grid-item">
            <TextField
              variant="standard"
              fullWidth
              value={newEmail.email}
              onChange={(e) =>
                setNewEmail((old) => ({
                  ...old,
                  email: e.target.value,
                }))
              }
              label="Wprowadź nowy email"
              error={!!errors.email}
              helperText={errors.email}
            />
          </span>
          <span className="grid-item">Hasło:</span>
          <span className="grid-item">
            <TextField
              variant="standard"
              type="password"
              fullWidth
              value={newEmail.pwd}
              onChange={(e) =>
                setNewEmail((old) => ({
                  ...old,
                  pwd: e.target.value,
                }))
              }
              label="Wprowadź hasło"
              error={!!errors.pwd}
              helperText={errors.pwd}
            />
          </span>
        </div>
      </ModalContents>
    </Modal>
  );
};

export const EditPassword = ({ ...props }) => {
  const { currentUser } = useContext(AuthContext);
  const [newPwd, setNewPwd] = useState({
    newPwd: "",
    repeatPwd: "",
    oldPwd: "",
  });
  const [errors, setErrors] = useState({
    oldPwd: "",
    newPwd: "",
    repeatPwd: "",
  });

  const validatePwd = () => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(newPwd.newPwd);
  };

  const saveNewPwd = (event) => {
    if (!validatePwd()) {
      setErrors({
        ...errors,
        newPwd:
          "Hasło musi mieć co najmniej 6 znaków, w tym co najmniej jedną literę i jedną cyfrę",
      });
      event.stopPropagation();
      return;
    }
    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        newPwd.oldPwd
      );

      reauthenticateWithCredential(currentUser, credential)
        .then(async () => {
          await updatePassword(currentUser, newPwd.newPwd);
          console.log("Successful password update");
        })
        .catch((error) => {
          console.log(error);
          setErrors({
            ...errors,
            oldPwd: "Nieprawidłowe stare hasło",
          });
          event.stopPropagation();
        });
    } catch (error) {
      console.log("Error updating password:", error);
      event.stopPropagation();
    }
  };

  return (
    <Modal>
      <ModalOpenButton>
        <Button variant="contained">Edytuj</Button>
      </ModalOpenButton>
      <ModalContents
        width="sm"
        title="Zmiana hasła"
        actions={
          <div>
            <ModalDismissButton>
              <Button color="error">Cofnij</Button>
            </ModalDismissButton>
            <ModalDismissButton>
              <Button onClick={saveNewPwd}>Zapisz</Button>
            </ModalDismissButton>
          </div>
        }
      >
        <div className="grid c2">
          <span className="grid-item">Stare hasło:</span>
          <span className="grid-item">
            <TextField
              variant="standard"
              type="password"
              fullWidth
              value={newPwd.oldPwd}
              onChange={(e) =>
                setNewPwd((old) => ({
                  ...old,
                  oldPwd: e.target.value,
                }))
              }
              label="Wprowadz stare hasło"
              error={!!errors.oldPwd}
              helperText={errors.oldPwd}
            />
          </span>
          <span className="grid-item">Nowe hasło:</span>
          <span className="grid-item">
            <TextField
              variant="standard"
              type="password"
              fullWidth
              value={newPwd.newPwd}
              onChange={(e) =>
                setNewPwd((old) => ({
                  ...old,
                  newPwd: e.target.value,
                }))
              }
              label="Wprowadz nowe hasło"
              error={!!errors.newPwd}
              helperText={errors.newPwd}
            />
          </span>
          <span className="grid-item">Powtórz nowe hasło:</span>
          <span className="grid-item">
            <TextField
              variant="standard"
              type="password"
              fullWidth
              value={newPwd.repeatPwd}
              onChange={(e) =>
                setNewPwd((old) => ({
                  ...old,
                  repeatPwd: e.target.value,
                }))
              }
              label="Powtórz nowe hasło"
              error={!!errors.repeatPwd}
              helperText={errors.repeatPwd}
            />
          </span>
        </div>
      </ModalContents>
    </Modal>
  );
};
