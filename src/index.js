const express = require('express')
require('./db/mongoose')
// require('../config')
const router_user = require('./router/user')
const router_task = require('./router/task')
const app = express()
const port = process.env.PORT



const multer = require('multer')
const upload = multer({
    dest : "images",
    limits:{
        fileSize:10000000
    },
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('Please upload a Word Document'))
        }
        cb(undefined,true)
        // cb(new Error('File must be a PDF'))
        // cb(undefined,true)
        // cb(undefined,false)
    }
})

app.post('/upload',upload.single('upload'),(req,res)=>{
    res.send()
},(error,req,res,next) => {
    res.status(400).send({error:error.message})
}
)
app.use(express.json())
app.use(router_user)
app.use(router_task)

// without middleware: new request --> run route handler
// with middleware: new request --> do something ---> run route handler

app.listen(port,()=>{
    console.log(`Server is Listening on the port`+port)
})

// const pet = {
//     name:"Jimmy"
// }

// pet.toJSON = function() {
//     return this.name
// }

// console.log(JSON.stringify(pet))

// it gives the entire profile of owner
const Task = require('./models/task')
const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('5d14a1c1ea9a2120729953fd')
//     // await task.populate('Owner').execPopulate()
//     // console.log(task.Owner  )
//     const user = await User.findById('5d14ad2f1a164c263bff032c')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()