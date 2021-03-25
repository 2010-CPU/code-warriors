require('dotenv').config();

const { rebuildDb } = require('../db/init_db')

describe('Database', () => {
    beforeAll(async() => {
      await rebuildDB();
    })
    afterAll(async() => {
        await client.end();
      })
    });