import React from 'react';
import {Redirect} from 'react-router-dom';
import {Reviews} from './index';

// allow profile image choice later

const Account = ({user, token, reviews, setReviews}) => {
    const {id, firstName, lastName, email, username, address, city, state, zip, imageURL} = user;
    const {title, content, stars, userId, productId} = reviews;  

    const mappedRev = reviews.map((review,idx) => { 
        console.log(review.userId)
        if(user.id === review.userId){
            return <div> {review} </div>
        }
    })

    const userReviews = mappedRev.filter( review => { 
        if(user.id === mappedRev) { 
            console.log('review inside of filter', review)
            return review;
        }
    })

    console.log('up top reviews', reviews)
    console.log('up top rev.userId', mappedRev)
    console.log('user.id', user.id)

    mappedRev === user.id ? console.log('winner winner') : console.log('not today sucka')
    

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
            {userReviews.map((review, idx) => { 
                console.log(review)
                return <> <div key={idx}> {review.title} </div> 
                <div> {review.content} </div>
                </> 
            })}
            </div> 
            </>)
    } else {
        return <Redirect to='/' />
    }
}

export default Account;