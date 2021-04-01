const {client} = require('./client');

const createReview = async () => {

    try {
        const { rows: [review] } = await client.query(` 
            INSERT INTO reviews (title, content, stars, "userId", "productId"),
            VALUES $1, $2, $3, $4, $5,
            RETURNING *; 
        `, [title, content, stars, userId, productId]);

        return review; 
    } catch (error) {
        throw error; 
    }
}

module.exports = {
    createReview, 
}