const db=require('./client')

const createItem = async ({itemName, imageUrl, description, isHighlighted}) => {
    try{
        const {rows:[item]} = await db.query(`
        INSERT INTO items(itemName, imageUrl, description, isHighlighted)
        VALUES ($1, $2, $3, $4)
        RETURNING * `, [itemName, imageUrl, description, isHighlighted]) 

        return item

    } catch (err) {
        throw err
    }
}

module.exports={createItem}