import React, { useContext } from "react";
import { userContext } from "../../../context/userContext";
import PDFicon from '../../../assets/PDFicon.png'
function ChatMessage(props) {
  const [state, dispatch] = useContext(userContext);
  const {
    messageType,
    replyOnreply = false,
    message,
    timeStamp,
    senderImg,
    senderName,
    senderemail,
    replyOnreplyMessage,
  } = props;
  return (
    <div>
      {senderemail === state.user.email ? (
        <div className="chat-message-outgoing">
          {replyOnreply? <div 
          className="chatMessage-replyOnreply"
          >
            {replyOnreplyMessage.text}
          </div>:null}
          {messageType === "text" ? (
            <div> ount {message.text}</div>
          ) : messageType === "image" ? (
            <div> 
              <img src={message.url}
              width="100%"
              alt="img"
              />
            </div>
          ) : (
            <div>
               <a href={message.url}
              target="_blank"
              rel="noreferrer"
               >
              <img
              width='50px'
              alt="icon"
              src={PDFicon}/>
              </a>
              <div>A doc</div>
            </div>
          )}
        </div>
      ) : (
        <div className="chatMessage-incoming">
           {replyOnreply? <div className="chatMessage-replyOnreply" style={{background: "#c2c2ff85"}}>reply on reply</div>:null}
           {messageType === "text" ? (
            <div> inc {message.text}</div>
          ) : messageType === "image" ? (
            <div> 
                <img src={message.url}
              width="100%"
              alt="img"
              />
            </div>
          ) : (
            <div> 
              <a href={message.url}
              target="_blank"
              rel="noreferrer"
               >
              <img
              width='50px'
              alt="icon"
              src={PDFicon}/>
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
