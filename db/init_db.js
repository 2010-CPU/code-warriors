const {client} = require('./client')
// code to build and initialize DB goes here
const {
  createUser,
  createProduct,
  } = require('./index');

async function buildTables() {
  try {
    client.connect();
    console.log('tables are being dropped')
    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS orders;
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
        email VARCHAR(320) NOT NULL,
        "imageURL" TEXT default 'images/user-images/muffins.jpg',
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        status text DEFAULT 'created',
        "userId" INTEGER REFERENCES users(id),
        "datePlaced" DATE
        );
      `);

    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        "imageURL" text default 'www.something.com',
        "inStock" BOOLEAN DEFAULT false NOT NULL,
        category VARCHAR(255) NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE order_products (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "orderId" INTEGER REFERENCES orders(id),
        price INTEGER NOT NULL,
        quantity INTEGER DEFAULT 0 NOT NULL
      );
    `);
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  console.log('creating users...'); 
  try {
    // create useful starting data
    const usersToCreate = [ 
      { firstName: 'crystal', lastName: 'joyce', email: 'crystaljoyce@me.com', imageURL: '', username: 'crystal', password: 'password1', isAdmin: 'true' },
      { firstName: 'walter', lastName: 'white', email: 'ilovescience@me.com', imageURL: 'breakingbad.com', username: 'bagsomoney', password: 'password2', isAdmin: 'false' },
      { firstName: 'fred', lastName: 'flinstone', email: 'dinoman@me.com', imageURL: 'theflinstones.com', username: 'rocksrule', password: 'password3', isAdmin: 'false' },
    ]
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log('users created: ');
    console.log(users); 
    console.log('finshed creating users');


    console.log('creating products')
    const productsToCreate = [ 
      { name: 'Crepes and Mimosas with Dom', description: 'What better way to spend the weekend than baking chic crepes and enjoying mimosas with your friend Dom. This Baking With Friends kit comes with everything you need to make crepes and mimosas for a crowd, including your dear friend, Dom Perignon.', price: '75', imageURL: '', inStock: 'True', category: 'Breakfast' },
      { name: 'Churros and Margaritas with Jose', description: 'The best way to finish Taco Tuesday is here: Churros and margaritas with Jose. Our newest Baking With Friends kit includes everything you\'ll need to make churros and margaritas for a party of 8. Best of all, your new friend, Jose Cuervo, will be there to spice things up!', price: '50', imageURL: '', inStock: 'true', category: 'Dessert' },
      { name: 'Chops and Shots with Jameson', description: 'Welcome to Ireland! This Baking With Friends kit will transport you to the Emerald Isle, with your host, Jameson. This unique kit incldues everything you\'ll need for a lamb chop and mint jelly dinner that serves 4. Jameson will be there to get the party started and keep it going.', price: '60', imageURL: '', inStock: 'true', category: 'Dinner' }
    ]
    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log('products created: ');
    console.log(products);
    console.log('finsihed creating products');
    
  } catch (error) {
    console.log('error creating intital data');
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());

