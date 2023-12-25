import { useContext, useEffect, useState } from "react";
import { limit, orderBy,  where } from "firebase/firestore";
import { AuthContext } from "../context/AuthContex";
import { readMany } from "./useDB";
import {getLocalUser} from "./useLocalUser"

const useEvents = () => {
    const [events, setEvents] = useState([]);
    const user = getLocalUser()
    const {currentUser} = useContext(AuthContext)
    
    useEffect(()=> {
        const fetchData = async () => {
            console.log("Fetching events from db, ", user.family)
            const snapshot = await readMany([where("userId", "in", [...user.family, currentUser.uid]), limit(10), orderBy("insertedAt", "desc")], "posts")
            setEvents(snapshot);
        }
        
        !!currentUser && fetchData()
    }, [currentUser])


    return [events, setEvents];
}

export default useEvents;