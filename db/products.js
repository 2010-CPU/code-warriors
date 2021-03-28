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

const getOrderProductById = async ({id}) => {
  try{
    const {rows: [order_products] } = await client.query(`
    SELECT *
    FROM products
    WHERE id=${id};
    `);
    return order_products;
  }catch (error) {
    throw error;
  }
};

const addProductToOrder = async ({ orderId, productId, price, quantity }) => {
  try{
    const { rows: [order_products] } = await client.query(`
    INSERT INTO order_products("orderId", "productId")
    VALUES ($1, $2, $3, $4)
    RETURN *;
    `, [orderId, productId, price, quantity]);
    return order_products;
  } catch (error){
    throw error;
  }
};

const updateOrderProduct = async ({ id, price, quantity }) => {
  try{
    const { rows: [order_products] } = await client.query(`
    UPDATE order_products
    SET price = #2, quantity = #3
    WHERE id= $1
    RETURNING *
    `, [id, price, quantity])

    return order_products;
  }catch (error){
    throw error;
  }
};

const destroyOrderProduct = async (id) => {
  try {
    const {rows: [deletedOrderProduct]} = await client.query(`
    DELETE FROM order_products
    WHERE id= $1
    RETURNING *;
    `, [id]);
    return deletedOrderProduct;
  }catch(error){
    throw error;
  }
};

module.exports = {
    getAllProducts,
    getOrderProductById,
    addProductToOrder,
    updateOrderProduct,
    destroyOrderProduct
}