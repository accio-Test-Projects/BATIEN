import { Grid, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import "./chatscreen.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CancelIcon from "@mui/icons-material/Cancel";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ChatMessage from "./ChatMessage";
import { useContext } from "react";
import { userContext } from "../../../context/userContext";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { darkContext } from "../../../context/DarkmodeContext";
import UploadFile from "../../common/UploadFile";
function ChatScreen({ type }) {
  const [state, dispatch] = useContext(userContext);
  const [theme, setTheme] = useContext(darkContext);
  const [sendMessage, setSendMessage] = React.useState({
    message: "",
    messageType: "text",
  });
  const [loading, setLoading] = React.useState(true);
  const [secUser, setSecUser] = React.useState(null);
  const [last_message, setLast_message] = React.useState(null);
  const [allMessages, setAllMessages] = React.useState([]);
  const [replyOnreplyData, setReplyOnreplyData] = React.useState(null);
  const { id, lastmessageId } = useParams();
  console.log(id, lastmessageId);
  useEffect(() => {
    fetchLastMessage();
  }, []);
  useEffect(() => {
    if (last_message) {
      if (type === "dms") {
        // get userInfo  from db
        fetchAllDms();
        // setState({
        //   ...state,
        //   currentChat:state.dms[parms.email]
        // })
      } else {
      }
    }
  }, [last_message]);
  useEffect(() => {
    if(type==="dms"){
      fetchUserInfo();
    }
  }, []);

  const fetchAllDms = async () => {
    try {
      const q = query(
        collection(db, "conversations"),
        where("conversationKey", "==", last_message?.conversationKey)
      );

      onSnapshot(q, (querySnapshot) => {
        let allMessages = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          allMessages.push(doc.data());
        });
        setAllMessages(allMessages.sort((a, b) => a.createdAt - b.createdAt));
      });
    } catch (err) {
      console.log(err);
    }
  };
  const fetchLastMessage = async () => {
    if (lastmessageId) {
      const docRef = doc(db, "last_messages", lastmessageId);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data(), "last message");
      setLast_message(docSnap.data());
    }
  };

  const fetchUserInfo = async () => {
    try {
      
      const docRef = doc(db, "userInfo", id);
      const docSnap = await getDoc(docRef);

      setSecUser(docSnap.data());
      setLoading(false);
    } catch (err) {
      console.log(err);
     
    }
  };
  const sendMessageHandler = async () => {
    const conversationKey = last_message?.conversationKey
      ? last_message.conversationKey
      : uuidv4();
    const last_message_id = lastmessageId ? lastmessageId : uuidv4();
    const messagePayload = {
      message: sendMessage,
      conversationKey,
      createdAt: new Date(),
      last_message_id,
      user1:
        {
          email: state.user.email,
          name: state.user.displayName,
          photo: state.user.photoURL,
        },
        user2:{
          email: secUser.email,
          name: secUser.name,
          photo: secUser.photo,
        },
    };
    console.log(messagePayload);
    try {
      await setDoc(doc(db, "last_messages", last_message_id), messagePayload);
    } catch (err) {
      console.log(err);
    }
    try {
      const convId = uuidv4();
      await addDoc(
        collection(db, "conversations"),
        {
          conversationKey,
          convId,
          createdAt: new Date(),
          message: sendMessage,
          replyOnreply: replyOnreplyData ? true : false,
          ...(replyOnreplyData && { replyOnreplyMessage: replyOnreplyData }),
          sender: {
            email: state.user.email,
            name: state.user.displayName,
          },
        },
        {
          merge: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
    setSendMessage({
      message: "",
      messageType: "text",
    });
    setReplyOnreplyData(null);

    if(!last_message){
      window.location.reload();
    }
  };
  const replyonReplyFunction = ({
    message,
    timeStamp,
    senderName,
    senderemail,
  }) => {
    setReplyOnreplyData({
      message,
      timeStamp,
      senderName,
      senderemail,
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${state.user.wallpaper})`,
      }}
      className="chatScreen-container"
    >
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          <Grid
            className="chatScreen-header"
            container
            sx={{
              color: theme.font1,
            }}
          >
            <Grid item xs={1}>
              <ArrowBackIcon color="black" sx={{}} />
            </Grid>
            <Grid item xs={2}>
              <div className="chatScreen-header_img">
                <img
                  style={{ width: "50px", borderRadius: "inherit" }}
                  src={secUser.photo}
                  alt="logo"
                />
              </div>
            </Grid>
            <Grid item xs={7.5}>
              <div
                style={{
                  color: theme.font1,
                }}
                className="chatScreen-header_name"
              >
                <div>{secUser.name}</div>
                <div>last seen</div>
              </div>
            </Grid>
            <Grid sx={{ display: "flex", color: theme.font1 }} item xs={1.5}>
              <IconButton>
                <MoreVertIcon
                  sx={{
                    color: theme.font1,
                  }}
                />
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
              {
                // [
                //   {
                //     sender:{name: "shobhit",
                //     email: "shobhitssd@g.com"},
                //     message: {
                //       messageType: "text",
                //       text: "Hello guys, we have discussed about post-corona vacation plan and our decision is to go to Bali. We will have a very big party after this corona ends! These are some images about our destination",
                //     },
                //     createdAt: "12:00",

                //     replyOnreply: false,
                //   },
                //   {
                //     sender:{name: "shobhit",
                //     email: "shobhitssd@g.com"},
                //     message: {
                //       messageType: "doc",
                //       url: "https://firebasestorage.googleapis.com/v0/b/workplace-jan-47bf9.appspot.com/o/file%2FAA071222075203O_RC02012023%20(1).pdf?alt=media&token=000eafd6-e5b3-478d-a85d-734875da7391",
                //     },
                //     createdAt: "12:00",

                //     replyOnreply: true,
                //   },
                //   {
                //     sender:{ name: "shobhit",
                //     email: "shobhitssd@g.com"},

                //     message: {
                //       messageType: "image",
                //       url: "https://images.unsplash.com/photo-1598755257130-c2aaca1f061c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2lsZCUyMGFuaW1hbHxlbnwwfHwwfHw%3D&w=1000&q=80",
                //     },
                //     createdAt: "12:00",

                //     replyOnreply: true,
                //     replyOnreplyMessage: {
                //       text: "reply on reply outging message",
                //     },
                //   },
                //   {
                //     sender:{name: "sahil",
                //     email: "sahil199926@gmail.com"},

                //     message: {
                //       text: "That’s very nice place! you guys made a very good decision. Can’t wait to go on vacation!",
                //     },
                //     createdAt: "12:00",
                //     messageType: "text",
                //     replyOnreply: true,
                //     replyOnreplyMessage: {
                //       text: "reply on reply outging message",
                //     },
                //   },
                //   {
                //     sender:{name: "sahil",
                //     email: "sahil199926@gmail.com"},
                //     messageType: "image",
                //     message: {
                //       url: "https://images.unsplash.com/photo-1598755257130-c2aaca1f061c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2lsZCUyMGFuaW1hbHxlbnwwfHwwfHw%3D&w=1000&q=80",
                //     },
                //     createdAt: "12:00",

                //     replyOnreply: false,
                //   },
                //   {
                //     sender:{name: "sahil",
                //     email: "sahil199926@gmail.com"},
                //     messageType: "doc",
                //     message: {
                //       url: "https://firebasestorage.googleapis.com/v0/b/workplace-jan-47bf9.appspot.com/o/file%2FAA071222075203O_RC02012023%20(1).pdf?alt=media&token=000eafd6-e5b3-478d-a85d-734875da7391",
                //     },
                //     createdAt: "12:00",

                //     replyOnreply: false,
                //   },
                // ]
                allMessages.map((item, i) => {
                  return (
                    <ChatMessage
                    
                      messageType={item.message.messageType}
                      replyOnreply={item.replyOnreply}
                      replyOnreplyMessage={
                        item.replyOnreplyMessage
                          ? item.replyOnreplyMessage
                          : null
                      }
                      message={item.message}
                      timeStamp={item.createdAt}
                      senderImg={item.sender.img}
                      senderName={item.sender.name}
                      senderemail={item.sender.email}
                      replyonReplyFunction={replyonReplyFunction}
                    />
                  );
                })
              }
            </div>
          </Grid>
          <Grid container spacing={2} className="chatScreen-input">
            {replyOnreplyData && (
              <Grid item xs={12}>
                <div className="replyOnreply">
                  {replyOnreplyData.message.messageType === "text" ? (
                    <div>{replyOnreplyData.message.message}</div>
                  ) : (
                    <div>file</div>
                  )}
                </div>
              </Grid>
            )}
            {sendMessage.url && (
              <Grid sx={{ display: "flex" }} item xs={12}>
                {sendMessage.messageType === "image" ? (
                  <div className="chatscreen-image">
                    <img width="100px" src={sendMessage.url} alt="img" />
                  </div>
                ) : (
                  <div className="chatscreen-image">
                    <a href={sendMessage.message.url} target="_blank">
                      {doc}
                    </a>
                  </div>
                )}
                <CancelIcon
                  onClick={() =>
                    setSendMessage({
                      ...sendMessage,
                      url: "",
                      messageType: "text",
                    })
                  }
                />
              </Grid>
            )}
            <Grid item xs={9}>
              <input
                value={sendMessage.message}
                onChange={(e) => {
                  setSendMessage({
                    ...sendMessage,
                    message: e.target.value,
                  });
                }}
                type="text"
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton>
                <UploadFile
                  icon={true}
                  setFile={(data) => {
                    setSendMessage({
                      ...sendMessage,
                      url: data,
                      messageType: "image",
                    });
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                onClick={sendMessageHandler}
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
        </>
      )}
    </div>
  );
}

export default ChatScreen;
