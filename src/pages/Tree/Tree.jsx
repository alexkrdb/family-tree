import ReactFlow, { Background, Controls, Panel } from "reactflow";
import "reactflow/dist/style.css";
import { usePersons } from "../../hooks/usePersons";
import { useRelations } from "../../hooks/useRelations";
import getLayoutedElements from "../../components/tree/layoutEngine";
import { useCallback } from "react";

function Tree() {
  console.count("im refreshed");
  const [edges, setEdges, onEdgesChange] = useRelations();
  const [nodes, setNodes, onNodesChange, nodeTypes] = usePersons();

  
  const onLayout = useCallback(
    () => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  ); 

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
      </div>
    </div>
  );
}

export default Tree;
