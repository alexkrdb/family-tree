import ReactFlow, { Background, Controls, Panel } from "reactflow";
import "reactflow/dist/style.css";
import { usePersons } from "../../hooks/usePersons";
import { useRelations } from "../../hooks/useRelations";
import dagre from "@dagrejs/dagre";
import { useCallback } from "react";

function Tree() {
  const [edges, setEdges, onEdgesChange] = useRelations();
  const [nodes, setNodes, onNodesChange, nodeTypes] = usePersons();

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 330;
  const nodeHeight = 180;

  const getLayoutedElements = (nodes, edges, direction = "BT") => {
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = isHorizontal ? "left" : "bottom";
      node.sourcePosition = isHorizontal ? "right" : "top";

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };

      return node;
    });

    return { nodes, edges };
  };

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
