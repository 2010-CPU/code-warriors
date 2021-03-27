import React from 'react';

const Home = ({user}) => {
    const {firstName, lastName, email, username} = user;

    return (<>
        
            <h2>Welcome to Food With Friends, {user.firstName}. Your one stop shop for enjoying cooking, baking and cocktails.</h2>
        
            {user.firstName ?
            
            <div> You are currently logged in as <b>{user.username}.</b></div>
            :
            <div>Please login above or register for an account</div>}
            
           
    </>)
}

export default Home;