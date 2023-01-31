import { Grid } from "@mui/material";
import React, { useContext } from "react";
import { darkContext } from "../../context/DarkmodeContext";
import moment from "moment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
function ChatCard({ name, message, item, time, image, newMessage, onClick,pinFunction }) {
  const [openOptions, setOpenOptions] = React.useState(false);
  const [theme, setTheme] = useContext(darkContext);
  return (
    <>
      <Grid onClick={() => onClick(item)} item xs={2} className="chatCard__img">
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
      <Grid
        onClick={() => onClick(item)}
        item
        xs={7}
        className="chatCard__content"
      >
        <div className="chatCard__content__name">{name}</div>
        <div className="chatCard__content__message">{message}</div>
      </Grid>
      <Grid item xs={3} className="chatCard__time">
        {newMessage && (
          <div
            style={{
              display: "flex",
              alignItems: "self-end",
              justifyContent: "flex-end",
              padding: "10px 0px",
            }}
          >
            <MoreVertIcon onClick={() => setOpenOptions(!openOptions)} />
            {openOptions ? (
              <div className="chatMessage-replyOnreply-options">
                <div
                  style={{
                    border: "1px solid #0000000f",
                    padding: "5px",
                    fontSize: "11px",
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    pinFunction(item);
                    setOpenOptions(!openOptions);
                  }}
                >
                  pin/unpin
                </div>
              </div>
            ) : null}
          </div>
        )}
        {time && (
          <div className="chatCard__time">
            {moment(time.toDate()).format("LT")}
          </div>
        )}
      </Grid>
    </>
  );
}

export default ChatCard;
