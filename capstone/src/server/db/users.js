const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async({ username, email, password, isAdmin }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [user ] } = await db.query(`
        INSERT INTO users(username, email, password, isAdmin)
        VALUES($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [username, email, hashedPassword, isAdmin]);

        return user;
    } catch (err) {
        throw err;
    }
}

const getUser = async({email, password}) => {
    if(!email || !password) {
        return;
    }
    try {
        const user = await getUserByEmail(email);
        if(!user) return;
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(!passwordsMatch) return;
        delete user.password;
        return user;
    } catch (err) {
        throw err;
    }
}

const getUserByEmail = async(email) => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [ email ]);

        if(!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

const getAllUsers = async () => {
    try {
        const { rows } = await db.query(`SELECT * FROM users`)

        return rows

    } catch (err) {
        throw err
    }
}

const deleteUser = async (id) => {
    try {
        const { rows: [user]} = await db.query(`
            DELETE FROM users
            WHERE id = $1
            RETURNING * ;
            `, [id])

        return user
    } catch (err) {
        throw err
    }
}

const editUser = async (id, fields={}) => {

    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    if (setString.length === 0) {
        return;
    }

    try {

        const { rows: [user]} = await db.query(`
        UPDATE users
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));
        return user;

    } catch (err){
        throw err
    }
}

module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    getAllUsers,
    deleteUser,
    editUser
};