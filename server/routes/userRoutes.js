const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middlewares/auth');
const { route } = require('./faqRoutes');

router.post('/api/users', async(req,res) =>{
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        const pin = await user.generatePin();
        res.status(201).send({user, token});
    } catch(e) {
        res.status(400).send(e);
    }
    
})

router.post('/api/users/login', async(req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user:user, token})
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/api/users/me', auth, async(req,res) => {
    res.send(req.user);
})

router.post('/api/users/logout', auth, async(req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save();
        res.send()
        res.redirect('/')
    } catch(e) {
        res.status(500).send(e);
    }
})

router.patch('/api/users/me',auth, async(req,res) => {
    console.log(Object.values(req.body));
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','city','gender']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!'})
    }
     try {
        updates.forEach(async (update) => {
            let password = req.user['password'];
            const user = await User.findOne({_id: req.user._id, 'changedPasswords.password': {$in: [req.user['password']]}});
            console.log(user);
            if(user) {
                console.log("Password is same");
                return;
            } else {
                console.log("Pasword is different");
                req.user['password'] = req.body['password']

            }
            // console.log(user);
            // req.user[update] = req.body[update]
        })

        await req.user.save() 
        res.send(req.user)
    } catch(e) {
        res.status(400).send(e)
    }
})




router.delete('/users/me',auth, async(req, res) => {
    try {
        console.log(req.user._id);
        await User.findByIdAndRemove({_id: req.user.id});
        // await req.user.remove()
        res.send(req.user);

    } catch(e) {
        res.status(500).send(e)
    }
})


router.get('/api/users/:id', auth, async(req,res) => {
    try {
        const user = await User.findById({_id: req.params.id})
        if(!user) {
            throw new Error('user not found');
        }

        res.status(200).send(user)
    } catch(e) {
        res.status(500).send(e)
    }
})


router.delete('/api/users/:id', auth, async(req,res) => {
    try {
        const user = await User.findByIdAndRemove({_id: req.params.id})
        if(!user) {
            throw new Error('user not found');
        }

        res.status(200).send(user)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get('/users/all', auth, async(req,res) => {
    try {
        const users = await User.find()

        if(!users) {
            throw new Error('Users not found')
        }

        res.status(200).send(users);
     } catch(e) {
        res.status(500).send(e)
    }
})


module.exports = router;

