const {client} = require('./client');

const getAllProducts = async () => {
    try {
      const { rows: products } = await client.query (`
      SELECT *
      FROM products;
      `);
      return products;
    }catch (error){
      throw error;
    }
  };

const createProduct = async ({name, grade, imageURL, birthday, restaurant, schoolstore, personalstore, drink, treat, color, flower, food, place, meTime, hobbies, giftcard, pets, dislikes, allergies, wishlist}) => {
    try {
        const {rows: [product]} = await client.query(`
            INSERT INTO products(name, grade, "imageURL", birthday, restaurant, schoolstore, personalstore, drink, treat, color, flower, food, place, "meTime", hobbies, giftcard, pets, dislikes, allergies, wishlist)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
            RETURNING *;
        `, [name, grade, imageURL, birthday, restaurant, schoolstore, personalstore, drink, treat, color, flower, food, place, meTime, hobbies, giftcard, pets, dislikes, allergies, wishlist]);

        return product;
    } catch (error) {
        throw error;
    }
}

const getProductById = async (id) => {
    try {
        const {rows: [product]} = await client.query(`
            SELECT * FROM products
            WHERE id = $1;
        `, [id]);

        return product;
    } catch (error) {
        throw error;
    }
}

const destroyProduct = async (id) => {
    try {
        const {rows: [product]} = await client.query(`
            DELETE FROM products
            WHERE id = $1
            RETURNING *;
        `, [id]);

        return product;
    } catch (error) {
        throw error;
    }
}

const updateProduct = async (fields = {}) => {
    const {id} = fields;

    const setString = Object.keys(fields).map((key, index) => {
        if (key === "imageURL" || key === "inStock") {
            return `"${key}"=$${index + 1}`;
        } else {
            return `${key}=$${index + 1}`;
        }
    }).join(', ');

    try {
        const {rows: [product]} = await client.query(`
            UPDATE products
            SET ${setString}
            WHERE id = ${id}
            RETURNING *;
        `, Object.values(fields));

        return product;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    destroyProduct, 
    updateProduct
}