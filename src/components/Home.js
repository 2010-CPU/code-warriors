import React from 'react';

const Home = ({user}) => {
    const {firstName, username} = user;

    return (<>
        
            <h2>Welcome to Food With Friends {firstName}. Your one stop shop for enjoying cooking, baking and cocktails.</h2>
        
            {firstName ?
            
            <div> You are currently logged in as <b>{username}</b>.</div>
            :
            <div>Please login above or register for an account</div>}
            
           
    </>)
}

export default Home;