import React, { useState, useEffect } from 'react';

const Reviews = () => { 
    const [reviews, setReviews] = useState('');
    
    const getReviews = async () => {
        const response = await fetch(`/api/reviews`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'Appliation/json'
            } 
        }); 
        const data = await response.json();
        console.log('review data',data)
        setReviews(data);
    }

    useEffect( async () => {
        await getReviews();
    }, []);

    return (<>
    <div className='bg-image img1'> 
    
    <div> A review will go here. </div>
    <div> {reviews} </div>
    </div>
    </> )
}

export default Reviews;