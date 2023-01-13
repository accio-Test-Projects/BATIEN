import React,{useContext} from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import LandingPage from "../components/LandingPage";
import Onboarding from "../components/Onboarding";
import ResentChat from "../components/Chat/ResentChat";
import NewChat from "../components/Chat/NewChat";
import GroupChat from "../components/Chat/GroupChat";
import Dms from "../components/Chat/Dms";
import GroupProfile from "../components/Profiles/GroupProfile";
import UserProfile from "../components/Profiles/UserProfile";
import Settings from "../components/Settings";
import MyProfile from "../components/Settings/MyProfile";
import ChatWallpaper from "../components/Settings/ChatWallpaper";
import {userContext} from '../context/userContext'
function Navs() {
  const [state, dispatch] = useContext(userContext);
  //protected routes
  const ProtectedRoute = () => {
    // if user is logged in, allow access to the route
    // if user is not logged in, redirect to login page
    if (
      //
      state.isAuth
    ) {
      //allow access to the route
      return <Outlet />;
    } else {
      //redirect to login page
      return <Navigate to="/" />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/chat/resentchat" element={<ResentChat />} />
          <Route path="/chat/newchat" element={<NewChat />} />
          <Route path="/chat/groupchat" element={<GroupChat />} />
          <Route path="/chat/dms" element={<Dms />} />
          <Route path="/groupprofile" element={<GroupProfile />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/profile" element={<MyProfile />} />
          <Route path="/settings/wallpaper" element={<ChatWallpaper />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Navs;
