import { AuthContext } from "../context/AuthContex";
import { useEffect, useContext, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNodesState } from "reactflow";
import Node from "../components/tree/Node";
//custom react hook
//!simplifies complicates getting data from database and updating nodes
export const usePersons = () => {
  const { currentUser } = useContext(AuthContext);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const nodeTypes = useMemo(() => ({ treeNode: Node }), []);

  const fetchData = async () => {
    console.log("Nodes: fetching data from database");
    const rawData = await getDocs(
      collection(db, "trees", currentUser.uid, "persons")
    );

    //adding nodeType attribute to nodes
    const tempPersonArray = [];
    rawData.forEach((person) => {
      let tempPersonData = person.data();
      // console.log(tempPersonData)
      tempPersonData.type = "treeNode";
      tempPersonArray.push(tempPersonData);
    });

    setNodes(tempPersonArray);
  };

  const saveTree = () => {
    currentUser && console.log("saved");
    //there should be saving local changes to localStorage after leaving tree page
  };

  useEffect(() => {
    currentUser && fetchData();
    return saveTree;
  }, [currentUser]);

  return [nodes, setNodes, onNodesChange, nodeTypes];
};
