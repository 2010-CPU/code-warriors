const {client} = require('./client');
const bcrypt = require('bcrypt');

//make sure getAllUsers isn't returning passwords

const createUser = async ({firstName, lastName, email, username, password}) => { 
    try {
        const SALT_COUNT = 10; 
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT)

        const { rows: [user] } = await client.query(` 
            INSERT INTO users("firstName", "lastName", email, username, password)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *; 
        `, [firstName, lastName, email, username, hashedPassword])

        password = hashedPassword
        delete user.password; 
        return user; 
    } catch (error) {
        throw error; 
    }
}

const getUser = async ({username, password}) => { 
    try {
        const user = await getUserByUsername(username); 
        const hashedPassword = user.password; 
        const verifyPassword = await bcrypt.compare(password, hashedPassword)

        if(verifyPassword) { 
            delete user.password; 
            return user; 
        } else { 
            return ''
        }
    } catch (error) {
        throw error; 
    }
}

const getAllUsers = async () => {
    try {
        const { rows: users } = await client.query(` 
            SELECT * 
            FROM users; 
        `)

        return users; 
    } catch (error) {
        throw error; 
    }
}

const getUserById = async (id) => { 
    try {
        const { rows: [user]} = await client.query(`
        SELECT * 
        FROM users 
        WHERE id = $1; 
        `, [id]); 

        delete user.password;
        return user; 
    } catch (error) {
        throw error; 
    }
}

const getUserByUsername = async (username) => { 
    try {
        const { rows: [user] } = await client.query(` 
            SELECT * 
            FROM users 
            WHERE username = $1; 
        `, [username]); 

        return user;
    } catch (error) {
        throw error; 
    }
}


module.exports = {
    createUser, 
    getUser, 
    getAllUsers,
    getUserById, 
    getUserByUsername, 
}