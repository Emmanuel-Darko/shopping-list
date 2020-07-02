const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item model
const Item = require('../../models/Item');

// @route GET api/items
// @desc GET All items
// @access Public
router.get('/', (req,res) => {
    Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));

    // res.json([
    //     {id: 1, name: "kode"},
    //     {id: 2, name: "joe"},
    //     {id: 3, name: "kojo"}
    // ])
});

// @route POST api/items
// @desc Create a Post
// @access Private
router.post('/', auth, (req,res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

// @route DELETE api/items
// @desc Delete a Post
// @access Private
router.delete('/:id', auth, (req,res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success:false }));
});

// @route UPDATE api/items
// @desc Updates a Post
// @access Private
router.put('/', auth, (req,res) => {
    Item.findById(req.body.id)
    .then(item => item.updateOne({name: req.body.name})
        .then(() => {
            Item.find()
            .sort({ date: -1 })
            .then(items => res.json(items));
        })
    )
    .catch(err => res.status(404).json({ success:false }));
});


module.exports = router