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
    `)

    // build tables in correct order
    await client.query(` 
    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      status DEFAULT 'created',
      "userId" REFERENCES users(id),
      "datePlaced" DATE
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