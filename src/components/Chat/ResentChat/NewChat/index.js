import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import ChatCard from "../../../common/ChatCard";
import { db } from "../../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { userContext } from "../../../../context/userContext";
import { useNavigate } from "react-router-dom";
function NewChat() {
  const [loading, setLoading] = React.useState(true);
  const [allUsers, setAllUsers] = React.useState([]);
  const [state, dispatch] = React.useContext(userContext);
  const navigate = useNavigate();
  const fetchAllUsers = async () => {
    setLoading(true);
    //call firstore to get all users
    const q = query(
      collection(db, "userInfo"),
      where("email", "!=", state.user.email)
    );
    const querySnapshot = await getDocs(q);
    let users = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    setAllUsers(users);
    setLoading(false);
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const startAnewConversation = (item) => {
    console.log(item);
    // redriect to dms
    const last_message_id =
      state.user.email > item.email
        ? state.user.email + item.email
        : item.email + state.user.email;
    navigate(`/chat/dms/${item.email}/${last_message_id}`);
  };
  return (
    <Grid
      container
      spacing={3}
      className="chatCard"

      // onClick={onClnulick}
    >
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          {allUsers.map((item, i) => {
            return (
              <ChatCard
                name={item.name}
                // message={"hey"}
                item={item}
                // time={"12:00"}
                image={item.photo}
                // newMessage={1}
                onClick={startAnewConversation}
              />
            );
          })}
        </div>
      )}
    </Grid>
  );
}

export default NewChat;
