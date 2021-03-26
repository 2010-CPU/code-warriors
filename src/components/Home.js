import React from 'react'

const Home = ({user}) => {

    return (<>
        
            <h2>Welcome to Food With Friends. Your one stop shop for enjoying cooking and baking.</h2>
        
            {user.username ?
            
            <div> You are currently logged in as <b>{user.username}.</b></div>
            :
            <div>Please login above or register for an account</div>}
            
           
    </>)
}

export default Home;