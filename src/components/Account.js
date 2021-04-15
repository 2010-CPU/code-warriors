import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {PastOrders, AddReview} from './index';

// allow profile image choice later

const Account = ({user, token, reviews, setReviews, orders, setOrders, setProduct, getReviews }) => {
    const {firstName, lastName, email, username, address, city, state, zip, imageURL} = user;

    const userReviews = reviews.filter( review => { 
        if (user.id === review.userId) { 
            return review;
        }
    })
    
    const getPastOrders = async () => {
        const response = await fetch(`/api/users/${user.id}/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json();
        setOrders(data);
    }

    useEffect( ()=> {
        getPastOrders();
        getReviews();
    }, [])

    if (token && username) {
        return (<><div >            
            <div className='tab-list' ><li>Profile</li><li>Orders</li><li>Reviews</li> </div>
            <div className='acct-container'> 
            <h3>Account Information</h3>
            
            <img className='profile-image' src={imageURL} alt='userphotolink' />
            <div className='profile'> 
            <div>Username: </div> <div> {username}</div>
            <div>Email: </div> <div> {email}</div>
            <div>Name:</div> <div> {firstName} {lastName}</div> 
            <div>Address: </div> <div> {address}<br/> {city}, {state} {zip}</div>
            </div>
            </div> 
            </div>

            <div className='past-orders-container'>
                <h3>Past Orders</h3>
                {orders.length > 1 ? orders.map(order => {
                    return order.status === 'completed' ?
                        <PastOrders key={order.id} order={order} setProduct={setProduct} /> : ''
                }) : 'You have no past orders!'}
            </div>
            
            <div className="acct-view-revs"> 
            <h3> Reviews From Past Orders  </h3> <br/>
            {userReviews.map((review) => { 
                const {id, title, content, stars} = review;

                return (<div key={id}> 
                    <div>Title: {title} </div> 
                    <div>Review:  {content} </div>
                    <div>Star Rating: {stars} </div>
                    <br />
                </div>)
            })}

            {/* <AddReview reviews={reviews} setReviews={setReviews} token={token} user={user} title={title} setTitle={setTitle} content={content} setContent={setContent} stars={stars} setStars={setStars} userId={userId} setUserId={setUserId} productId={productId} setProductId={setProductId} /> */}
            </div> 
            </>)
    } else {
        return <Redirect to='/' />
    }
}

export default Account;