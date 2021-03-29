const {client} = require('./client');
const { getUserById } = require('./users');

const createOrder = async ({ status, userId, datePlaced }) => { 
    try {
        const { rows: [order] } = await client.query(` 
            INSERT INTO orders (status, "userId", "datePlaced")
            VALUES ($1, $2, $3)
            RETURNING *; 
        `, [status, userId, datePlaced]);
        
        return order; 
    } catch (error) {
        throw error; 
    }
}

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

const getOrdersByUser = async ({ id }) => { 
    try {

        const { rows: orders } = await client.query(` 
            SELECT 
                orders.id,
                orders.status,
                users.id AS "userId"
                orders."datePlaced",
            FROM orders
            JOIN users on "userId" = users.id
            WHERE orders."userId" = $1;
        `, [id]);

        return orders;
        
    } catch (error) {
        throw error; 
    }
}

const updateOrder = async ({ id, status, userId }) => {

    try {
        const {rows: [order] } = await client.query(` 
            UPDATE orders
            SET status = $2, "userId" = $3
            WHERE id = $1
            RETURNING *; 
        `, [id, status, userId]);

        return order;
    } catch (error) {
        throw error; 
    }
}

const completeOrder = async ({ id }) => { 
    try {
        const { rows: [order] } = await client.query(` 
            UPDATE orders
            SET status = 'completed'
            WHERE id = $1
            RETURNING *;
        `, [id]);

        return order; 
    } catch (error) {
        throw error; 
    }
}

const cancelOrder = async ({ id }) => { 
    try {
        const { rows: [order] } = await client.query(` 
            UPDATE orders 
            SET status = 'cancelled'
            WHERE id = $1 
            RETURNING *; 
        `, [id]);

        return order; 
    } catch (error) {
        throw error; 
    }
}

module.exports = {
    getAllOrders,
    getOrderById, 
    getOrdersByUser,
    createOrder,
    updateOrder,
    completeOrder, 
    cancelOrder, 
}