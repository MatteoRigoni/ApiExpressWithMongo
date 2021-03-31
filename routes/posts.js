const express = require('express');
const router = express.Router();

const Post = require('../model/post');

// get
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().limit(5);
        res.json(posts);
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

router.get('/:postId', async (req, res) => {
    try {
        const posts = await Post.findById(req.params.postId);
        res.json(posts);
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

// delete
router.delete('/:postId', async (req, res) => {
    try {
        const removed = await Post.remove({_id: req.params.postId});
        res.json(removed);
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

// patch
router.patch('/:postId', async (req, res) => {
    try {
        const updated = await Post.updateOne(
            {_id: req.params.postId}, 
            {$set: {title: req.body.title}}
        );
        res.json(updated);
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

// insert
router.post('/', async (req, res) => {
    const post = new Post({
        title : req.body.title,
        description : req.body.description
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(err) {
        res.status(500).json({ message: err });
    };
    

    // post.save()
    //     .then(data => {
    //         res.status(200).json(data);
    //     })
    //     .catch(err => {
    //         res.status(500).json({ message: err });
    //     });
});

module.exports = router;