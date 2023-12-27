import { memo, useContext, useState } from "react";
import { TreeContext } from "../../context/TreeContext";
import { Autocomplete, Button, TextField } from "@mui/material";
import {batch, reference} from "../../hooks/useDB"
import { v4 } from "uuid";
import { AuthContext } from "../../context/AuthContex";

const PersonRelations = memo(({ person }) => {
  const {currentUser} = useContext(AuthContext)
  const { edges, nodes, setEdges } = useContext(TreeContext);
  const parentIds = edges.filter((edge) => person.id === edge.source);
  const childrenIds = edges.filter((edge) => person.id === edge.target);
  const parentNodes = nodes.filter(({ id }) =>
    parentIds.map((edge) => edge.target).includes(id)
  );
  const childrenNodes = nodes.filter(({ id }) =>
    childrenIds.map((edge) => edge.source).includes(id)
  );

  const [relatives, setRelatives] = useState({
    parents: parentNodes,
    children: childrenNodes,
  });

  const handleChange = (event) => {
    if (!window.confirm("Zachować zmiany?")) return;

    var parentDiff= diff(parentNodes, relatives.parents)
    var childrenDiff= diff(childrenNodes, relatives.children)
    var toRemoveParents = edges.filter((edge) => edge.source === person.id && parentDiff[0].includes(edge.target) ) 
    toRemoveParents.length > 0 && console.log("remove parents by id: ", toRemoveParents) 
    const newEdges = []
    for(var id of parentDiff[1]){
      var edge = {
        id: v4(),
        source: person.id,
        target: id,
        type: "smoothstep",
        changed: true
      }
      newEdges.push(edge)
      console.log("new parent: ",edge)
    }
    var toRemoveChildren = edges.filter((edge) => edge.target === person.id && childrenDiff[0].includes(edge.source) ) 
    toRemoveChildren.length > 0 && console.log("remove children by id: ", toRemoveChildren) 
    for(var id of childrenDiff[1]){
      var edge = {
        id: v4(),
        source: id,
        target: person.id,
        type: "smoothstep",
        changed: true
      }
      newEdges.push(edge)
      console.log("new child: ",edge)
    }
    const toRemove = [...toRemoveChildren, ...toRemoveParents] 
    const changes = batch()
    for(var edge of toRemove){
      const ref = reference("trees", currentUser.uid, "relations", edge.id)
      changes.delete(ref)
    } 
    changes.commit()
    setEdges((old) => [...old.filter(edge => !toRemove.map(({id}) => id).includes(edge.id)), ...newEdges])
  };

  const diff = (start, end) => {
    const toRemove = [...start];
    const toAdd = [];
    end.forEach((elem) => {
      var index = toRemove.findIndex(({ id }) => id === elem.id);
      if (index > -1) toRemove.splice(index, 1);
      else toAdd.push(elem.id);
    });
    return [toRemove.map(({id}) => id), toAdd]
  };
  return (
    <div className="container-vert p centered" style={{ marginTop: "1rem" }}>
      <Autocomplete
        renderInput={(params) => (
          <TextField {...params} label="Rodzice" variant="outlined" />
        )}
        options={nodes.filter(({ id }) => id !== person.id)}
        multiple
        placeholder="Rodzice"
        sx={{ width: "70%" }}
        renderOption={(props, { data }) => (
          <li {...props}>
            <span>{data.fName + " " + data.lName}</span>
          </li>
        )}
        value={relatives.parents}
        disableClearable
        getOptionLabel={({ data }) => data.fName + " " + data.lName}
        onChange={(ev, newInputValue) => {
          setRelatives((old) => ({ ...old, parents: newInputValue }));
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
      <Autocomplete
        disableClearable
        renderInput={(params) => (
          <TextField {...params} label="Dzieci" variant="outlined" />
        )}
        options={nodes.filter(({ id }) => id !== person.id)}
        multiple
        placeholder="Dzieci"
        sx={{ width: "70%" }}
        renderOption={(props, { data }) => (
          <li {...props}>
            <span>{data.fName + " " + data.lName}</span>
          </li>
        )}
        value={relatives.children}
        getOptionLabel={({ data }) => data.fName + " " + data.lName}
        onChange={(ev, newInputValue) => {
          setRelatives((old) => ({ ...old, children: newInputValue }));
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
      <Button variant="outlined" onClick={handleChange}>
        Zachowaj zmiany
      </Button>
    </div>
  );
});

export default PersonRelations;
