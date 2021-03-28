const {client} = require('./client');
const { getUserById } = require('./users');

const createOrder = async ({ status, userId }) => {
    try {
        const datePlaced = new Date().toJSON();
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
        const { rows: orderIds } = await client.query(`
            SELECT id FROM orders;
        `);

        const { rows: orders } = await Promise.all(orderIds.map(
          orderId => getOrderById(orderId.id)
        ));

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

        const { rows: products } = await client.query(`
          SELECT
            p.name, p."imageURL", p."inStock",
            op."productId", op.price, op.quantity
          FROM products p JOIN order_products op
          ON p.id=op."productId"
          WHERE op."orderId"=$1;
        `,[id]);

        order.products = products;
        console.log(typeof products)

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
            SET status = $2, user = $3
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
