require('dotenv').config();

const { buildDb } = require('../db/init_db')

describe('Database', () => {
    beforeAll(async() => {
      await buildDB();
    })
    afterAll(async() => {
        await client.end();
      })
      describe('Users', () => {
        let userToCreateAndUpdate, queriedUser;
        let userCredentials = {username: 'billybob', password: 'bobbybadboy'};
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
          it('EXTRA CREDIT: Does not store plaintext password in the database', async () => {
            expect(queriedUser.password).not.toBe(userCredentials.password);
          });
          it('EXTRA CREDIT: Hashes the password (salted 10 times) before storing it to the database', async () => {
            const hashedVersion = bcrypt.compareSync(userCredentials.password, queriedUser.password);
            expect(hashedVersion).toBe(true);
          });
          it('Does NOT return the password', async () => {
            expect(userToCreateAndUpdate.password).toBeFalsy();
          })
        })
        describe('getUser({ username, password })', () => {
          let verifiedUser;
          beforeAll(async () => {
            verifiedUser = await getUser(userCredentials);
          })
          it('Verifies the passed-in, plain-text password against the password in the database (the hashed password, if this portion is complete)', async () => {
            const unVerifiedUser = await getUser({username: userCredentials.username, password: 'badPassword'});
            expect(verifiedUser).toBeTruthy();
            expect(verifiedUser.username).toBe(userCredentials.username);
            expect(unVerifiedUser).toBeFalsy();
          })
          it('Does NOT return the password', async () => {
            expect(verifiedUser.password).toBeFalsy();
          })
        })
        describe('getUserById', () => {
          it('Gets a user based on the user Id', async () => {
            const user = await getUserById(userToCreateAndUpdate.id);
            expect(user).toBeTruthy();
            expect(user.id).toBe(userToCreateAndUpdate.id);
          })
        })
      })
    });