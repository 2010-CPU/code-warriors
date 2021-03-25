const client = require('./index');

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
        const { rows: [user]} = await client.require(`
        SELECT * 
        FROM users 
        WHERE id = $1; 
        `, [id]); 

        return user; 
    } catch (error) {
        throw error; 
    }
}


module.exports = {
    getAllUsers,
    getUserById, 
}