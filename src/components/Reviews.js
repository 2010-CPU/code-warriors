import React, { useState, useEffect } from 'react';

const Reviews = ({reviews, setReviews}) => { 
    console.log('reviews', reviews)
    
    const getReviews = async () => {
        const response = await fetch(`/api/reviews`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'Application/json'
            }
        });
        const data = await response.json();
        console.log('review json data: ', data)
        setReviews(data);
    }

    useEffect( () => {
        getReviews();
    }, [])

    return (<>
        <div className='bg-image img1'> 

        {reviews.map((review, idx) => {
            const {id, title, content, stars, userId, productId} = review;
            return(
            <div key={idx}> 
            <h2 > {title} </h2> 
            <p > {content}</p>
            <p> stars: {stars}</p>
            <p > Product Id:  {productId}</p>
            </div> )
            })}
            </div> 

    </> )
}

export default Reviews;