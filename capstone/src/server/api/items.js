// server/api/items.js

const express = require('express')
const itemsRouter = express.Router();

const {
    createItem,
    getAllItems, 
    getItemById,
    deleteItem,
    editItem
} = require('../db')

itemsRouter.get('/', async (req, res, next) => {
    try {
        const items = await getAllItems();

        res.send({
            items
      });
    } catch (error) {
        next (error)
    }
})

itemsRouter.get('/:id', async (req, res, next) => {
    try{
        const item = await getItemById(req.params.id);
        console.log(item)

        res.send({
            item
        });
        
    } catch (error) {
        next (error)
    }
})

itemsRouter.post('/', async(req, res, next) =>{

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
})

itemsRouter.delete('/:id', async (req, res, next) => {
    try {
        const item = await deleteItem(req.params.id)

        res.send({
            item
        });

    } catch (err) {
        throw err
    }
})

itemsRouter.put('/:id', async (req, res, next) => {
    try {
        const item = await editItem(req.params.id, req.body)

        res.send({
            item
        })

    } catch (err) {
        throw err
    }
})

module.exports=itemsRouter

