// server/api/items.js

const express = require('express')
const itemsRouter = express.Router()

const {
    createItem
} = require('../db')

itemsRouter.post('/items', async(req,res,next) =>{

    const {itemName, imageUrl, description} = req.body
    try {

        const item = await createItem({
            itemName, 
            imageUrl, 
            description,
            isHighlighted: false
        })

        res.send({
            message: 'Item posted successfully'
        })

    } catch (err) {
        throw err
    }
}
)

module.exports=itemsRouter