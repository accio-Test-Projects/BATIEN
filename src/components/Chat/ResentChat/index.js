import { Grid } from "@mui/material";
import React, { useContext } from "react";
import { darkContext } from "../../../context/DarkmodeContext";
import SwipableDrawer from "../../common/SwipableDrawer";
import ChatCard from "../../common/ChatCard";
import "./recentchat.css";
function ResentChat() {
  const [state, dispatch] = useContext(darkContext);
  const toggleTheme = (color) => {
    dispatch({
      type: color,
    });
  };
  return (
    <div>
      <Grid className="recentchat-container" container>
        <Grid item xs={12}>
          Pinned Chats
        </Grid>

        {[1, 2, 3, 4, 5].map((item, i) => {
          return (
            <Grid item xs={6}>
              <div className={`recentchat-item ${i == 1 ? "new-message" : ""}`}>
                <div className="recentchat-item__img">
                  <img
                    alt="Remy Sharp"
                    src="https://lh3.googleusercontent.com/a/AEdFTp4vt6egY9bg6OFMRxW5RGLIOcPHMQ-xan1hGg8r-q8=s96-c"
                  />

                  <div>name dc sc s acascsa c</div>
                </div>
                <div className="recentchat-message">
                  hey cds cs c acsc asc sc sac sa cjs djks jkcacjkasc sca a
                  wdcwckqwcwcqw cwcwqdwwq
                </div>
              </div>
            </Grid>
          );
        })}
      </Grid>
      <div>
        <SwipableDrawer>
        <Grid
      container
     spacing={3}
    
      className="chatCard"
      // onClick={onClnulick}
    >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => {
            return (
              <ChatCard
                name={"shobhit"}
                message={"hey"}
                time={"12:00"}
                image={
                  "https://lh3.googleusercontent.com/a/AEdFTp4vt6egY9bg6OFMRxW5RGLIOcPHMQ-xan1hGg8r-q8=s96-c"
                }
                newMessage={1}
                onClick={null}
              />
            );
          })}
         
         </Grid>
        </SwipableDrawer>
      </div>
    </div>
  );
}

export default ResentChat;
