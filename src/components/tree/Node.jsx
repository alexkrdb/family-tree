import { Handle, Position } from "reactflow";
import { Button } from "@mui/material";
import PersonForm, { savePerson } from "./PersonFormDialog";
import { v4 } from "uuid";
import { memo } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Modal,
  ModalContents,
  ModalDismissButton,
  ModalOpenButton,
} from "../../components/modal/newModal";
import { saveOne } from "../../hooks/useDB";

function SaveButton({ targetId, userId, sourceId, relation }) {
  return (
    <ModalDismissButton>
      <Button
        onClick={() => {
          savePerson();
          const rel = {
            className: relation,
            id: v4(),
            source: null,
            target: null,
          };
          if (relation == "parent") {
            rel.source = sourceId;
            rel.target = targetId;
          } else {
            rel.source = targetId;
            rel.target = sourceId;
          }

          console.log(rel);
          saveOne(rel, "trees", userId, "relations", rel.id);
        }}
      >
        Save
      </Button>
    </ModalDismissButton>
  );
}

function Node({ data }) {
  const addParent = v4();
  const addChild = v4();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal>
        <div className="treeNode">
          <img src={data.photoUrls[0]} alt="Photo" />
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
          <ModalContents title={data.fname+ " "+ data.lname} actions={<></>}>
            <PersonForm id={data.id} defaultData={data} key={data.id}/>
          </ModalContents>
          <div className="btnGroup">
            
            <Modal>
              <ModalOpenButton>
                <Button>Add parent</Button>
              </ModalOpenButton>
              <ModalContents
                title="Add parent"
                actions={
                  <SaveButton
                    targetId={addParent}
                    userId={data.userId}
                    sourceId={data.id}
                    relation="parent"
                  />
                }
              >
                <PersonForm
                  id={addParent}
                  defaultData={{ userId: data.userId }}
                />
              </ModalContents>
            </Modal>

            <Modal>
              <ModalOpenButton>
                <Button>Add child</Button>
              </ModalOpenButton>
              <ModalContents
                title="Add child"
                actions={
                  <SaveButton
                    targetId={addChild}
                    userId={data.userId}
                    sourceId={data.id}
                    relation="child"
                  />
                }
              >
                <PersonForm
                  id={addChild}
                  defaultData={{ userId: data.userId }}
                />
              </ModalContents>
            </Modal>
          </div>
          <Handle id="parents" type="source" position={Position.Top} />
          <Handle id="children" type="target" position={Position.Bottom} />
        </div>
      </Modal>
    </LocalizationProvider>
  );
}

export default memo(Node);
