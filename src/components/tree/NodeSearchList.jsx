import {
  Autocomplete,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import "./formDialog.scss";

const NodeSearchList = ({ nodes, onChange }) => {
  return (
      <Autocomplete
        selectOnFocus
        sx={{flex: 1}}
        clearOnBlur
        handleHomeEndKeys
        options={nodes}
        renderInput={(params) => (
          <TextField {...params} label="Wybierz osobę z drzewa" />
        )}
        renderOption={(props, { data: node }) => (
          <ListItem {...props}>
            <ListItemAvatar>
              <Avatar src={node.photoUrls[0]}></Avatar>
            </ListItemAvatar>
            <ListItemText primary={node.fName + " " + node.lName} />
          </ListItem>
        )}
        getOptionLabel={({data: node}) => {return node.fName + " " + node.lName}}
        onChange={onChange}
      />
  );
};

export default NodeSearchList;
