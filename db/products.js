const client = require('./index')

const getAllProducts = async () => {
    try {
      const { rows: products } = await client.query (`
      SELECT *
      FROM products;
      `);
      console.log('products: ', products)
      return products;
  
    } catch (error) {
  
      throw error;
    }
  
}

module.exports = {
    getAllProducts
}