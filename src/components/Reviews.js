import React, { useState, useEffect } from 'react';

const Reviews = ({reviews, setReviews}) => { 
    
    useEffect(async () => {
        const response = await fetch(`/api/reviews`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'Appliation/json'
            } 
        }); 
        const data = await response.json();
        console.log('review data',data)
        setReviews(data);
    })

    return (<>
    <div className='bg-image img1'> 

    {reviews.map((rev) => {
        return <div> {rev} </div> 
    }) }
    
    <div> A review will go here. </div>
    
    </div>
    </> )
}

export default Reviews;