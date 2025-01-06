import { Router } from 'express';
const router = Router();
import Item from '../model/item.js';

//get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.json({ message: err });
    }
});

//get specific item 
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        res.json(item);
    } catch (err) {
        res.json({ message: err });
    }
});

//add item
router.post('/', async (req, res) => {
    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        id: req.body.id
    });

    try {
        const savedItem = await item.save();
        res.json(savedItem);
    } catch (err) {
        res.json({ message: err });
    }
});

//update item
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await Item.updateOne({ _id: req.params.id }, { $set: { name: req.body.name } });
        res.json(updatedItem);
    } catch (err) {
        res.json({ message: err });
    }
});

//delete item   
router.delete('/:id', async (req, res) => {
    try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
    });

export default router;