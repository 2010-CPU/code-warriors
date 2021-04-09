import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Reviews} from './index';

// allow profile image choice later

const Account = ({user, token, reviews, setReviews}) => {
    const {firstName, lastName, email, username, address, city, state, zip, imageURL} = user;
    const {id} = reviews; 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [stars, setStars] = useState(0);

    const editReview = async(event) => {
        event.preventDefault();

        const response = await fetch(`/api/account/${reviews.id}`, { 
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title, 
                content, 
                stars
            })
        }); 
        const data = await response.json();
        setTitle('');
        setContent('');
        setStars('');
    }

    const userReviews = reviews.filter( review => { 
        if(user.id === review.userId) { 
            return review;
        }
    })

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
            <h3> Your reviews from your past orders:  </h3>
            <div className="acct-view-revs"> 
            {userReviews.map((review, idx) => { 
                return <> <div key={idx}> Title: {review.title} </div> 
                <div>  Review:  {review.content} </div>
                <div> Stars rating: {review.stars} </div>
                <button className="btn" onClick={editReview}> Edit </button> <button className="btn"> Delete </button>
                </> 
            })}
            </div> 
            </>)
    } else {
        return <Redirect to='/' />
    }
}

export default Account;