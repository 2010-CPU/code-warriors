import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {PastOrders, AddReview} from './index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// allow profile image choice later

const Account = ({user, token, reviews, setReviews, setTitle, setContent,setStars, setUserId, setProductId, orders, setOrders }) => {
    const {firstName, lastName, email, username, address, city, state, zip, imageURL} = user;
    const {id, title, content, stars, userId, productId} = reviews; 

    const userReviews = reviews.filter( review => { 
        if(user.id === review.userId) { 
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
    }, [])

    if (token && username) {
        return (<><div>      
            <Tabs>
                <TabList className="tab-list"> 
                    <Tab> Profile</Tab>
                    <Tab> Orders </Tab>
                    <Tab> Past Reviews </Tab>
                    <Tab> Create Review</Tab>
                </TabList>  
                <TabPanel> 
                    <div className='acct-container'> 
                    {/* <h2>Account Information for {firstName}</h2> */}
                    <img className='profile-image' src={imageURL} alt='userphotolink' />
                    <div className='profile'> 
                    <div>Username: </div> <div> {username}</div>
                    <div>Email: </div> <div> {email}</div>
                    <div>Name:</div> <div> {firstName} {lastName}</div> 
                    <div>Address: </div> <div> {address}<br/> {city}, {state} {zip}</div>
                    </div>
                    </div> 
                </TabPanel>
                
                <TabPanel>
                    <div className='past-orders-container'>
                        <h3>Past Orders</h3>
                        {orders.length > 1 ? orders.map(order => {
                            return order.status === 'completed' ?
                                <PastOrders key={order.id} order={order} /> : ''
                        }) : 'You have no past orders!'}
                    </div>
                </TabPanel>
                
                <TabPanel>
                    <div className="acct-view-revs"> 
                    <h3 > Your reviews from your past orders:  </h3> <br/>
                    {userReviews.map((review) => { 
                        const {id, title, content, stars, userId, productId} = review;
                        return <div key={id}> 
                            <div className='rev-stars'> {stars > 4 ? <img src={'/images/5_stars.png'}/> : <img src={'/images/4_stars.png'}/>} </div>
                            <div> Title: {title} </div> 
                            <div>  Review:  {content} </div> <hr></hr>
                        </div> 
                    })}
                    </div>
                    </TabPanel>
                    <TabPanel>
                    <div className="new-rev">
                    <AddReview reviews={reviews} setReviews={setReviews} token={token} user={user} title={title} setTitle={setTitle} content={content} setContent={setContent} stars={stars} setStars={setStars} userId={userId} setUserId={setUserId} productId={productId} setProductId={setProductId} />
                    </div>
                    </TabPanel>
            </Tabs> 
                    </div>
            </>)
    } else {
        return <Redirect to='/' />
    }
}

export default Account;