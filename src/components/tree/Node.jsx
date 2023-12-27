import { Handle, Position } from "reactflow";
import { Button } from "@mui/material";
import { v4 } from "uuid";
import { memo, useContext, useState } from "react";
import {
  Modal,
  ModalContents,
  ModalDismissButton,
  ModalOpenButton,
} from "../../components/modal/newModal";
import PersonDetails from "./PersonDetails";
import { TreeContext } from "../../context/TreeContext";
import CreatePersonDialog from "./CreatePersonDialog";
import { Timestamp } from "firebase/firestore";
import UseFileUpload from "../../hooks/useFileUpload";
import PersonIcon from '@mui/icons-material/Person';

function Node({ data }) {
  const [, , uploadFiles] = UseFileUpload();
  const { nodes, setNodes, setEdges } = useContext(TreeContext);
  const defState = {
    editing: false,
    isDead: true,
    ...data,
    dBirth: data.dBirth?.toDate(),
    dDeath: data.dDeath?.toDate(),
    tempPhotos: [],
    tempAvatar: null,
    photoUrls: data.photoUrls,
    files: [],
    bio: data.bio || "",
    lName: data.lName || "",
    fName: data.fName || "",
    sex: data.sex || "male",
    avatar: data.avatar|| ""
  }
  const [changes, setChanges] = useState(defState);
  const currentNode = nodes.find((node) => node.id === data.id);

  const onSaveNewPerson = async (person, rel) => {
    const relId = v4();
    let newPerson;
    const nodeId = person.nodeId || v4();
    console.log(person);
    if (!person.nodeId) {
      const newPosition = {
        x: currentNode.position.x,
        y: currentNode.position.y + (rel !== "parent" ? 300 : -300),
      };
      const photoUrls = await uploadFiles([person.file]);
      newPerson = {
        id: nodeId,
        data: {
          bio: person.bio,
          dBirth:
            person.dBirth !== null ? Timestamp.fromDate(person.dBirth) : null,
          dDeath:
            person.dDeath !== null && !person.isDead
              ? Timestamp.fromDate(person.dDeath)
              : null,
          fName: person.fName,
          lName: person.lName,
          id: nodeId,
          photoUrls: photoUrls,
          sex: person.sex,
          userId: "",
          avatar: photoUrls[0] || ""
        },
        type: "treeNode",
        position: newPosition,
        changed: true
      };
    }
    const newRelation = {
      id: relId,
      className: "parent",
      source: null,
      target: null,
      type: "smoothstep",
      changed: true
    };

    if (rel === "parent") {
      newRelation.source = data.id;
      newRelation.target = nodeId;
    } else {
      newRelation.source = nodeId;
      newRelation.target = data.id;
    }

    console.log(newPerson, newRelation);
    !person.nodeId && setNodes((old) => [...old, newPerson]);
    setEdges((old) => [...old, newRelation]);
  };

  const onUpdatePerson = async () => {
    console.log(currentNode.data, changes);
    const photoUrls = await uploadFiles([changes.file, ...changes.files]);
    const isNewAvatar = photoUrls.length === changes.files.length? currentNode.data.avatar || "": photoUrls[0]
    const newNode = {
      position: currentNode.position,
      id: currentNode.id,
      data: {
        bio: changes.bio,
        dBirth:
          !!changes.dBirth ? Timestamp.fromDate(changes.dBirth) : null,
        dDeath:
        !changes.isDead && !!changes.dDeath
            ? Timestamp.fromDate(changes.dDeath)
            : null,
        fName: changes.fName,
        lName: changes.lName,
        id: currentNode.id,
        photoUrls: [...photoUrls, ...currentNode.data.photoUrls],
        avatar: isNewAvatar,
        sex: changes.sex,
        userId: "",
      },
      type: "treeNode",
      changed: true
    };
    setChanges(old => ({...old, editing: false, files: [], file: null}))
    setNodes(old => [...old.filter(({data: data}) => data.id !== currentNode.id), newNode])
  };

  return (
    <Modal>
      <div className="treeNode">
        <div className="photo">
          {data.avatar ? <img src={data.avatar}/> :
          <PersonIcon sx={{fontSize: "100px"}}/>}
        </div>
        <ModalOpenButton>
          <div>
            <p>{data.fName + " " + data.lName}</p>
            <hr />
            <p>
              {data.dBirth?.toDate().toLocaleDateString() || "?"}
              <br />
              {data.dDeath?.toDate().toLocaleDateString()}
            </p>
          </div>
        </ModalOpenButton>
        <ModalContents
          width="md"
          title={data.fName + " " + data.lName}
          actions={
            <ModalDismissButton>
              <Button onClick={onUpdatePerson}>Zapisz</Button>
            </ModalDismissButton>
          }
        >
          <PersonDetails
            person={data}
            changes={changes}
            setChanges={setChanges}
            
          />
        </ModalContents>
        <div className="btnGroup">
          <CreatePersonDialog
            currentNode={data.id}
            title="Dodanie Rodzica"
            color="success"
            buttonText="Dodaj rodzica"
            onSave={(person) => onSaveNewPerson(person, "parent")}
          />
          <CreatePersonDialog
            currentNode={data.id}
            title="Dodanie Dziecka"
            buttonText="Dodaj dziecko"
            onSave={(person) => onSaveNewPerson(person, "child")}
          />
        </div>
        <Handle id="parents" type="source" position={Position.Top} />
        <Handle id="children" type="target" position={Position.Bottom} />
      </div>
    </Modal>
  );
}

export default memo(Node);
