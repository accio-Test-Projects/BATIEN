import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
function Hoc({children}) {
  const [value, setValue] = React.useState(0);
  const navigate=useNavigate()
const handleClick = (newValue) => {
  setValue(newValue)
  if(newValue===0){
    navigate('/chat/resentchat')
  }
  if(newValue===1){
    navigate('/chat/GroupResentChat')
  }
  if(newValue===2){
    navigate('/settings')
  }
}
  return (
    <Box sx={{ width: 500,height:'100vh' }}>
      {children}
      <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 1000,
      }}
      >
      <BottomNavigation
      
        showLabels
        value={value}
        onChange={(event, newValue) => {
         handleClick(newValue)
        }}
      >
        <BottomNavigationAction label="Recent Chat" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Group chat" icon={<GroupIcon />} />
        <BottomNavigationAction label="settings" icon={<SettingsIcon />} />
      </BottomNavigation>
      </div>
    </Box>
  );
}

export default Hoc