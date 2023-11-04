import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../config/firebase";
import { v1 } from "uuid";

const UseFileUpload = (fileUrl = "images", typePrefix = "IMG_") => {
  const [files, setFiles] = useState([]);

  const uploadFiles = async () => {
    const fileRefs = [];
    const promises = [];
    // files.forEach(async (file) => {
    for await (const file of files){
      const fileRef = ref(storage, `${fileUrl}/${typePrefix}${v1()}`);
      fileRefs.push(uploadBytes(fileRef, file));
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
