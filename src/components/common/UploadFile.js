import { TextField } from "@mui/material";
import { upload } from "@testing-library/user-event/dist/upload";
import React from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";
function UploadFile({ file, setFile }) {
  const [progress, setProgress] = React.useState(0);
  const upload = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];

    const storageRef = ref(storage, `images/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(p);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error, "error while upload");
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFile(downloadURL);
          setProgress(0);
        });
      }
    );
  };
  return progress > 0 ? (
    <div>{progress} %</div>
  ) : (
    <TextField
      type={"file"}
      inputProps={{
        accept: "image/*",
      }}
      onChange={(e) => upload(e)}
    />
  );
}

export default UploadFile;
