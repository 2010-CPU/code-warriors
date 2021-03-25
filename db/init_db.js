// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await client.query(` 
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS products;
    `)

    // build tables in correct order
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY key,
        firstName VARCHAR(255) NOT NULL,
        lastName TEXT NOT NULL,
        email VARCHAR(320) NOT NULL,
        imageURL TEXT DEFAULT 'someone@gmail.com',
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) UNIQUE NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false NOT NULL
      )
    
    `)
    await client.query(` 
    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      status DEFAULT 'created',
      "userId" REFERENCES users(id),
      "datePlaced" DATE
      );
      `);
      
    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        imageURL text default 'www.something.com',
        inStock BOOLEAN DEFAULT false NOT NULL,
        category VARCHAR(255) NOT NULL
      );
    `);

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());