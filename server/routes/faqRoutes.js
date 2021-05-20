const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Faq = require('../models/faq')

router.post('/api/faq', auth, async (req,res) => {
    console.log({...req.body})
    const faq = new Faq({
        ...req.body,
        categeories:[{
            cat_name:req.body.cat_name
        }]
    })
    try {
        await faq.save()
        res.status(201).send(faq)   
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get('/api/faq', auth, async (req, res) => {
    try {
        const faqs = await Faq.find()
        if(!faqs) {
            throw new Error('Not found!')
        }
        res.send(faqs)
    } catch(e) {
        res.status(500).send(e) 
    }
})

router.get('/api/faq/:id', auth,async (req,res) => {
    const _id = req.params.id;

    try {
        const faq = await Faq.findOne({_id})
        if(!faq) {
            return res.status(404).send()
        }

        res.send(faq)
    } catch(e) {
        res.status(500).send()
    }

})

router.patch('/api/faq/:id',auth, async(req,res) => {
    // console.log(Object.values(req.body));
    const updates = Object.keys(req.body)
    const allowedUpdates = ['question','answer','cat_name','categeories']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!'})
    }
     try {
        const faq = await Faq.findOne({_id:req.params.id});
        console.log(faq);
        if(!faq) {
            return res.status(404).send()
        }

        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await faq.save()
        res.send(faq)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/api/faq/:id',auth, async(req, res) => {
    try {
        const faq = await Faq.findOneAndDelete ({_id:req.params.id})
        
        if(!faq) {
            return res.status(404).send()
        }

        res.send(faq)
    } catch(e) {
        res.status(500).send()
    }
}) 


module.exports = router