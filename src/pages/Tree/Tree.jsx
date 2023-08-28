import { useCallback, useMemo, useState } from "react";
import Node from "../../components/tree/Node";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

const persons = [
  {
    id: "root",
    data: {
      firstName: "John",
      lastName: "Black",
      photoUrl: "https://cdn.pixabay.com/photo/2015/08/05/04/25/people-875617_1280.jpg",
      dateOfBirth: ""
    },
    position: { x: 200, y: 400 },
    type: "treeNode",
  },
  {
    id: "parent_1",
    data: {
      firstName: "John",
      lastName: "Black",
      photoUrl: "https://cdn.pixabay.com/photo/2015/07/14/06/09/man-844211_1280.jpg",
    },
    position: { x: 0, y: 200 },
    type: "treeNode",
  },
  {
    id: "parent_2",
    data: {
      firstName: "John",
      lastName: "Black",
      photoUrl: "https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_1280.jpg",

    },
    position: { x: 400, y: 200 },
    type: "treeNode",
  },
];

const initialEdges = [
  { id: "root-parent2", source: "root", target: "parent_2", label: "", type: "step" },
  { id: "root-parent1", source: "root", target: "parent_1", label: "", type: "step" },
];

const childParentRel = {
  children: ["root"],
  parents: ["parent_1", "parent_2"],
};

function Tree() {
  const nodeTypes = useMemo(() => ({ treeNode: Node }), []);

  const [nodes, setNodes] = useState(persons);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <div className="treePage">
      <div className="pageContent">
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default Tree;
