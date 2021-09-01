const {client} = require('./client')
// code to build and initialize DB goes here
const {
  createUser,
  createProduct,
  addProductToOrder,
  createReview
  } = require('./index');
const { createOrder } = require('./orders');

async function buildTables() {
  try {
    client.connect();
    console.log('tables are being dropped')
    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    `);
    console.log('tables are being built')
    // build tables in correct order
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY key,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" TEXT NOT NULL,
        email VARCHAR(320) UNIQUE NOT NULL,
        "imageURL" TEXT default 'images/user-images/muffins.jpg',
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false NOT NULL
      );
    `);

    // await client.query(`
    //   CREATE TABLE orders (
    //     id SERIAL PRIMARY KEY,
    //     status TEXT DEFAULT 'created',
    //     "userId" INTEGER REFERENCES users(id),
    //     "datePlaced" DATE
    //     );
    //   `);

    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        grade VARCHAR(255) NOT NULL,
        "imageURL" TEXT default 'images/user-images/muffins.jpg',
        birthday VARCHAR(255) NOT NULL,
        restaurant TEXT NOT NULL,
        schoolstore TEXT NOT NULL,
        personalstore TEXT NOT NULL,
        drink TEXT NOT NULL,
        treat TEXT NOT NULL,
        color VARCHAR(5) NOT NULL,
        flower TEXT NOT NULL,
        food TEXT NOT NULL,
        place TEXT NOT NULL,
        "meTime" TEXT NOT NULL,
        hobbies TEXT NOT NULL,
        giftcard TEXT NOT NULL,
        pets VARCHAR(255) NOT NULL,
        dislikes TEXT NOT NULL,
        allergies TEXT NOT NULL,
        wishlist TEXT NOT NULL
      );
    `);

    // await client.query(`
    //   CREATE TABLE reviews ( 
    //     id SERIAL PRIMARY KEY,
        
    //   );
    // `);

    // await client.query(`
    //   CREATE TABLE order_products (
    //     id SERIAL PRIMARY KEY,
        
    //   );
    // `);
    console.log('the tables have been built')
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  console.log('creating users...');
  try {
    const usersToCreate = [
      { firstName: 'crystal', lastName: 'joyce', email: 'crystaljoyce@me.com', imageURL: 'https://www.almadencountrydayschool.org/uploaded/images/Faculty_Staff/2019_Faculty/Heather_Avrech_600.jpg', username: 'crystal', password: 'password1', isAdmin: true }
    ]
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log('users created: ');
    console.log(users);
    console.log('finshed creating users');


    console.log('creating products')
    const productsToCreate = [
      { name: 'Crystal Joyce', grade: 'first', imageURL: 'https://www.almadencountrydayschool.org/uploaded/images/Faculty_Staff/2019_Faculty/Heather_Avrech_600.jpg', birthday: '02/05/1985', restaurant: 'Panda', schoolstore: 'amazon', personalstore: 'amazon', drink: 'coffee', treat: 'cookies', color: 'blue', flower: 'roses', food: 'thai', place: 'tahoe', meTime: 'reading', hobbies: 'soccer games', giftcard: 'amazon', pets: 'lucy', dislikes: 'Dodgers, Raiders', allergies: 'none', wishlist: 'sticky notes, scented highlighters'}
    ]
    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log('products created: ');
    console.log(products);
    console.log('finsihed creating products');

    // console.log('creating orders')
    // const ordersToCreate = [
    //   { status: 'created', userId: 1}
    // ]
    // const orders = await Promise.all(ordersToCreate.map(createOrder));
    // console.log('orders created: ')
    // console.log(orders);
    // console.log('finished creating orders')

    // console.log('creating order_products');
    // const orderProductsToCreate = [
    //   {productId: 1, orderId: 1, price: 150, quantity: 2}
    // ]
    // const orderProducts = await Promise.all(orderProductsToCreate.map(addProductToOrder))
    // console.log('order_products created: ')
    // console.log(orderProducts)
    // console.log('finished creating order_products');

    // console.log('creating reviews');
    // const reviews = [

    // ]
    // const review = await Promise.all(reviews.map(createReview))
    // console.log('order_products created: ')
    // console.log(review)
    // console.log('finished creating order_products');

  } catch (error) {
    console.log('error creating intital data');
    throw error;
  }
}

const buildDB = async () => {
  await buildTables()
    .then(populateInitialData)
    .catch(console.error);
}

module.exports = {buildDB};
