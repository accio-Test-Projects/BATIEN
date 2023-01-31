import React, { useContext } from "react";
import { userContext } from "../../../context/userContext";
import PDFicon from "../../../assets/PDFicon.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
function ChatMessage(props) {
  const [state, dispatch] = useContext(userContext);
  const [openOptions, setOpenOptions] = React.useState(false);
  const {
    messageType,
    replyOnreply,
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
                onClick={() => {
                  replyonReplyFunction({
                    message,
                    timeStamp,
                    senderName,
                    senderemail,
                  });
                  setOpenOptions(!openOptions);
                }}
              >
                Reply
              </div>
            </div>
          ) : null}
          <div>
            {replyOnreply ? (
              <div
                className="chatMessage-replyOnreply"
                style={{ background: "#c2c2ff85" }}
              >
                {replyOnreplyMessage.message.messageType === "text" ? (
                  <div>{replyOnreplyMessage.message.message}</div>
                ) : replyOnreplyMessage.message.messageType === "image" ? (
                  <div>
                     <a
                      href={replyOnreplyMessage.message.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                    <img
                      src={replyOnreplyMessage.message.url}
                      width="100%"
                      alt="img"
                    />
                    </a>
                  </div>
                ) : (
                  <div>
                    <a
                      href={replyOnreplyMessage.message.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img width="50px" alt="icon" src={PDFicon} />
                    </a>
                    <div>A doc</div>
                  </div>
                )}
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
        </div>
      ) : (
        <div className="chatMessage-incoming">
          <MoreVertIcon onClick={() => setOpenOptions(!openOptions)} />
          {openOptions ? (
            <div className="chatMessage-replyOnreply-options">
              <div
                onClick={() => {
                  replyonReplyFunction({
                    message,
                    timeStamp,
                    senderName,
                    senderemail,
                  });
                  setOpenOptions(!openOptions);
                }}
              >
                Reply
              </div>
            </div>
          ) : null}
          {openOptions && (
            <div className="chatMessage-options">
              <div>Reply</div>
            </div>
          )}
          <div>
            {replyOnreply ? (
              <div
                className="chatMessage-replyOnreply"
                style={{ background: "#c2c2ff85" }}
              >
                {replyOnreplyMessage.message.messageType === "text" ? (
                  <div>{replyOnreplyMessage.message.message}</div>
                ) : replyOnreplyMessage.message.messageType === "image" ? (
                  <div>
                     <a
                      href={replyOnreplyMessage.message.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                    <img
                      src={replyOnreplyMessage.message.url}
                      width="100%"
                      alt="img"
                    />
                    </a>
                  </div>
                ) : (
                  <div>
                   
                     <a
                     href={replyOnreplyMessage.message.url}
                      target="_blank"
                      rel="noreferrer"
                     > <img width="50px" alt="icon" src={PDFicon} /></a>
                   
                    <div>A doc</div>
                  </div>
                )}
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
