import { Handle, Position } from "reactflow";
import MModal from "../modal/MModal";
import PersonFormDialog from "./PersonFormDialog";


function Node({ data }) {
  return (
    <div className="treeNode">
      <img src={data.photoUrl} alt="Photo" />
      <div>
        <p>{data.firstName + " " + data.lastName}</p>
        <hr />
        <p>
          {data.birthDate?.toDate().toLocaleDateString()||"?"}
          <br />
          {data.deathDate?.toDate().toLocaleDateString()}
        </p>
      </div>
      <div className="btnGroup">
        <PersonFormDialog/>
        <MModal buttonText="Add partner">
          <p>Add partner</p>
        </MModal>
        <MModal buttonText="Add child">
          <p>Add child</p>
        </MModal>
      </div>
      <Handle id="parents" type="source" position={Position.Top} />
      <Handle id="children" type="target" position={Position.Bottom} />
    </div>
  );
}



export default Node;
