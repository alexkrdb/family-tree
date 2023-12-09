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

function Tree() {
  console.count("im refreshed");
  const [edges, setEdges, onEdgesChange] = useRelations();
  const [nodes, setNodes, onNodesChange, nodeTypes] = usePersons();
  const user = getLocalUser()
  // const { open, handleOpen, handleClose } = useFormDialog({
  //   id: 0,
  //   isOpen: true,
  // });
  
  const onLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges
      );
      
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    }, [nodes, edges]);

    user.hasCreatedTree = true
    // user.hasCreatedTree && setLocalUser({...user, hasCreatedTree: nodes.length > 0})
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
          <Panel position="top-right">
            <button onClick={() => onLayout()}>vertical layout</button>
          </Panel>
        </ReactFlow>
        {/* {!user.hasCreatedTree && (
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
      </div>
    </div>
  );
}

export default Tree;
