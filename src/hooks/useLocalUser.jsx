import {readOne} from "./useDB";

const getLocalUser = ()=>{
  return JSON.parse(localStorage.getItem("user"))
}

const setLocalUser = async (currentUser) => {
  var user = null
  if (currentUser) {
    const userData = await readOne("users", currentUser.uid);
    user = {
      uid: currentUser.uid,
      fname: userData?.bio.fName,
      lname: userData?.bio.lName,
      email: userData?.email,
      photoUrl: userData?.photoUrl,
      family: userData?.family,
      dBirth: userData?.bio.dBirth.toDate(),
      bio: userData?.bio.biography,
      hasCreatedTree: userData?.hasCreatedTree,
    }
  }
    localStorage.setItem("user", JSON.stringify(user));
};


export {getLocalUser, setLocalUser} ;