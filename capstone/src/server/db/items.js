// db/items.js

const db = require('./client')

const createItem = async ({itemName, imageUrl, description, isHighlighted}) => {
    try {

        const {rows:[item]} = await db.query(`
        INSERT INTO items(itemName, imageUrl, description, isHighlighted)
        VALUES ($1, $2, $3, $4)
        RETURNING * `, [itemName, imageUrl, description, isHighlighted]) 

        return item

    } catch (err) {
        throw err
    }
}

const getAllItems = async () => {
    try {

        const { rows } = await db.query(`SELECT * FROM items`)

        return rows

    } catch (err) {
        throw err
    }
}

const getItemById = async (id) => {
    try {
        
        const { rows: [item]} = await db.query(`
            SELECT * 
            FROM items
            WHERE id = $1;
        `, [id])

        return item

    }catch (error){
        throw error
    }
}

const deleteItem = async (id) => {
    try {

        const { rows: [item]} = await db.query(`
            DELETE FROM items 
            WHERE id = $1
            RETURNING * ;
             `, [id])

        return item

    }catch (error) {
        throw error
    }
}

const editItem = async (id, fields={}) => {

    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    if (setString.length === 0) {
        return;
    }

    try {

        const { rows: [item]} = await db.query(`
        UPDATE items
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));
        return item;

    } catch (err){
        throw err
    }
}

module.exports={
    createItem,
    getAllItems,
    getItemById,
    deleteItem, 
    editItem
}