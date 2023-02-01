import { Grid } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { darkContext } from "../../../context/DarkmodeContext";
import SwipableDrawer from "../../common/SwipableDrawer";
import ChatCard from "../../common/ChatCard";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import NewChat from "./NewChat";
import "./recentchat.css";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../../context/userContext";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
function ResentChat() {
  const [theme, setTheme] = useContext(darkContext);
  const navigate = useNavigate();
  const [openRecentChat, setOpenRecentChat] = React.useState(false);
  const [allLastMessages, setAllLastMessages] = React.useState(null);
  const [allPinMessages, setAllPinMessages] = React.useState([]);
  const [state, dispatch] = useContext(userContext);
  const [openNewChat, setOpenNewChat] = React.useState(false);

  const redirectToChat = (item) => {
    let secUser_email =
      item.user1.email === state.user.email
        ? item.user2.email
        : item.user1.email;
    navigate(`/chat/dms/${secUser_email}/${item.last_message_id}`);
  };
  const fetchLastMessages = async () => {
    const q = query(collection(db, "last_messages"));
    onSnapshot(q, (querySnapshot) => {
      const lastMessages = [];
      querySnapshot.forEach((doc) => {
        lastMessages.push({ ...doc.data(), id: doc.id });
      });
      console.log(lastMessages);
      setAllLastMessages(lastMessages);
    });
  };

  const fetchPinMessages = async () => {
    const q = query(
      collection(db, "userInfo"),
      where("email", "==", state.user.email)
    );
    onSnapshot(q, (querySnapshot) => {
      const pinConv = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().pinnedConversations) {
          pinConv.push(doc.data().pinnedConversations);
        }
      });
      console.log(pinConv[0]);
      setAllPinMessages(pinConv[0]);
    });
  };
  
  useEffect(() => {
    fetchLastMessages();
    fetchPinMessages();
  }, []);

  const pinFunction = async (item) => {
    const docRef = doc(db, "userInfo", state.user.email);
    var pinConv = [];
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      pinConv = docSnap.data().pinnedConversations || [];
    }
    let alreadyPinned = pinConv.find(
      (conv) => conv.last_message_id === item.last_message_id
    );
    if (alreadyPinned) {
      alert("unpinned");
      pinConv = pinConv.filter(
        (conv) => conv.last_message_id !== item.last_message_id
      );
    } else {
      alert("pinned");
      pinConv.push(item);
    }
    await setDoc(
      doc(db, "userInfo", state.user.email),
      {
        pinnedConversations: pinConv,
      },
      { merge: true }
    );
  };
  return (
    <div>
      <Grid
        className="recentchat-container"
        container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: '40px'
        }}
      >
        <Grid item xs={12}>
          Pinned Chats
        </Grid>
        {allPinMessages && allPinMessages.length === 0 ? (
          <div>no pined chat</div>
        ) : (
          <>
            {allPinMessages&&allPinMessages.map((item, i) => {
              return (
                <Grid item xs={6} onClick={() => redirectToChat(item)}>
                  <div
                    style={{
                      background: theme.pinchatbg,
                      color: theme.font1,
                    }}
                    className={`recentchat-item ${
                      i === 1 ? "new-message" : ""
                    }`}
                  >
                    <div className="recentchat-item__img">
                      <img
                        alt="Remy Sharp"
                        src={
                          item["user1"].email === state.user.email
                            ? item["user2"].photo
                            : item["user1"].photo
                        }
                      />

                      <div>{`${
                        item["user1"].email === state.user.email
                          ? "you"
                          : item["user1"].name
                      } replied to ${
                        item["user2"].email === state.user.email
                          ? "you"
                          : item["user2"].name
                      }`}</div>
                    </div>
                    <div className="recentchat-message">
                      hey cds cs c acsc asc sc sac sa cjs djks jkcacjkasc sca a
                      wdcwckqwcwcqw cwcwqdwwq
                    </div>
                  </div>
                </Grid>
              );
            })}
          </>
        )}
      </Grid>

      <SwipableDrawer
        title={"Recent Chats"}
        open={openRecentChat}
        setOpen={setOpenRecentChat}
      >
        <Grid
          container
          spacing={3}
          className="chatCard"
          sx={{
            marginTop: "10px",
          }}

          // onClick={onClnulick}
        >
          {allLastMessages && allLastMessages.length == 0 ? (
            <div>no chats</div>
          ) : allLastMessages && allLastMessages.length > 0 ? (
            <>
              {allLastMessages.map((item, i) => {
                return (
                  <ChatCard
                    pinFunction={pinFunction}
                    name={`${
                      item["user1"].email === state.user.email
                        ? "you"
                        : item["user1"].name
                    } replied to ${
                      item["user2"].email === state.user.email
                        ? "you"
                        : item["user2"].name
                    }`}
                    message={`${
                      item.message.messageType === "text"
                        ? item.message.message
                        : item.message.messageType === "image"
                        ? "image"
                        : "file"
                    }`}
                    time={item.createdAt}
                    item={item}
                    image={
                      item["user1"].email === state.user.email
                        ? item["user2"].photo
                        : item["user1"].photo
                    }
                    newMessage={1}
                    onClick={() => redirectToChat(item)}
                  />
                );
              })}
            </>
          ) : (
            <div>loading</div>
          )}
        </Grid>
      </SwipableDrawer>

      <div className="newchat-btn" onClick={() => setOpenNewChat(true)}>
        <MapsUgcIcon />
      </div>
      <div>
        <SwipableDrawer
          open={openNewChat}
          setOpen={setOpenNewChat}
          drawerBleeding={0}
          title={"new Chats"}
        >
          <NewChat />
        </SwipableDrawer>
      </div>
    </div>
  );
}

export default ResentChat;
