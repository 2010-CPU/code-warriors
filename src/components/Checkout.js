import React from 'react';
import Account from './Account';
import Cart from './Cart';

const Checkout = ({ order, user, token }) => {
    // const { firstName, lastName, email } = user; 
    // const { id, status, userId, datePlaced } = order;

    return (<div className='checkout'>
        
    <h3> welcome to checkout</h3>

    <Cart> </Cart>

    { token 
    ? <Account> </Account> 
    : <form className='account-container'> 
        <label text="first name"> first name</label>
        <input text='first name'></input> 
        <label text="last name"> last name</label>
        <input text='last name'></input>
        <label text="email"> email</label>
        <input text='email'></input> 
    </form>}
    <br/> 
    <h3> shipping address</h3>
    <p>Right now we're only shipping to address within the United States</p><br/> 
    <form className='ship-container'> 
    <label  text="address"> address</label>
        <input text='address'></input> 
        <label text="city"> city</label>
        <input text='city'></input> 
        <label text="state"> state</label>
        <input text='state'></input> 
        <label text="zip code"> zip code</label>
        <input text='zip code'></input> 
        
    </form>


    </div>)
}

export default Checkout;