import { AuthContext } from "../context/AuthContex";
import { useEffect, useContext, useMemo, useRef } from "react";
import { useNodesState } from "reactflow";
import Node from "../components/tree/Node";
import {  batch, readMany, reference } from "./useDB";
//custom react hook
//!simplifies complicates getting data from database and updating nodes
export const usePersons = () => {
  const { currentUser } = useContext(AuthContext);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const nodeTypes = useMemo(() => ({ treeNode: Node }), []);
  const ref = useRef();
  ref.current = nodes

  const saveTree = () => {
    if (currentUser != null) {
      const persons = batch();
        ref.current.forEach((node) => {
          if(node.changed){
          const ref = reference("trees", currentUser.uid, "persons",node.id);
          persons.set(ref, {data: node.data, id: node.id, position: node.position});
        }
      });
      persons.commit();
    }
  };

  const fetchData = async () => {
    const data = await readMany([], "trees", currentUser.uid, "persons");
    data.map((el) => {
      el.type = "treeNode";
      return el;
    });
    setNodes(data);
  };


  useEffect(() => {
    if(currentUser){
      fetchData();
      return saveTree;
    }
  }, [currentUser]);

  return [nodes, setNodes, onNodesChange, nodeTypes];
};
