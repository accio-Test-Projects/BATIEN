import React, { useContext } from "react";
import { userContext } from "../../../context/userContext";
import PDFicon from "../../../assets/PDFicon.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
function ChatMessage(props) {
  const [state, dispatch] = useContext(userContext);
  const [openOptions, setOpenOptions] = React.useState(false);
  const {
    messageType,
    replyOnreply = false,
    message,
    timeStamp,
    senderImg,
    senderName,
    senderemail,
    replyOnreplyMessage,
    replyonReplyFunction,
  } = props;
  return (
    <div>
      {senderemail === state.user.email ? (
        <div className="chat-message-outgoing">
          <MoreVertIcon onClick={() => setOpenOptions(!openOptions)} />
          {openOptions ? (
            <div className="chatMessage-replyOnreply-options">
              <div
              onClick={() => replyonReplyFunction({
                message,
                timeStamp,
                senderName,
                senderemail
              })}
              >Reply</div>
            </div>
          ) : null}
          {messageType === "text" ? (
            <div>{message.message}</div>
          ) : messageType === "image" ? (
            <div>
              <img src={message.url} width="100%" alt="img" />
            </div>
          ) : (
            <div>
              <a href={message.url} target="_blank" rel="noreferrer">
                <img width="50px" alt="icon" src={PDFicon} />
              </a>
              <div>A doc</div>
            </div>
          )}
        </div>
      ) : (
        <div className="chatMessage-incoming">
          <MoreVertIcon />
          {openOptions && (
            <div className="chatMessage-options">
              <div>Reply</div>
            </div>
          )}
          {replyOnreply ? (
            <div
              className="chatMessage-replyOnreply"
              style={{ background: "#c2c2ff85" }}
            >
              reply on reply
            </div>
          ) : null}
          {messageType === "text" ? (
            <div>{message.message}</div>
          ) : messageType === "image" ? (
            <div>
              <img src={message.url} width="100%" alt="img" />
            </div>
          ) : (
            <div>
              <a href={message.url} target="_blank" rel="noreferrer">
                <img width="50px" alt="icon" src={PDFicon} />
              </a>
              <div>A doc</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ChatMessage;

// normal text incoming
// normal text outgoing

// image incoming
// image outgoing

//document incoming
//document outgoing

// reply on reply
