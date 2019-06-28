
// const add = (a,b) => {
//     return new Promise((resolve,reject)=>{
//         setTimeout(() => {
//             resolve(a+b)
//         }, 2000);
//     })
// }




// const todo = async () =>{
//     const sum = await add(1,22)
//     const sum2 = await add(sum,4)
//     return sum2
// }

// todo().then((result)=>{
//     console.log('result',result)
// }).catch((e)=>{
//     console.log("e",e)
// })

require('../src/db/mongoose')
const Task = require('../src/models/task')

const deleteTask = async(id,comple) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:comple})
    return count
} 

deleteTask('5d1245b5e574b12e31b24d0c',false).then((count)=>{
    console.log(count)
}).catch((e) =>{
    console.log(e)
})