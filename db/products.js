const {client} = require('./client')

const getAllProducts = async () => {
    try {
      const { rows: products } = await client.query (`
      SELECT *
      FROM products;
      `);

      return products;
  
    } catch (error) {
  
      throw error;
    }
  
}

module.exports = {
    getAllProducts
}