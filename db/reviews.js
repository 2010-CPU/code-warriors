const {client} = require('./client');

const createReview = async ({title, content, stars, userId, productId}) => {

    try {
        const { rows: [review] } = await client.query(` 
            INSERT INTO reviews (title, content, stars, "userId", "productId")
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *; 
        `, [title, content, stars, userId, productId]);

        return review; 
    } catch (error) {
        throw error; 
    }
}

const getAllReviews = async () => { 
    try {
        const { rows: reviews } = await client.query(` 
            SELECT * 
            FROM reviews; 
        `)

        return reviews;
    } catch (error) {
        throw error; 
    }
}

const updateReview = async ({id, title, content, stars, productId}) => {
    try {
        const { rows: [review] } = await client.query(` 
            UPDATE reviews,
            SET title = $2, $3, $4, $5, $6, 
            WHERE id = $1, 
            RETURNING *; 
        `, [id, title, content, stars, userId, productId])

        return review; 
    } catch (error) {
        throw error; 
    }
}

module.exports = {
    createReview, 
    getAllReviews,
    updateReview,
}