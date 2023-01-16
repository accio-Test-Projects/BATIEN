import { Grid } from "@mui/material";
import React from "react";

function chatCard({ name, message, time, image, newMessage, onClick }) {
  return (
   <>
      <Grid item xs={2} className="chatCard__img">
        <img 
        style={{
         
            width: '30px',
            borderRadius: '50%',
            marginRight: '10px',
          
        }}
        src="https://lh3.googleusercontent.com/a/AEdFTp4vt6egY9bg6OFMRxW5RGLIOcPHMQ-xan1hGg8r-q8=s96-c" alt="Remy Sharp" />
      </Grid>
      <Grid item xs={8} className="chatCard__content">
        <div className="chatCard__content__name">{name}</div>
        <div className="chatCard__content__message">{message}</div>
      </Grid>
      <Grid item xs={2} className="chatCard__time">
        {newMessage && <div className="new-message">{newMessage}</div>}
        <div className="chatCard__time">{time}</div>
      </Grid>
    </>
  );
}

export default chatCard;
