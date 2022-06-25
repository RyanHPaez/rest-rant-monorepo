const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/', async(req,res)=>{
    let user = await User.findOne({
        where: {email: req.body.email}
    })
    //did not get 404 but got message with incorrect credentials
    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({ message: `Could not find a user with the provided username and password` })
        console.log('hello1')
    } else {
        req.session.userId = user.userId
        console.log('hello2')
        res.json({ user })
    }
})

router.get('/profile', async (req, res) => {
    console.log(req.session.userId)
    try {
        let user = await User.findOne({
            where: {
                userId: req.session.userId
            }
            
        })
        
        //it was this
        // res.json(user)
    } catch {
        res.json(null)
    }
})




module.exports= router