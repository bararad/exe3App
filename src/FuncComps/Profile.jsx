
import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import { useNavigate } from 'react-router-dom';

export default function Profile() {

  let navigate=new useNavigate();
  let userInSession = JSON.parse(sessionStorage.getItem('connectedUser'));

  let adress = userInSession.userStreet + " " + userInSession.userHomeNum + "," + userInSession.userCity
  let fullname = (userInSession.userFirstName + " " + userInSession.userLastName);
  const onUpdateClick = () => {
    navigate('/EditDetails')

  }
  const onToGameClick = () => {
    
    window.location.href="https://www.shooter-bubble.com/";

  }
  const logoutUser = () => {
    sessionStorage.clear();
    navigate('/');
  }

  return (
    <Card>

      {<CardContent style={{ display: 'flex', alignItems: 'center', backgroundColor: 'beige' }}>
        <div>

          <Typography variant="h2" component="div">
            {fullname.toUpperCase()}

            <Avatar
              alt="User Avatar"
              src={userInSession.userImage}
              sx={{ width: 150, height: 150, marginRight: 5 }}
            />
          </Typography>
        </div>
        <div>
          <Typography color="text.secondary" gutterBottom>
            <EmailOutlinedIcon sx={{ marginRight: 1, marginBottom: -0.8 }} />
            Email: {userInSession.userEmail}
          </Typography>
          <br />
          <Typography color="text.secondary" gutterBottom>
            <RoomOutlinedIcon sx={{ marginRight: 1, marginBottom: -0.8 }} />
            Address: {adress}
          </Typography>
          <br />
          <Typography color="text.secondary" gutterBottom>
            <CakeOutlinedIcon sx={{ marginRight: 1, marginBottom: -0.8 }} />
              Birth Date: {userInSession.userDofBirth}
          </Typography>
          <br />
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            '& button': {
              m: 1,
            },
          }}>
            <Button size='small' variant="contained"
              sx={{ backgroundColor: 'grey', '&:hover': { backgroundColor: 'grey' } }}
              onClick={onUpdateClick}>
              Update
            </Button>
            <Button size='small' variant="contained" onClick={onToGameClick}>
              To the Game
            </Button>
            <Button size='small' variant="contained"
              sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'red' } }}
              onClick={logoutUser}>
              Disconnect
            </Button>


          </Box>
        </div>

      </CardContent>}
    </Card>
  )
}






