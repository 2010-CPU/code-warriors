import React from 'react';
import {Redirect} from 'react-router-dom';

const EditReview = ({token, reviews, setReviews, setTitle, setContent, setStars}) => { 
    const { id, title, content, stars, userId, productId } = reviews;

    const handleSubmit = async (event) => { 
        // event.preventDefault();

        const response = await fetch (`/api/reviews/${reviews.id}`, { 
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                'Authorizaiton': `Bearer ${token}`
            }, 
            body: JSON.stringify({ 
                title, 
                content, 
                stars
            })
        });
        const data = await response.json();
        setTitle('');
        setContent('');
        setStars(0);
    }

    if(token) { 
        return (<> 
            {/* {reviews.map((review, idx) => { 
                const { id, title, content, stars} = review;
                return <div key={idx}> {title} </div>
            })} */}
            <div> EDIT REVIEW </div> 
            <form onSubmit={handleSubmit}>
                <div> Review Title </div>
                <input type='text' value={title} onChange={event => setReviews(event.target.value)} > </input>
                <div> Review </div>
                <input type='text' value={content} onChange={event => setReviews(event.target.value)} > </input>
                <div> Stars 1-5 (5 being the highest rating possible) </div>
                <input type='number' value={stars} onChange={event => setReviews(event.target.value)} > </input>
            </form>
            </>)
    } else { 
        return <Redirect to='/account'/>
    }
}

export default EditReview;
