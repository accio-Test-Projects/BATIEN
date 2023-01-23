import { Divider, Grid } from "@mui/material";
import React, { useContext } from "react";
import DarkToggle from "../common/DarkToggle";
import Person2Icon from "@mui/icons-material/Person2";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./settings.css";
import { useNavigate } from "react-router-dom";
import { darkContext } from "../../context/DarkmodeContext";
function Settings() {
  const [theme, setTheme] = useContext(darkContext);
  const navigate = useNavigate();
  return (
    <Grid 
    style={{
      color: theme.font3,
    }}
    container>
      <Grid item xs={12}>
        <div
          className="settings-header"
        >
          Settings
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
        
          className="settings-profile"
        >
          <div>
            <img
              width={50}
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="Avatar"
            />
          </div>
          <div
           
          >
            <h3>name</h3>
            <h4>
              dniunu xsaxsaxsad wdw da daw dwdawdwniu nui niu n uin iu n iun iun
              cdcdwqdw{" "}
            </h4>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <div  className="settings-dark-mode">
          <div>
            <DarkModeIcon /> <span>Dark Mode</span>
          </div>

          <DarkToggle />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          onClick={() => navigate("/settings/profile")}
          className="settings-account"
        >
          <div>
            <Person2Icon />
            <span> account settings</span>
          </div>
          <ArrowForwardIosIcon />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          onClick={() => navigate("/settings/wallpaper")}
          className="settings-chat-wallpaper"
        >
          <div>
            <ChatBubbleIcon />
            <span> chat wallpaper</span>
          </div>{" "}
          <ArrowForwardIosIcon />
        </div>
      </Grid>
    </Grid>
  );
}

export default Settings;
