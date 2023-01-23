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
import GroupResentChat from "../components/Chat/GroupResentChat";
import ChatScreen from "../components/Chat/ChatScreen";
import GroupProfile from "../components/Profiles/GroupProfile";
import UserProfile from "../components/Profiles/UserProfile";
import Settings from "../components/Settings";
import MyProfile from "../components/Settings/MyProfile";
import ChatWallpaper from "../components/Settings/ChatWallpaper";
import {userContext} from '../context/userContext'
import Hoc from "../Hoc";
import { darkContext } from "../context/DarkmodeContext";
function Navs() {
  const [state, dispatch] = useContext(userContext);
  const [theme, setTheme] = useContext(darkContext);
  //protected routes
  const ProtectedRoute = () => {
    // if user is logged in, allow access to the route
    // if user is not logged in, redirect to login page
    if (
      state.isAuth
    ) {
      //allow access to the route
      return <Outlet />;
    } else {
      //redirect to login page
      return <Navigate to="/" />;
    }
  };
const BottomNav = () => {
    return (
      <Hoc>
        <Outlet />
      </Hoc>
    );
}
  return (
    <div
    
    style={{
      backgroundColor: theme.background,
    }}
    className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route element={<BottomNav />} >
          <Route path="/chat/resentchat" element={<ResentChat />} />
          <Route path="/chat/GroupResentChat" element={<GroupResentChat />} />
          <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/chat/newchat" element={<NewChat />} />
        
          <Route path="/chat/dms" element={<ChatScreen type='dms' />} />
          <Route path="/chat/groupchat" element={<ChatScreen type='group' />} />
          <Route path="/groupprofile" element={<GroupProfile />} />
          <Route path="/userprofile" element={<UserProfile />} />
        
          <Route path="/settings/profile" element={<MyProfile />} />
          <Route path="/settings/wallpaper" element={<ChatWallpaper />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default Navs;
