import ReactFlow, { Background, Controls, Panel } from "reactflow";
import "reactflow/dist/style.css";
import { usePersons } from "../../hooks/usePersons";
import { useRelations } from "../../hooks/useRelations";
import getLayoutedElements from "../../components/tree/layoutEngine";
import { useCallback } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Treectx } from "../../context/TreeContext";
import CreatePersonDialog from "../../components/tree/CreatePersonDialog";
import { getLocalUser } from "../../hooks/useLocalUser";
import { Button } from "@mui/material";
import UseFileUpload from "../../hooks/useFileUpload";
import { Timestamp } from "firebase/firestore";

function Tree() {
  const [edges, setEdges, onEdgesChange] = useRelations();
  const [nodes, setNodes, onNodesChange, nodeTypes] = usePersons();
  const user = getLocalUser();
  const [, , uploadFiles] = UseFileUpload();
  console.log(new Date(user.dBirth.substring(0, 9)));
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
          <Treectx propsToPass={{ edges, setEdges, nodes, setNodes }}>
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
                <Button onClick={() => onLayout()}>Auto Układ</Button>
              </Panel>
              {nodes.length == 0 && (
                <Panel position="top-center">
                  <CreatePersonDialog
                    defState={{
                      id: "root",
                      fName: user.fname,
                      lName: user.lname,
                      dBirth: new Date(user.dBirth.substring(0, 9)),
                      bio: user.bio,
                    }}
                    buttonText="Utworz drzewo"
                    title="Dodanie ciebie do drzewa"
                    onSave={async (changes) => {
                      const photoUrl = await uploadFiles([changes.file]);
                      setNodes([
                        {
                          id: "root",
                          position: { x: 0, y: 0 },
                          data: {
                            id: "root",
                            fName: changes.fName,
                            lName: changes.lName,
                            bio: changes.bio,
                            dBirth: changes.dBirth && Timestamp.fromDate(changes.dBirth),
                            dDeath: changes.dDeath && Timestamp.fromDate(changes.dDeath),
                            avatar: photoUrl[0] || null,
                            photoUrls: [],
                            sex: changes.sex,
                            userId: user.uid
                          },
                          type: "treeNode",
                          changed: true
                        },
                      ]);
                    }}
                  />
                </Panel>
              )}
            </ReactFlow>
          </Treectx>
        </LocalizationProvider>
      </div>
    </div>
  );
}

export default Tree;
