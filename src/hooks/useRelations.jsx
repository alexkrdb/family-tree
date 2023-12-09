import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContex";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEdgesState } from "reactflow";
import { readMany } from "./useDB";

export const useRelations = () => {
    const [edges, setEdges, onEdgesChange]= useEdgesState([]);
    const {currentUser} = useContext(AuthContext);
    
    const fetchRelations = async() => {
        console.log("Edges: fetching data from database");
        const data= await readMany([],"trees", currentUser.uid, "relations")
        data.map(el => {
            el.type = "step";
            return el;
        });
        console.log("procesed",data );
        setEdges(data);
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