import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContex";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEdgesState } from "reactflow";

export const useRelations = () => {
    const [edges, setEdges, onEdgesChange]= useEdgesState([]);
    const {currentUser} = useContext(AuthContext);
    
    const fetchRelations = async() => {
        console.log("Edges: fetching data from database");
        const rawData = await getDocs(collection(db, "trees", currentUser.uid, "relations"));
        const processedRel = []
        rawData.forEach((relation)=>{
            const tempRel = relation.data();
            tempRel.type = "step";
            processedRel.push(tempRel)
            // console.log(tempRel)
        })
        setEdges(processedRel);
    }

    const saveRelations = () => {
        currentUser&& console.log("there should be saving to localStorage/database")
    }

    useEffect(()=>{
        currentUser && fetchRelations();
        return saveRelations;
    }, [currentUser])

    return [edges, setEdges, onEdgesChange];
}