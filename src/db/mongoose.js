// 25-06-2019
const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
})

// const User = mongoose.model('User',{
//     name:{
//         type:String
//     },
//     age:{
//         type:Number
//     }
// })

// const iam = new User({
//     name:12,
//     age:'ram'
// })

// iam.save().then(()=>{
//     console.log(iam)
// }).catch((error)=>{
//     console.log("Error!!!!!",error)
// })


// -----------------------challenge------------------------
// const Tasks = mongoose.model('tasks',{
//     description:{
//         type:String
//     },
//     completed:{
//         type:Boolean
//     }
// })

// const tk = new Tasks({
//     description:"Buy Fruits",
//     completed:true
// })
// const sk = new Tasks({
//     description:"buy snacks",
//     completed:false
// })

// tk.save().then(()=>{
//     console.log(tk)
// }).catch((error)=>{
//     console.log(error)
// })

// sk.save().then(()=>{
//     console.log(tk)
// }).catch((error)=>{
//     console.log(error)
// })
//-------------------------challenge--finished--------------------
// Data Validation and Sanitarization - Part -1 
// its validating the data and putting some condition.For ex, entering the age must be greater than 18..
// and also required condition used
// basic validation

// -----------------------challenge----------------
// 1. Setup the field as a req string
// 2. Ensure the len is greater than 6
// 3. Trim the password
// 4. Ensure that pwd doesn't contain pwd
// check and execute the code 

// const User = mongoose.model('User',{
//     name:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     age:{
//         type:Number,
//         default:0,
//         // own logic validation
//         validate(value){
//             if(value < 0){
//                 throw new Error("Age must be positive")
//             }
//     }
// },
// email:{
//     type:String,
//     required:true,
//     trim:true,
//     lowercase:true,
//     // library logic validation
//     validate(value){
//         if(!validator.isEmail(value)){
//             throw new Error("InValid Email")
//         }
//     }
// },
// password:{
//     type:String,
//     required:true,
//     minlength:7,
//     validate(value){
//         if(value.toLowerCase().includes('password')){
//             throw new Error("Password cannot password, try something new")
//         }
//     }

// }
// })


// const iam = new User({
//     // if running empty object it gives a error in mongoose,so to avoid that
//     // see builtin validators in docs --->> mongoosejs.com/docs/validation
//     name:'   Siva  ',
//     email:'  MK@gmail.io',
//     age:22,
//     password:'password'


// })

// iam.save().then(()=>{
//     console.log(iam)
// }).catch((error)=>{
//     console.log("Error!!!!!",error)
// })


// --------------------------challenge finished-----------------------

// ------------challenge start-----------------
// 1. Trim desc and make it req
// 2. Make cmpltd optnl and deft it to fls
// 3. Test and execute

// const Tasks = mongoose.model('tasks',{
//     description:{
//         type:String,
//         trim:true,
//         required:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// })

// const tk = new Tasks({
//     description:"     Buy Car         ",
// })
// const sk = new Tasks({
//     description:"buy Helicopter",
//     completed:true
// })

// tk.save().then(()=>{
//     console.log(tk)
// }).catch((error)=>{
//     console.log(error)
// })

// sk.save().then(()=>{
//     console.log(sk)
// }).catch((error)=>{
//     console.log(error)
// })

