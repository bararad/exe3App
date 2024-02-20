import React, { useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function SystemAdmin(props) {

  const users = props.users;
  const navigate = useNavigate();
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

  const updateSession = (user) => {
    sessionStorage.setItem("connectedUser", JSON.stringify(user));
  }

  const editUser = (userMail) => () => {
    let editUser = users.find(user => user.userEmail === userMail);
    updateSession(editUser);
    let str = '/SystemAdmin';
    navigate('/EditDetails', { state: str });
  }

  const deleteUser = (userMail) => () => {
    // filter out the user with matching mail 
    const updatedUsersList = users.filter(user => user.userEmail !== userMail);
    console.log(updatedUsersList);
    Swal.fire({
      icon: "info",
      title: "are you sure?",
      confirmButtonText: 'yes',
      cancelButtonText: 'no',
      showCancelButton: true,

    }).then((result) => {
      if (result.isConfirmed) {
        props.deleteUserinPar(updatedUsersList);
      }
      else{
        return;
      }
    });
  };

  return (
    <>
      <h3></h3>
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
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.username}>
                <TableCell>
                  <Avatar alt={row.username} src={row.image} />
                </TableCell>
                <TableCell scope="row">{row.username}</TableCell>
                <TableCell align="right">{row.fullname}</TableCell>
                <TableCell align="right">{row.dOfBirth}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={editUser(row.email)}>
                    <EditIcon />
                  </Button>
                  <Button variant="contained" color="error"
                    onClick={deleteUser(row.email)}
                    sx={{ margin: 1 }}>
                    <DeleteForeverIcon />
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
