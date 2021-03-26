const {client} = require('./client');

const getAllOrders = async () => { 
    try {
        const { rows: orders } = await client.query(` 
            SELECT * 
            FROM orders; 
        `);
        return orders; 
    } catch (error) {
        throw error; 
    }
}

const getOrderById = async (id) => { 
    try {
        const { rows: [order]} = await client.query(` 
            SELECT * 
            FROM orders
            WHERE id = $1; 
        `, [id]); 

        return order; 
        
    } catch (error) {
        throw error; 
    }
}

// need to join users and orders, to pull the usersId where it matches the orders table 

// const getOrdersByUserId = async ({id}) => { 
//     try {
//         const { rows: orders } = await client.query(` 
//             SELECT * 
//             FROM orders
//             WHERE 
//         `)
        
//     } catch (error) {
        
//     }
// }

module.exports = {
    getAllOrders,
    getOrderById, 
    // getOrdersByUserId,
}