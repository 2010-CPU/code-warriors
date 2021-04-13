import React, {useState} from 'react';

const AddReview = ({token, reviews, setReviews, user, setTitle, setContent, setStars, setUserId, setProductId }) => { 
    const { id } = user; 
    const {title, content, stars, userId, productId} = reviews; 

    const handleSubmit = async (event) => { 
        event.preventDefault();

        const response = await fetch('/api/reviews', { 
            method: 'POST',
            headers: { 
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify({ 
                title, 
                content, 
                stars, 
                userId,
                productId
            })
        });
        console.log('response in addReview', response)
        const data = await response.json();
        console.log('reviews data: ', data);
        // setReviews([...reviews]);
        setTitle('');
        setContent('');
        setStars('');
        setUserId('');
        setProductId('');
    }

    const productList = [ 
        {label: 'Crepes and Mimosas with Dom', value: 1},
        {label: 'Churros and Margaritas with Jose', value: 2},
        {label: 'Chops and Shots with Jameson', value: 3},
        {label: 'Jerk Chicken and Hurricanes with Morgan', value: 4},
        {label: 'Pulled Pork and Mai Tais with Mahina', value: 5},
        {label: 'Brunch with Mary', value: 6}
    ];

    return ( <>
        <h2> Create a new review: </h2>
        <form  className="review-form" onSubmit={handleSubmit}> 
            <label>Title</label>
            <input type='text' placeholder='title' value={title} onChange={(event) => setTitle(event.target.value)}></input>
            <label>Review</label>
            <textarea type='text' placeholder='Please share your love for your Food With Friends kit ... ' value={content} onChange={(event) => setContent(event.target.value)}></textarea>
            <label>Star Rating</label>
            <input type='number' placeholder='stars' max={5} min={1} value={stars} onChange={(event) => setStars(event.target.value)}></input>
            <label> Product</label>
            <select required name='productId' value={productId} placeholder={'Select a product to review'} onChange={(event) => setProductId(event.target.value)}>
                        {productList.map((product, index) => {
                            return <option key={index}>{`${product.label}`}</option>
                        })}
                    </select>   
            <input hidden={true} value={user.id} onChange={(event) => setUserId(event.target.value)}/> 
            <br/> <button type='submit' className="btn">Submit</button>
        </form>
    </>)
}

export default AddReview;