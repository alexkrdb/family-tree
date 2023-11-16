
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";


const readOne = async (...path) => {
  const docSnap = await getDoc(doc(db, ...path));
  if (docSnap.exists()) return docSnap.data();
  return null;
};


const readMany = async ([...mquery], ...path) => {
  const querySnap = await getDocs(query(collection(db, ...path), ...mquery));
  return querySnap.docs.map((el) => el.data());
};

const readManyConv = async(converter, [...mquery], ...path) => {
  const querySnap = await getDocs(query(collection(db, ...path).withConverter(converter), ...mquery));
  return querySnap.docs.map((el) => el.data());
}


const saveOne = async (object, ...path) => {
  const docRef = doc(db, ...path);
  await setDoc(docRef, object);
  return;
};

const saveOneConv = async(object, converter, ...path) => {
  const docRef = doc(db, ...path).withConverter(converter);
  await setDoc(docRef, object);
}

const updateOne = async (object, ...path) => {
  const docRef = doc(db, ...path);
  await updateDoc(docRef, object);
  return;
};

const deleteOne = async (...path) => {
  deleteDoc(doc(db, ...path))
    .then(() => console.log("deleted at ", ...path))
    .catch((error) => console.error(error.message));
};

export { saveOne, saveOneConv, readMany, readOne, updateOne, deleteOne };

