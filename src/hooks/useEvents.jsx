import { useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { AuthContext } from "../context/AuthContex";
import { readMany } from "./useDB";

const useEvents = () => {
    const [events, setEvents] = useState([]);
    const { currentUser } = useContext(AuthContext);

    const fetchData = async () => {
        console.log("Fetching events from db")
        const snapshot = await readMany([where("userId", "==", currentUser.uid), limit(10)], "posts")
        setEvents(snapshot);
    }

    useEffect(()=> {
        currentUser && fetchData()
    }, [currentUser])


    return [events, setEvents];
}

export default useEvents;