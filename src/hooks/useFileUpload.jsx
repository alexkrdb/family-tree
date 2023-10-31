import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../config/firebase";
import { v1 } from "uuid";

const UseFileUpload = (fileUrl = "images", typePrefix = "IMG_") => {
  const [files, setFiles] = useState([]);

  const uploadFiles =async () => {
    const promises = [];
    files.forEach(async (file) => {
      const fileRef = ref(storage, `${fileUrl}/${typePrefix}${v1()}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef)
      console.log(url);
      promises.push(url);
    });

    return Promise.all(promises)
  };

  return [files, setFiles, uploadFiles];
};

export default UseFileUpload;
