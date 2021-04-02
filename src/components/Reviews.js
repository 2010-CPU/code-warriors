import React, { useState, useEffect } from 'react';
import {
  useParams,
  Link
} from 'react-router-dom';

import{ 
    getAllReviews
} from '../api'

const Reviews = () => { 
    const [reviews, setReviews] = useState({})
    const { id, title, content, stars, userId, productId } = reviews;

    
    // useEffect( () => {
    //     getReview();
    // }, [])

    return <>
        <div> {} </div>
    </> 
}

// const GetReviews = () => { 
//     const [review, setReview] = useState({});
//     const {reviewId} = useParams();

//     useEffect(() => { 
//         const retrieveReview = async () => { 
//             try {
//                 const rev = await getAllReviews(reviewId);
//                 setReview(rev)
//             } catch (error) {
//                 throw error; 
//             }
//         }
//         retrieveReview(); 
//     }, [reviewId])

//     return <>

//         </> 
// }


export default Reviews;