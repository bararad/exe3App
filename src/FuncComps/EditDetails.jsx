import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete, Box, FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2';
import { Avatar, Typography } from '@mui/material';


export default function EditDetails(props) {

  let userInSession = JSON.parse(sessionStorage.getItem('connectedUser'));

  const fixDate = (date) => {

    let parts = date.toString().split('.');
    if (parts[1].length != 2) {
      parts[1] = "0" + parts[1];
    }

    let chosenDate = parts[2] + '-' + parts[1] + '-' + parts[0];
    return chosenDate;
  }

  let chosenDate = fixDate(userInSession.userDofBirth);

  const cities = ['Jerusalem', 'Tel Aviv', 'Haifa', 'Beersheba',
    'Netanya', 'Eilat', 'Ashdod', 'Rishon LeZion'];

  const [user, setUser] = useState({
    userName: userInSession.userName,
    userPassword: userInSession.userPassword,
    password2: userInSession.userPassword,
    userImage: userInSession.userImage,
    userFirstName: userInSession.userFirstName,
    userLastName: userInSession.userLastName,
    userEmail: userInSession.userEmail,
    userDofBirth: chosenDate,
    userCity: userInSession.userCity,
    userStreet: userInSession.userStreet,
    userHomeNum: userInSession.userHomeNum
  });

  const [userError, setUserError] = useState({});
  const [userErrorMsg, setUserErrorMsg] = useState({});


  //validation for user name
  const validateUserName = (e) => {
    let text = e.target.value;
    const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};:'",.<>\/?]{1,60}$/;
    if (!regex.test(text)) {
      setUserError(prev => { return { ...prev, userName: true, } })
      setUserErrorMsg((prev) => { return { ...prev, userName: 'Invalid input! Only English letters, numbers, and specific special characters allowed. Maximum 60 characters.' } });
    } else {
      setUser(prev => { return { ...prev, userName: text } });
      setUserError(prev => { return { ...prev, userName: false, } })
      setUserErrorMsg((prev) => { return { ...prev, userName: '' } });
    }
  };

  //validation for password
  const validatePassword = (e) => {
    let text = e.target.value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};:'",.<>\/?]).{7,12}$/;
    if (!regex.test(text)) {
      setUserError(prev => { return { ...prev, userPassword: true, } })
      setUserErrorMsg((prev) => { return { ...prev, userPassword: 'Invalid password! Password must contain between 7 and 12 characters, at least one special character, one uppercase letter, and one number.' } });
    } else {
      setUser(prev => { return { ...prev, userPassword: text } });
      setUserError(prev => { return { ...prev, userPassword: false, } })
      setUserErrorMsg((prev) => { return { ...prev, userPassword: '' } });
    }
  };

  //validation for second password input
  const validatePassword2 = (e) => {
    let text = e.target.value
    if (text != user.userPassword || text == '') {
      setUserError(prev => { return { ...prev, password2: true, } })
      setUserErrorMsg((prev) => { return { ...prev, password2: 'Passwords dont match. currecet your password' } });
    } else {
      setUser(prev => { return { ...prev, password2: text } });
      setUserError(prev => { return { ...prev, password2: false, } })
      setUserErrorMsg((prev) => { return { ...prev, password2: '' } });
    }
  };

  //validation for image
  const validateImage = (e) => {
    const file = e.target.files[0];
    console.log('file: ', file);

    if (file) {
      const extension = file.name.split('.').pop().toLowerCase(); // Get the file extension
      console.log('extension: ', extension);
      if (extension === 'jpg' || extension === 'jpeg') {
        const reader = new FileReader();
        reader.onloadend = () => {
          console.log('has been fully loaded');
          //Result from the FileReader set the image in the state
          setUser(prev => ({ ...prev, userImage: reader.result }));
          setUserError(prev => { return { ...prev, userImage: false, } })
          setUserErrorMsg((prev) => { return { ...prev, userImage: '' } });
        };
        reader.readAsDataURL(file);
      }
      else {
        setUserError(prev => ({ ...prev, userImage: true }));
        setUserErrorMsg(prev => ({ ...prev, userImage: 'Invalid file format. Only JPG or JPEG files are allowed.' }));
      }
    }

  };

  //validation for first name
  const validateFirstName = (e) => {

    //check for the image: console.log(' reader.result: ', user.userImage);

    let firstName = e.target.value;
    const regex = /^[\p{L}]+$/u;  //allows only text
    if (!regex.test(firstName)) {
      setUserError(prev => { return { ...prev, userFirstName: true, } })
      setUserErrorMsg((prev) => { return { ...prev, userFirstName: "Only text allowed, please correct your name" } });
    } else {
      setUser(prev => { return { ...prev, userFirstName: firstName } });
      setUserError(prev => { return { ...prev, userFirstName: false, } })
      setUserErrorMsg((prev) => { return { ...prev, userFirstName: '' } });
    }
  };

  //validation for last name
  const validateLastName = (e) => {
    const lastName = e.target.value;
    const regex = /^[\p{L}]+$/u;  //allows only text
    if (!regex.test(lastName)) {
      setUserError(prev => { return { ...prev, userLastName: true, } })
      setUserErrorMsg((prev) => { return { ...prev, userLastName: "Only text allowed, please correct your last name" } });
    } else {
      setUser(prev => { return { ...prev, userLastName: lastName } });
      setUserError(prev => { return { ...prev, userLastName: false, } })
      setUserErrorMsg((prev) => { return { ...prev, userLastName: '' } });
    }
  };

  //validation for user date of birth
  const validateUserDate = (e) => {
    let d = e.target.value;

    const birthDate = new Date(d)
    const today = new Date();

    if (birthDate > today) {
      setUserError(prev => ({ ...prev, userDofBirth: true }));
      setUserErrorMsg(prev => ({ ...prev, userDofBirth: "Birth date cannot be in the future" }));
      return;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    const formattedBirthDate = new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    //console.log(formattedBirthDate);
    if (age >= 18 && age <= 120) {
      setUser(prev => ({ ...prev, userDofBirth: formattedBirthDate.toLocaleDateString() }));
      setUserError(prev => ({ ...prev, userDofBirth: false }));
      setUserErrorMsg(prev => ({ ...prev, userDofBirth: '' }));
    } else {
      setUserError(prev => ({ ...prev, userDofBirth: true }));
      setUserErrorMsg(prev => ({ ...prev, userDofBirth: "Age must be between 18 and 120" }));
    }
  };

  //validation for user city
  const validateUserCity = (e) => {
    let city = e.target.value;

    if (cities.includes(city)) {
      setUser(prev => { return { ...prev, userCity: city } });
      setUserError(prev => { return { ...prev, userCity: false } });
      setUserErrorMsg(prev => { return { ...prev, userCity: '' } });
    } else {
      setUserError(prev => { return { ...prev, userCity: true } });
      setUserErrorMsg(prev => { return { ...prev, userCity: "choose city from the list" } });
    }

  };

  //validation for user street
  const validateUserStreet = (e) => {
    const street = e.target.value;
    const regex = /^[א-ת\s]+$/;
    if (!regex.test(street)) {
      setUserError(prev => { return { ...prev, userStreet: true, } })
      setUserErrorMsg((prev) => { return { ...prev, userStreet: "Only text in hebrew allowed, please try again" } });
    } else {
      setUser(prev => { return { ...prev, userStreet: street } });
      setUserError(prev => { return { ...prev, userStreet: false, } })
      setUserErrorMsg((prev) => { return { ...prev, userStreet: '' } });
    }
  };

  //validation for user home number
  const validateUserHomeNum = (e) => {
    const num = e.target.value;

    if (num <= 0) {
      setUserError(prev => { return { ...prev, userHomeNum: true, } })
      setUserErrorMsg((prev) => { return { ...prev, userHomeNum: "Only positive numbers allowed, please try again" } });
    } else {
      setUser(prev => { return { ...prev, userHomeNum: num } });
      setUserError(prev => { return { ...prev, userHomeNum: false, } })
      setUserErrorMsg((prev) => { return { ...prev, userHomeNum: '' } });
    }
  }


  //creating user if all the inputs valid     
  const registerUser = () => {
    //creating array of userError and user to check that all fileds were validated and aren't empty
    let validations = Object.values(userError);
    let userFildes = Object.values(user);

    console.log('validations: ', validations);
    console.log('userFildes: ', userFildes);

    if (validations.some((value) => value === true)) {
      //At least one validation error exists
      console.log('At least one validation error exists');
      Swal.fire({
        icon: "error",
        title: "Oops... cant create user",
        text: "Something went wrong!",
        footer: 'There is invalid error you didnt fix'
      });
    }
    else if (userFildes.some((value) => value === '')) {
      //At least one filed is empty
      console.log('At least one filed is empty');
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: " there is empty fields!",
        footer: 'You must fill all the fileds first'
      });
    }
    else {
      //No validation errors
      console.log('No validation errors');
      Swal.fire({
        icon: "success",
        title: "User created!",
        text: "Now you can login",
      });
      //send user obj to add it to users list
      props.send2Parent(user);
      clearFileds();
    }
  }



  const editUser= ()=> {
    //creating array of userError and user to check that all fileds were validated and aren't empty
    let validations = Object.values(userError);
    let userFildes = Object.values(user);

    console.log('validations: ', validations);
    console.log('userFildes: ', userFildes);

  }

  return (
    <>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
          <Avatar
              alt="User Avatar"
              src={userInSession.userImage}
              sx={{ width: 100, height: 100 }}
          />
          <br />
        <Typography variant="h3">Edit Details</Typography>
      </Box>

      <FormControl fullWidth sx={{ mb: '1rem', display: 'flex', flexDirection: 'row', }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          gap: '1rem',
          '& TextField': {
            flex: '1 1 300px',
          },
        }}>

          <TextField
            label="User name"
            type="text"
            variant="standard"
            color='secondary'
            required
            value={user.userName}
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
            onBlur={validateUserName}
            error={userError.userName}
            helperText={userErrorMsg.userName}
            inputProps={{ maxLength: 60 }}
          />
         
          <TextField
            label="Password"
            type="password"
            variant="standard"
            color='secondary'
            margin='normal'
            required
            value={user.userPassword}
            onChange={(e) => setUser({ ...user, userPassword: e.target.value })}
            onBlur={validatePassword}
            error={userError.userPassword}
            helperText={userErrorMsg.userPassword}
          />

          <TextField
            label="Validate password"
            type="password"
            variant="standard"
            color='secondary'
            margin='normal'
            required
            value={user.password2}
            onChange={(e) => setUser({ ...user, password2: e.target.value })}
            onBlur={validatePassword2}
            error={userError.password2}
            helperText={userErrorMsg.password2}
          />
          <br />
          <TextField
            label="Edit Image"
            type="file"
            variant="outlined"
            required
            InputLabelProps={{ shrink: true, }}
            onBlur={validateImage}
            error={userError.userImage}
            helperText={userErrorMsg.userImage}
            
          />

          <TextField
            label="First name"
            type="text"
            variant="standard"
            color='secondary'
            margin='normal'
            required
            value={user.userFirstName}
            onChange={(e) => setUser({ ...user, userFirstName: e.target.value })}
            onBlur={validateFirstName}
            error={userError.userFirstName}
            helperText={userErrorMsg.userFirstName}
          />

          <TextField
            label="Last name"
            type="text"
            variant="standard"
            color='secondary'
            margin='normal'
            required
            value={user.userLastName}
            onChange={(e) => setUser({ ...user, userLastName: e.target.value })}
            onBlur={validateLastName}
            error={userError.userLastName}
            helperText={userErrorMsg.userLastName}
          />

          <TextField
            label="Email"
            type="email"
            variant="standard"
            color='secondary'
            margin='normal'
            readOnly
            value={user.userEmail}
            error={userError.userEmail}
            helperText={userErrorMsg.userEmail}
          />

          <br />
          <TextField
            label="Date of birth"
            type="date"
            variant="outlined"
            color='secondary'
            required
            defaultValue={user.userDofBirth}
            onBlur={validateUserDate}
            onChange={(e) => { setUser({ ...user, userDofBirth: e.target.value }) }}
            error={userError.userDofBirth}
            helperText={userErrorMsg.userDofBirth}
            InputLabelProps={{ shrink: true, }}
          />


          <Autocomplete
            options={cities}
            value={user.userCity}  // Set the value directly on the Autocomplete
            renderInput={(params) => (
              <TextField
                sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
                {...params}
                label="City"
                type="text"
                variant="standard"
                color='secondary'
                margin='normal'
                required
                onChange={(e) => setUser({ ...user, userCity: e.target.value })}
                onBlur={validateUserCity}
                error={userError.userCity}
                helperText={userErrorMsg.userCity}
              />
            )}
          />


          <TextField
            label="Street name"
            type="text"
            variant="standard"
            color='secondary'
            margin='normal'
            required
            value={user.userStreet}
            onChange={(e) => setUser({ ...user, userStreet: e.target.value })}
            onBlur={validateUserStreet}
            error={userError.userStreet}
            helperText={userErrorMsg.userStreet}
          />

          <TextField
            label="Number"
            type="number"
            variant="standard"
            color='secondary'
            margin='normal'
            required
            value={user.userHomeNum}
            onChange={(e) => setUser({ ...user, userHomeNum: e.target.value })}
            inputProps={{ min: 1 }}
            onBlur={validateUserHomeNum}
            error={userError.userHomeNum}
            helperText={userErrorMsg.userHomeNum}
          />

          <br />
          <Button
            id="submitBTN"
            type='submit'
            variant="outlined"
            endIcon={<SendIcon />}
            color="secondary"
            onClick={editUser}
          >
            Update
          </Button>
        </Box>
      </FormControl >

    </>
  );
}
