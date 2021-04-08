import React from 'react';
import {Redirect} from 'react-router-dom';
import {Reviews} from './index';

// allow profile image choice later

const Account = ({user, token, reviews, setReviews}) => {
    const {firstName, lastName, email, username, address, city, state, zip, imageURL} = user;

    if (token && username) {
        return (<><div className='profile'>
            <div className='acct-container'> 
            <h2>Account Information for {firstName}</h2>
            
            <img className='profile-image' src={imageURL} alt='userphotolink' />
            <div className='profile'> 
            <div>Username: </div> <div> {username}</div>
            <div>Email: </div> <div> {email}</div>
            <div>Name:</div> <div> {firstName} {lastName}</div> 
            <div>Address: </div> <div> {address}<br/> {city}, {state} {zip}</div>
            </div>
            </div> 
            </div>
            <div className="acct-view-revs"> 
            <Reviews reviews={reviews} setReviews={setReviews} /> </div> 
            </>)
    } else {
        return <Redirect to='/' />
    }
}

export default Account;