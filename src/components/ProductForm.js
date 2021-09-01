import React, {useState, useEffect} from 'react';
import {Redirect, useLocation} from 'react-router-dom';

const ProductForm = ({user, token, getProducts, product, setProduct}) => {
    const {id,name,grade, imageURL, birthday, restaurant, schoolstore, personalstore, drink, treat, color, flower, food, place, meTime, hobbies, giftcard, pets, dislikes, allergies, wishlist} = product;
    const [addMessage, setAddMessage] = useState('');

    const location = useLocation();
    useEffect( () => {
        if (location.pathname === '/products/add') {
            setProduct({id: null, name: '', grade: '', imageURL: '', birthday: '', restaurant: '', schoolstore: '', personalstore: '', drink: '', treat: '', color: '', flower: '', food: '', place: '', meTime: '', hobbies: '', giftcard: '', pets: '', dislikes: '', allergies: '', wishlist: ''})
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('data before call')
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(product)
        })
        console.log('data', data)
        const data = await response.json();
        setProduct(data);
        setAddMessage(data ? 'Product has been added' : '');
        setProduct({id: null, name: '', grade: '', imageURL: '', birthday: '', restaurant: '', schoolstore: '', personalstore: '', drink: '', treat: '', color: '', flower: '', food: '', place: '', meTime: '', hobbies: '', giftcard: '', pets: '', dislikes: '', allergies: '', wishlist: ''})
        getProducts();
    }

    const handleOnChange = async (event) => {
        console.log('event', event)
        console.log('event target', event.target)
        console.log('event target name', event.target.name)

        if (event.target.name === 'inStock') {
            setProduct({...product, [event.target.name]: !inStock});
        } else {
            setProduct({...product, [event.target.name]: event.target.value});
        }
    }

    if (user.isAdmin) {
        return (<div className='add-product'>
            <h2>Add Teacher</h2>
            <p> Please fill out each question on this form to the very best of your ability.</p>
            {addMessage}
            <form onSubmit={handleSubmit}>
                <div>
                    <div>Name</div>
                    <input required type="text" name='name' value={name} onChange={handleOnChange}></input>
                </div>
                <div>
                    <div>Grade</div>
                    <input required type="text" name='grade' value={grade} onChange={handleOnChange}></input>
                </div>
                <div>
                    <div>Birthday</div>
                    <input type='text' name='birthday' value={birthday} onChange={handleOnChange}></input>
                </div>
                <div>
                    <div>Restaurant</div>
                    <input required type='text' name='restaurant' value={restaurant} onChange={handleOnChange}></input>
                </div>
                <div>
                    <div>Store where you like to buy school supplies</div>
                    <input required type='text' name='schoolstore' value={schoolstore} onChange={handleOnChange}></input>
                </div>
                <div>
                    <div>Store that you like to shop at for yourself</div>
                    <input required type='text' name='personalstore' value={personalstore} onChange={handleOnChange}></input>
                </div>
                <div>
                    <div>What is your favorite beverage?</div>
                    <textarea required type='text' name='drink' value={drink} onChange={handleOnChange}></textarea>
                </div>
                <div>
                    <div>What is your favorite treat?</div>
                    <textarea required type='text' name='treat' value={treat} onChange={handleOnChange}></textarea>
                </div>
                <div>
                    <div>Favorite color</div>
                    <textarea required type='text' name='color' value={color} onChange={handleOnChange}></textarea>
                </div>
                <div>
                    <div>Favorite flower</div>
                    <textarea required type='text' name='flower' value={flower} onChange={handleOnChange}></textarea>
                </div>
                <div>
                    <div>Favorite food</div>
                    <textarea required type='text' name='food' value={food} onChange={handleOnChange}></textarea>
                </div>
                <div>
                    <div>Favorite place</div>
                    <textarea required type='text' name='place' value={place} onChange={handleOnChange}></textarea>
                </div>
                <div>
                    <div>What is your favorite way to spend time outside of school?</div>
                    <textarea required type='text' name='meTime' value={meTime} onChange={handleOnChange}></textarea>
                </div>
                <div>
                    <div>What are your favorite hobbies?</div>
                    <textarea required type='text' name='hobbies' value={hobbies} onChange={handleOnChange}></textarea>
                </div>
                <div>
                    <div>Favorite giftcard to receive?</div>
                    <textarea required type='text' name='giftcard' value={giftcard} onChange={handleOnChange}></textarea>
                </div>
                <div>
                    <div>Tell us about any family pets that you have:</div>
                    <textarea required type='text' name='pets' value={pets} onChange={handleOnChange}></textarea>
                </div>
                <div>
                    <div>Do you have any dislikes (for example, the Dodgers or anything in Dodger Blue): </div>
                    <textarea required type='text' name='dislikes' value={dislikes} onChange={handleOnChange}></textarea>
                </div>
                <div>
                    <div>Do you have any allergies that should be noted?</div>
                    <textarea required type='text' name='allergies' value={allergies} onChange={handleOnChange}></textarea>
                </div>
                <div>
                    <div>Final question (I know, it is a lot.) Hit us with your wishlist items. What can we parents provide you with that will make your day or make the school year even better?</div>
                    <textarea required type='text' name='wishlist' value={wishlist} onChange={handleOnChange}></textarea>
                </div>
               
                <div>
                    <div>Image</div>
                    <input type='text' name='imageURL' value={imageURL} onChange={handleOnChange}></input>
                </div>
                <button type='submit' className='btn'>Add Teacher</button>
            </form>
        </div>)
    } else {
        return <Redirect to='/' />
    }
}

export default ProductForm;