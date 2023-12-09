import { Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { memo, useState } from "react";
import "./formDialog.scss";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Person from "./person";

var person = null;

const savePerson = () => {
  console.log("person: ", person);
  // person.position.x +=
  person.savePerson();
  person = null;
};

const PersonForm = ({ id, defaultData }) => {
  const [isDisabled, setDisabled] = useState(true);
  if (person === null) person = new Person({ ...defaultData, id });

  return (
    <>
      <div className="photo-container">
        <img
          src={person.photoUrls[0]}
          style={{
            width: "300px",
            height: "300px",
            backgroundColor: "#b8d4db",
          }}
        />
      </div>
      <div className="container-vert">
        <div className="container">
          <TextField
            id="fname"
            label="First name"
            variant="outlined"
            defaultValue={person.fName}
            onChange={(e) => person.updateField("fName", e)}
          />
          <TextField
            id="lname"
            label="Last name"
            variant="outlined"
            defaultValue={person.lName}
            onChange={(e) => person.updateField("lName", e)}
          />
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              defaultValue={person.sex}
              onChange={(e) => person.updateField("sex", e)}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="container">
          <DatePicker
            label="Date of birth"
            defaultValue={person.dBirth && dayjs(person.dBirth)}
            onChange={(e) => person.updateDate("dBirth", e)}
          />
          <DatePicker
            id="dDeath"
            label="Date of death"
            disabled={isDisabled}
            defaultValue={person.dDeath && dayjs(person.dDeath)}
            onChange={(e) => person.updateDate("dDeath", e)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isDisabled}
                onChange={(e) => setDisabled(e.target.checked)}
              />
            }
            label="Is person alive?"
          />
        </div>
        <TextField
          id="bio"
          label="Bio"
          multiline
          fullWidth
          className="scrollable"
          variant="outlined"
          defaultValue={person.bio}
          onChange={(e) => person.updateField("bio", e)}
        />
      </div>
    </>
  );
};

export default memo(PersonForm);

export { savePerson };
