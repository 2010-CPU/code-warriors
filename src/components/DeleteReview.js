import React from 'react';
import {Redirect} from 'react-router-dom';

const DeleteReview = ({token, reviews, setReviews}) => {
    const {id, title, content, stars, userId, productId} = reviews; 

    const handleDelete = async (event) => { 
        event.preventDefault();
        console.log('review to delete: ', reviews.id);
        const response = await fetch (`/api/reviews/${reviews.id}`, { 
            method: 'DELETE',
            headers: { 

                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }); 
        console.log('response in deleteReview: ', response)
        const data = await response.json();
        console.log('data: ', data)

    }

    if(token) { 
        return (<> 
            {reviews.map((review, idx) => { 
                const { title, content, stars} = review;
                return <div key={idx}> {review} </div>
            })}
            <div> DELETE REVIEW </div> 
            <form onSubmit={handleDelete}>
                <label> Review Title </label>
                <input type='text' value={title} onChange={event => setReviews(event.target.value)} > </input>
                <label> Review </label>
                <input type='text' value={content} onChange={event => setReviews(event.target.value)} > </input>
                <label> Stars 1-5 (5 being the highest rating possible) </label>
                <input type='number' value={stars} onChange={event => setReviews(event.target.value)} > </input>
            </form>
            </>)
    } else { 
        return <Redirect to='/account'/>
    }
}

export default DeleteReview;