import React from 'react';
import {Redirect, 
        Link
} from 'react-router-dom';
import {AddReview} from './index';

// allow profile image choice later

const Account = ({user, token, reviews, setReviews, setTitle={setTitle}, setContent={setContent},setStars={setStars}, setUserId={setUserId}, setProductId={setProductId}}) => {
    const {firstName, lastName, email, username, address, city, state, zip, imageURL} = user;
    const {id, title, content, stars, userId, productId} = reviews; 

    const userReviews = reviews.filter( review => { 
        if(user.id === review.userId) { 
            return review;
        }
    })

    if (token && username) {
        return (<><div >            
            <div className='tab-list' ><li>Profile</li><li>Orders</li><li>Reviews</li> </div>
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
                const {id, title, content, stars, userId, productId} = review;
                return <div key={id}> 
                <div> Title: {title} </div> 
                <div>  Review:  {content} </div>
                <div> Stars rating: {stars} </div>
                </div> 
            })}
            <AddReview reviews={reviews} setReviews={setReviews} token={token} user={user} title={title} setTitle={setTitle} content={content} setContent={setContent} stars={stars} setStars={setStars} userId={userId} setUserId={setUserId} productId={productId} setProductId={setProductId} />
            </div> 
            </>)
    } else {
        return <Redirect to='/' />
    }
}

export default Account;