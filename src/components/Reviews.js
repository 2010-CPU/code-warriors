import React, { useEffect } from 'react';

const Reviews = ({reviews, setReviews, productId}) => { 

    return (<>
        <div className="reviews">   
            <p>Customer Reviews:  </p>
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