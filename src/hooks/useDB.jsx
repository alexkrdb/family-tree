import { collection, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore"
import { db } from "../config/firebase"

const readOne = async(...path) => {
    const docSnap = await getDoc(doc(db, ...path))
    if(docSnap.exists())
        return docSnap.data()
    return null
}

const readMany = async([...mquery],...path) => {
    console.log(mquery, path);
    const querySnap = await getDocs(query(collection(db, ...path), ...mquery))
    return querySnap.docs.map((el) => el.data())
}

const saveOne = async(object, ...path) => {
    const docRef = doc(db, ...path)
    await setDoc(docRef, object)
    return;
}

export {saveOne, readMany, readOne};