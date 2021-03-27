import React from 'react';

async function AddToCart ({id}) { 
try {
    const response = await fetch("http://localhost:3000/order",{
        method: 'POST' ,
        body: JSON.stringify({ 
            id,
        }),
        headers: { 
            'Content-type': 'application/json'
        }, })
        let data = await response.json()
        console.log(data)

        return <> 

        </> 
} catch (error) {
    throw error; 
}
}

export default AddToCart;