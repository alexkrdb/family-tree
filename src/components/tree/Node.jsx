import { Handle, Position } from "reactflow";
// import { Fragment } from "react";

function Node({ data }) {
  return (
    <div className="treeNode">
      <img src={data.photoUrl} alt="Photo" />
      <div>
        <p>{data.firstName + " " + data.lastName}</p>
        <hr />
        <p>
          01.01.1912
          <br />
          02.10.2000
        </p>
      </div>
      <div>
        <button className="addParent">+</button>
        <button className="addPartner">+</button>
        <button className="addChild">+</button>
      </div>
      <Handle id="parents" type="source" position={Position.Top} />
      <Handle id="children" type="target" position={Position.Bottom} />
    </div>
  );
}

export default Node;
