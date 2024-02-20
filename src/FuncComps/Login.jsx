import React, { useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    const navigate = useNavigate();
    const [userName, setUserName] = useState({ name: '', err: false, errMsg: '' });
    const [password, setPassword] = useState({ pw: '', err: false, errMsg: '' });
    const users = props.users;

    const validateUserName = (e) => {
        let text = e.target.value;
        const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};:'",.<>\/?]{1,60}$/;
        if (regex.test(text)) {
            setUserName((prev) => ({ ...prev, name: text, err: false, errMsg: '' }));
        } else {
            setUserName((prev) => ({ ...prev, err: true, errMsg: 'Invalid input! Only English letters, numbers, and specific special characters allowed. Maximum 60 characters.' }));
        }
    };

    const validatePassword = (e) => {
   
        let text = e.target.value;
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};:'",.<>\/?]).{7,12}$/;
        if (regex.test(text)||text === "ad12343211ad") {
           setPassword((prev) => ({ ...prev, pw: text, err: false, errMsg: '' }));
        } else {
            setPassword((prev) => ({ ...prev, err: true, errMsg: 'Invalid password! Password must contain between 7 and 12 characters, at least one special character, one uppercase letter, and one number.' }));
        }
    };

    const loginUser = () => {
    debugger
        if (userName.name == "admin" && password.pw == "ad12343211ad") {
            Swal.fire({
                icon: "success",
                title: "Welcome Admin",
                text: "Redirecting",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/SystemAdmin');
                }
            });
            return;
        }
        if (userName.err) {
            console.log('cant login with invalid user name');
            return;
        }
        if (password.err) {
            console.log('cant login with invalid password');
            return;
        }

        if (users.length > 0) {
            let founduser = users.find(user => user.userName === userName.name && user.userPassword === password.pw);
            if (founduser) {
                console.log('User with matching username and password exists.');
                sessionStorage.setItem('connectedUser', JSON.stringify(founduser));
                clearFields();
                Swal.fire({
                    icon: "success",
                    title: "Logged in successfully",
                    text: "Go to profile",
                }).then((result) => {
                    // This code will be executed after the user interacts with the modal
                    if (result.isConfirmed) {
                        navigate('/Profile');
                    }
                });
                return;
            } else {
                console.log('NO matching user.');
                Swal.fire({
                    icon: "error",
                    title: "There is no registered user with this data",
                    text: "Check your inputs",
                });
            }
        } else {
            console.log('You have to register first');
            Swal.fire({
                icon: "error",
                title: "There is no registered users in the system",
                text: "Register first!",
            });
        }
    };

    const clearFields = () => {
        setUserName({ name: '' });
        setPassword({ pw: '' });
    };

  

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Avatar sx={{
                    bgcolor: 'purple',
                    m: 1
                }}>
                </Avatar>
                <Typography variant="h3">Login</Typography>
            </Box>

            <Box>
                <br />
                <TextField
                    label="User name"
                    type="text"
                    variant="standard"
                    color='secondary'
                    required
                    value={userName.name}
                    onChange={(e) => setUserName({ ...userName, name: e.target.value })}
                    onBlur={validateUserName}
                    error={userName.err}
                    helperText={userName.errMsg}
                    inputProps={{ maxLength: 60 }}
                />
                <br />
                <TextField
                    label="Password"
                    type="password"
                    variant="standard"
                    color='secondary'
                    margin='normal'
                    required
                    value={password.pw}
                    onChange={(e) => setPassword({ ...password, pw: e.target.value })}
                    onBlur={validatePassword}
                    error={password.err}
                    helperText={password.errMsg}
                />
                <br /> <br />
                <Button
                    type='login'
                    variant="outlined"
                    endIcon={<SendIcon />}
                    color="secondary"
                    onClick={loginUser}
                    sx={{ margin: 2 }}
                >
                    Login
                </Button>
                <Button
                    type='button'
                    variant="outlined"
                    endIcon={<HowToRegIcon />}
                    color="secondary"
                    onClick={() => { navigate('/RegisterFields') }}
                >
                    Register
                </Button>
            </Box>
        </>
    );
}
