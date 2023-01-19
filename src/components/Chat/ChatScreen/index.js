import { Grid, IconButton } from "@mui/material";
import React from "react";
import "./chatscreen.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ChatMessage from "./ChatMessage";
function ChatScreen({ type }) {
  return (
    <div className="chatScreen-container">
      <Grid
        className="chatScreen-header"
        container
        sx={{
          border: "1px solid black",
        }}
      >
        <Grid item xs={1}>
          <ArrowBackIcon
            color="black"
            sx={{
              color: "black",
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <div className="chatScreen-header_img">
            <img
              style={{ width: "50px", borderRadius: "inherit" }}
              src="https://lh3.googleusercontent.com/ogw/AAEL6shYPNjsXNSCG2B_c5CNaapyY07PvMV9pMhGTYuruo4=s64-c-mo"
              alt="logo"
            />
          </div>
        </Grid>
        <Grid item xs={7.5}>
          <div className="chatScreen-header_name">
            <div>sahil jaryal</div>
            <div>last seen</div>
          </div>
        </Grid>
        <Grid sx={{ display: "flex" }} item xs={1.5}>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid className="chatScreen-body">
        <div
          style={{
            overflow: "scroll",
            display: "grid",
            gridGap: "10px",
          
          }}
        >
          {[
            {
              name: "shobhit",
              email: "shobhitssd@g.com",
              message: { text: "Hello guys, we have discussed about post-corona vacation plan and our decision is to go to Bali. We will have a very big party after this corona ends! These are some images about our destination" },
              time: "12:00",
              messageType: "text",
              replyOnreply: false,
            },
            {
              name: "shobhit",
              email: "shobhitssd@g.com",
              message: {url:"https://firebasestorage.googleapis.com/v0/b/workplace-jan-47bf9.appspot.com/o/file%2FAA071222075203O_RC02012023%20(1).pdf?alt=media&token=000eafd6-e5b3-478d-a85d-734875da7391" },
              time: "12:00",
              messageType: "doc",
              replyOnreply: true,
            },
            {
              name: "shobhit",
              email: "shobhitssd@g.com",
              message: { url: "https://images.unsplash.com/photo-1598755257130-c2aaca1f061c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2lsZCUyMGFuaW1hbHxlbnwwfHwwfHw%3D&w=1000&q=80" },
              time: "12:00",
              messageType: "image",
              replyOnreply: true,
              replyOnreplyMessage:{
                text:"reply on reply outging message"
              }
            },
            {
              name: "sahil",
              email: "sahil199926@gmail.com",
           
              message: { text: "That’s very nice place! you guys made a very good decision. Can’t wait to go on vacation!" },
              time: "12:00",
              messageType: "text",
              replyOnreply: true,
              replyOnreplyMessage:{
                text:"reply on reply outging message"
              }
            },
            {
              name: "sahil",
              email: "sahil199926@gmail.com",
              message: { url: "https://images.unsplash.com/photo-1598755257130-c2aaca1f061c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2lsZCUyMGFuaW1hbHxlbnwwfHwwfHw%3D&w=1000&q=80" },
              time: "12:00",
              messageType: "image",
              replyOnreply: false,
            },
            {
              name: "sahil",
              email: "sahil199926@gmail.com",
              message: { url: "https://firebasestorage.googleapis.com/v0/b/workplace-jan-47bf9.appspot.com/o/file%2FAA071222075203O_RC02012023%20(1).pdf?alt=media&token=000eafd6-e5b3-478d-a85d-734875da7391" },
              time: "12:00",
              messageType: "doc",
              replyOnreply: false,
            },
          ].map((item, i) => {
            return (
              <ChatMessage
                messageType={item.messageType}
                replyOnreply={item.replyOnreply}
                replyOnreplyMessage={
                  item.replyOnreplyMessage ? item.replyOnreplyMessage : null
                }
                message={item.message}
                timeStamp={item.time}
                senderImg={item.img}
                senderName={item.name}
                senderemail={item.email}
              />
            );
          })}
        </div>
      </Grid>
      <Grid container spacing={2} className="chatScreen-input">
        <Grid item xs={9}>
          <input type="text" />
        </Grid>
        <Grid item xs={1}>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            size="small"
            sx={{
              background: "#2F80ED",
              borderRadius: "50%",
              color: "white",
              padding: "10px",
            }}
          >
            <SendOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}

export default ChatScreen;
