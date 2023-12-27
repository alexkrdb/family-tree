import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { storage } from "../config/firebase";
import { v1 } from "uuid";

const UseFileUpload = (fileUrl = "images", typePrefix = "IMG_") => {
  const [files, setFiles] = useState([]);

  const uploadFiles = async (otherFiles = files) => {
    const fileRefs = [];
    const promises = [];
    for (const file of otherFiles){
      if(!file) continue 
      const fileRef = ref(storage, `${fileUrl}/${typePrefix}${v1()}`);
      fileRefs.push(await uploadBytes(fileRef, file));
    };
    for(const fileRef of fileRefs){
      const url = getDownloadURL(fileRef.ref)
      promises.push(url)
    }

    return Promise.all(promises)
  };

  return [files, setFiles, uploadFiles];
};

export default UseFileUpload;
