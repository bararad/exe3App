import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
export default function SystemAdmin(props) {
  const users = props.users;

  const createData = (image, username, fullname, dOfBirth, address, email) => {
    return { image, username, fullname, dOfBirth, address, email };
  };

  const createRows = (users) => {
    return users.map((user) => ({
      image: user.userImage,
      username: user.userName,
      fullname: user.userFirstName + ' ' + user.userLastName,
      dOfBirth: user.userDofBirth,
      address: user.userStreet + ' ' + user.userHomeNum + ',' + user.userCity,
      email: user.userEmail,
    }));
  };

  const rows = createRows(users);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Username</TableCell>
              <TableCell align="right">Full Name</TableCell>
              <TableCell align="right">Date of Birth</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.username}>
                <TableCell>
                  <Avatar alt={row.username} src={row.image} />
                </TableCell>
                <TableCell component="th" scope="row">{row.username}</TableCell>
                <TableCell align="right">{row.fullname}</TableCell>
                <TableCell align="right">{row.dOfBirth}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">
                  <Button 
                  variant="contained" 
                  color="primary"
                  onClick={Edituser}>
                  <EditIcon/>
                  </Button>
                  <Button variant="contained" color="error"
                  sx={{margin:1}}>
                    <DeleteForeverIcon/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
