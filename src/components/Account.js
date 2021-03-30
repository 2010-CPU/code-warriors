import React from 'react';
import {Redirect} from 'react-router-dom';

// allow profile image choice later

const Account = ({user, token}) => {
    const {firstName, lastName, email, username} = user;
    user.imageURL = 'images/user-images/muffins.jpg'

    if (token && username) {
        return (<div className='profile'>
            <h2>Account Information for {firstName}</h2>
            <br />
            <img className='profile-image' src={user.imageURL} alt='muffins' />
            <br />
            <div>Name: {firstName} {lastName}</div>
            <div>Username: {username}</div>
            <div>Email: {email}</div>
        </div>)
    } else {
        return <Redirect to='/' />
    }
}

export default Account;