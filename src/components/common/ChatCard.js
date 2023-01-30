import { Grid } from "@mui/material";
import React, { useContext } from "react";
import { darkContext } from "../../context/DarkmodeContext";

function ChatCard({ name, message,item, time, image, newMessage, onClick }) {
  const [theme, setTheme] = useContext(darkContext);
  return (
    <>
      <Grid
      onClick={()=>onClick(item)}
      item xs={2} className="chatCard__img">
        <img
          style={{
            width: "30px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
          src={image}
          alt="Remy Sharp"
        />
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

export default ChatCard;
