require('dotenv').config();

const { buildDB } = require('../db/init_db')

describe('Database', () => {
    beforeAll(async() => {
      await buildDB();
    })
    afterAll(async() => {
        await client.end();
      })
      describe('Users', () => {
        let userToCreateAndUpdate, queriedUser;
        let userCredentials = {username: 'crystal', password: 'password1'};
        describe('createUser({ username, password })', () => {
          beforeAll(async () => {
            userToCreateAndUpdate = await createUser(userCredentials);
            const {rows} = await client.query(`SELECT * FROM users WHERE username = $1`, [userCredentials.username]);
            queriedUser = rows[0];
          })
          it('Creates the user', async () => {
            expect(userToCreateAndUpdate.username).toBe(userCredentials.username);
            expect(queriedUser.username).toBe(userCredentials.username);
          });
          it('Does not store plaintext password in the database', async () => {
            expect(queriedUser.password).not.toBe(userCredentials.password);
          });
          it('Hashes the password (salted 10 times) before storing it to the database', async () => {
            const hashedVersion = bcrypt.compareSync(userCredentials.password, queriedUser.password);
            expect(hashedVersion).toBe(true);
          });
          it('Does NOT return the password', async () => {
            expect(userToCreateAndUpdate.password).toBeFalsy();
          })
        
          })
      })
    });