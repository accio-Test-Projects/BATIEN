import { TextField } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { db } from "../../../firebaseConfig";
import UploadFile from "../../common/UploadFile";
import './wallpaper.css'
import {userContext} from '../../../context/userContext'
function ChatWallpaper() {
  const [state,dispatch] = useContext(userContext);
  const [wallpaper, setWallpaper] = React.useState(state.user.wallpaper||null);
  const setData = async(data) => {
    setWallpaper(data);
    // set data to firebase userInfo 
    try{
    await setDoc(doc(db,'userInfo',state.user.email),{
      wallpaper:data
    },{merge:true})
    dispatch({
      type:'UPDATE',
      payload:{
        wallpaper:data
      }
    })
  }
  catch(err){
    console.log(err,'error while setting wallpaper');
  }

  }
  return (
    <div 
    className="chatWallpaper-container"
    >
      <div style={{
        width:'100%',
      }}>
        {wallpaper ? (
          <img
         style={{ width:'inherit'}}
          src={wallpaper} alt="wallpaper" />
        ) : (
          <div>no wallpaper</div>
        )}
      </div>
      <UploadFile
      file={wallpaper}
      setFile={(data)=>setData(data)}
      />
    </div>
  );
}

export default ChatWallpaper;
