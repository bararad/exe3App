import React, { useState, useEffect } from 'react';
import RegisterFields from './RegisterFields';
import Login from './Login';
import Profile from './Profile';
import EditDetails from './EditDetails';
import SystemAdmin from './SystemAdmin';
import { Routes, Route } from 'react-router-dom';

export default function Main() {

    const [usersList, setUsersList] = useState([]);

    //gets user from child and adds it to the list
    const getUserFromChild = (user) => {
        //console.log('in main', user);
        //let userObj={[user.userEmail]: user};
        let newUsers = [...usersList, user];
        // console.log('Main- updated user list', newUsers);

        //add to list
        setUsersList(newUsers);
    }

    const updateUsersList = (updatedUser) => {

        let foundUser = usersList.find(user => user.userEmail === updatedUser.userEmail);
        let index = usersList.indexOf(foundUser);

        let tempUsersList = [...usersList];
        tempUsersList[index] = updatedUser;

        //update new users array
        setUsersList(tempUsersList);

    }
    const updateAfterDel = (users) => {
        let tempUsersList = [...users];
        setUsersList(tempUsersList);
        
    }


    const loadUsers = () => {

        const usersFromLocalStorage = localStorage.getItem('usersList');
        //debugger
        if (usersFromLocalStorage) {
            setUsersList(JSON.parse(usersFromLocalStorage));
        }
    }


    //Check local storage on component mount- only when the page loaded
    useEffect(() => {
        loadUsers();
    }, []);

    //runs foreach update in the usersList
    useEffect(() => {
        localStorage.setItem('usersList', JSON.stringify(usersList));
    }, [usersList]);


    console.log('Main- userslist:', usersList);

    return (

        <Routes>
            <Route path='/' element={<Login users={usersList} />} />
            <Route path='/RegisterFields' element={<RegisterFields send2Parent={getUserFromChild} />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/EditDetails' element={<EditDetails send2ParentEditedUser={updateUsersList} />} />
            <Route path='/SystemAdmin' element={<SystemAdmin users={usersList} deleteUserinPar={updateAfterDel} />} />
        </Routes>
    )
}
