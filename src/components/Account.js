import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Reviews} from './index';

// allow profile image choice later

const Account = ({user, token, reviews, setReviews}) => {
    const {firstName, lastName, email, username, address, city, state, zip, imageURL} = user;

    const userReviews = reviews.filter( review => { 
        console.log('filter at account line 10', reviews)
        if(user.id === review.userId) { 
            return review;
        }
    })

    if (token && username) {
        return (<><div >
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
            <h3 > Your reviews from your past orders:  </h3> <br/>
            {userReviews.map((review) => { 
                const {title, content, stars, userId, productId} = review;
                return <> 
                <div> Title: {title} </div> 
                <div>  Review:  {content} </div>
                <div> Stars rating: {stars} </div>
                <button className="btn" > Edit </button> <button className="btn"> Delete </button>
                <br/>
                </> 
            })}
            </div> 
            </>)
    } else {
        return <Redirect to='/' />
    }
}

export default Account;