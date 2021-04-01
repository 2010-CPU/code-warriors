const {client} = require('./client');
const bcrypt = require('bcrypt');

//make sure getAllUsers isn't returning passwords

const createUser = async ({firstName, lastName, email, username, password, address, city, state, zip}) => { 
    try {
        const SALT_COUNT = 10; 
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT)

        const { rows: [user] } = await client.query(` 
            INSERT INTO users("firstName", "lastName", email, username, password, address, city, state, zip)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *; 
        `, [firstName, lastName, email, username, hashedPassword, address, city, state, zip])

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
            SELECT 
                id,
                "firstName",
                "lastName",
                email,
                "imageURL",
                username,
                "isAdmin"
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

const updateUser = async ({ userId, firstName, lastName, email, password, address, city, state, zip, isAdmin, username }) => { 
    try {
        const SALT_COUNT = 10; 
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT)

        const { rows: [user] } = await client.query(` 
        UPDATE users
        SET "firstName" = $2, "lastName" = $3, email = $4, password = $5, address = $6, city = $7, state = $8, zip = $9, isAdmin = $10, username = $11
        WHERE "userId" = $1
        RETURNING *; 
        `, [userId, firstName, lastName, email, hashedPassword, address, city, state, zip, isAdmin, username ]);

        password = hashedPassword
        delete user.password; 
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
    updateUser, 
}