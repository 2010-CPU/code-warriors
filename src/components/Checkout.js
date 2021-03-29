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
        <input text='first name'></input> <br/>
        <label text="last name"> last name</label>
        <input text='last name'></input> <br/>
        <label text="email"> email</label>
        <input text='email'></input> <br/>
    </form>}
    <h3> shipping address</h3>
    <form className='ship-container'> 
    <label  text="address"> address</label>
        <input text='address'></input> <br/>
        <label text="city"> city</label>
        <input text='city'></input> <br/>
        <label text="state"> state</label>
        <input text='state'></input> <br/>
        <label text="zip code"> zip code</label>
        <input text='zip code'></input> <br/>
    </form>


    </div>)
}

export default Checkout;