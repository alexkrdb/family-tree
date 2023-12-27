import ReactFlow, { Background, Controls, Panel } from "reactflow";
import "reactflow/dist/style.css";
import { usePersons } from "../../hooks/usePersons";
import { useRelations } from "../../hooks/useRelations";
import getLayoutedElements from "../../components/tree/layoutEngine";
import { useCallback } from "react";
// import PersonFormDialog, {
//   useFormDialog,
// } from "../../components/tree/PersonFormDialog";
import { getLocalUser, setLocalUser } from "../../hooks/useLocalUser";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Treectx } from "../../context/TreeContext";

function Tree() {
  const [edges, setEdges, onEdgesChange] = useRelations();
  const [nodes, setNodes, onNodesChange, nodeTypes] = usePersons();

  const onLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges
    );
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  }, [nodes, edges]);

  return (
    <div className="treePage">
      <div className="pageContent">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Treectx propsToPass={{edges, setEdges, nodes, setNodes}}>
            <ReactFlow
              nodes={nodes}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              edges={edges}
              onEdgesChange={onEdgesChange}
              fitView>
              <Background />
              <Controls />
              <Panel position="top-right">
                <button onClick={() => onLayout()}>vertical layout</button>
              </Panel>
            </ReactFlow>
          </Treectx>
        </LocalizationProvider>
      </div>
    </div>
  );
}

export default Tree;


{/* 
  const user = getLocalUser();{!user.hasCreatedTree && (
          <PersonFormDialog
            id={0}
            handleOpen={handleOpen}
            handleClose={handleClose}
            open={open}
            nodeId="root"
            defaultData={user}
            title="Creating your first node"
            key={user.uid}
          />
        )} */}