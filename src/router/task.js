const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/ath')
const router = new express.Router()

// get tasks complete = true
// limit pagination and skip
//  GET /tasks?completed=true
//  GET /tasks?limit=10&skip=20
//  GET /tasks?sortBy = createdAt:desc or asc
router.get('/tasks/',auth,async (req,res)=>{
    const match = {}
    const sort = {}
    if (req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try{
        // console.log(req.user._id)
        // const tasks = await Task.find({Owner:req.user._id})
        // res.status(201).send(tasks)
        await req.user.populate(
            {
                path:'tasks',
                match,
                options:{
                    limit:parseInt(req.query.limit),
                    skip:parseInt(req.query.skip),
                    sort

                }
            }
        ).execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        console.log(e)
        res.status(400).send({error:e})
    }
})

router.get('/task/:id',auth,async (req,res)=>{
    const _id = req.params.id

    try{
        // const tasks =await Task.findById(_id)
        const tasks = await Task.findOne({_id,Owner:req.user._id})
        if (!tasks){
            res.status(404).send({message:"Task Not found"})
        }
        res.send(tasks)
    }catch(e){
        res.status(500).send(e)
    }

})
// challenge 
// do the same for task

router.post('/tasks',auth,async(req,res)=>{
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        Owner:req.user._id
    })
    try{
        await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send({error:e})
    }
})

router.patch('/tasks/:id',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isvalidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if (!isvalidOperation){
        return res.status(400).send({error:"Update invalid"})
    }
    try{
        const task = await Task.findOne({_id:req.params.id,Owner:req.user._id})
        console.log(task)
        if (!task){
            return res.status(404).send()
        }
        updates.forEach((update)=>task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch(e){
        res.status(400).send(e)
    }
})


router.delete('/tasks/:id',auth,async(req,res)=>{
    try{
        const tsk = await Task.findOneAndDelete({_id:req.params.id,Owner:req.user._id})
        if (!tsk) {
            return res.status(404).send()
        }
        res.send(tsk)
    }catch(e){
        res.send({error:e}).status(500)
    }
})



module.exports = router
