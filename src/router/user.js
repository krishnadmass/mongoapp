const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/ath')
const sharp = require('sharp')
const router = new express.Router()
const multer = require('multer')
const {sendMail,cancelMail} = require('../emails/acnt')
// sign up 
router.post('/users',async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        sendMail(user.email,user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send({error:e})
    }
})

// login
router.post('/users/login',async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        if (user.status === true){
            res.send({message:"user not found, Please sign up"})
        }else if(user.status === false){
            res.send({message:"Password wrong"})
        }
        const token = await user.generateAuthToken()
        res.send({user,token});

    }catch(e){
        res.status(400).send({"Error": e});
    }
})

const upload = multer({
    limits:{
        fileSize:10000000
    },
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined,true)
    }
})

// upload avatar
router.post('/users/me/avatar',auth,upload.single('avatar'),async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    const a = await req.user.save()
    res.send()
},(error,req,res,next) => {
    res.status(400).send({error:error.message})
})


// delete the avatar
router.delete('/users/me/avatar',auth,async(req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send({message:"deleted successfully"})

})
// logout a unique device
router.post('/users/logout',auth,async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        console.log("logget out the user",req.user.tokens)
        await req.user.save()
        res.send({message:"logged out"})
    } catch (error) {       
        res.status(500).send("not logged out")
    }
})
// logout all device
router.post('/users/logoutall',auth,async(req,res)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.send({message:"Logged Out from all the devices"})
    } catch (error) {
        res.status(500).send({error:"failed"})
    }
})

// signed in user profile
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// to find everything and auth is used
// to see all the users
router.get('/users',auth,async (req,res)=>{

    try{
        const users = await User.find({})
        res.status(201).send(users)
        console.log("signed user id",req.user.name)
    }catch(e){
        res.status(400).send({error:e})
    }
})

// update by id

router.patch('/users/me',auth,async(req,res)=>{
    const updates = await Object.keys(req.body)
    console.log(updates)
    const allowedUpdates = ['name','email','password','age']
    const isvalidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if (!isvalidOperation){
        return res.status(400).send({error:"Update invalid"})
    }
    try{
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save() 
        res.send(req.user)
    } catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth,async(req,res)=>{
    try{
        await req.user.remove()
        cancelMail(req.user.email,req.user.name)
        res.send(req.user)
    }catch(e){
        console.log(e)
        res.send({error:e}).status(500)
    }
})

// get the avatar
router.get('/users/:id/avatar',async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (error) {
        res.status(404).send()        
    }
})


module.exports = router