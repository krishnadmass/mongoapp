require("../src/db/mongoose")

// const User = require('../src/models/user')
// 5d1205cc3d05d25e17afc300
// User.findOneAndUpdate('5d1205cc3d05d25e17afc300',{
//     age:31
// }).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:25})
// }).then((result)=>{
//     console.log(result)
//     return User.findById('5d1205cc3d05d25e17afc300').then((op)=>{
//         console.log("updated user",op)
//     })
// }).catch((error)=>{
//     console.log(error)
// })

// --challenge--
const Task = require("../src/models/task")

Task.findByIdAndDelete('5d11f895d95f15430efd3d36').then((task)=>{
    console.log(task)
    return Task.countDocuments({completed:false}).then((op)=>{
            console.log(op)
    })
}).catch((error)=>{
    console.log(error)
})