import React, { useContext } from "react";
import bg from "../../assets/Cover.svg";
import "./landingpage.css";
import signInIcon from "../../assets/signin.png";
import logo from "../../assets/logo.png";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/userContext";
import { doc,getDoc } from "firebase/firestore";
function LandingPage() {
  const [ state, dispatch ] = useContext(userContext);

  const navigate = useNavigate();
  const redirectUser = async({ displayName, email, photoURL }) => {
    // if user exists, redirect to resent chats
    // if user does not exist, redirect to onboarding
    dispatch({
      type: "LOGIN",
      payload: {
        displayName,
        email,
        photoURL,
      }
    })
    const docRef=doc(db,"userInfo",email)
    const docSnap=await getDoc(docRef)
    let user=null
    if(docSnap.exists()){
      user=docSnap.data()
    }
    if (user) {
      dispatch({
        type: "UPDATE",
        payload: {
          ...user,
        }
      });
      navigate("/chat/resentchat");
      // redirect to resent chats
    } else {
      // redirect to onboarding
      navigate("/onboarding");
    }
  };

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    console.log("sign in");
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        const user = result.user;
        const { displayName, email, photoURL } = user;

        redirectUser({ displayName, email, photoURL });
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div>
        <div className="heading">
          <img src={logo} width="60px" alt="logo" />
          <div>BATIEN</div>
        </div>

        <button onClick={signIn}>
          <img src={signInIcon} alt="sign in" width="100%" />
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
