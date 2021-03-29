import React from 'react';
import {Redirect} from 'react-router-dom';

// allow profile image choice later

const Account = ({user, token}) => {
    const {firstName, lastName, email, username, address, city, state, zip} = user;
    user.imageURL = 'images/user-images/muffins.jpg'

    if (token) {
        return (<div >
            <h2>Account Information for {firstName}</h2>
            
            <img className='profile-image' src={user.imageURL} alt='muffins' />
            <div className='profile'> 
            <div>Username: </div> <div> {username}</div>
            <div>Email: </div> <div> {email}</div>
            <div>Name:</div> <div> {firstName} {lastName}</div> 
            <div> Address: </div> <div> {address}<br/> {city}, {state} {zip}</div>
            </div>
        </div>)
    } else {
        return <Redirect to='/' />
    }
}

export default Account;