const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt =  require('jsonwebtoken')
const Task = require('./task')

// 
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        default:0,
        // own logic validation
        validate(value){
            if(value < 0){
                throw new Error("Age must be positive")
            }
    }
},
email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    // library logic validation
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("InValid Email")
        }
    }
},
password:{
    type:String,
    required:true,
    minlength:7,
    trim:true,
    validate(value){
        if(value.toLowerCase().includes('password')){
            throw new Error("Password cannot password, try something new")
        }
    }

},
tokens:[{
    token:{
        type:String,
        required:true
    }
}],
avatar:{
    type:Buffer
}
},{
    timestamps:true
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'Owner'
})



// toJSON -->>
userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

// jwt token function
userSchema.methods.generateAuthToken = async function() {
    try {
        const user = this
        const token = jwt.sign({_id:user._id.toString() },'thisismynewcourse')
        user.tokens = user.tokens.concat({ token })
        await user.save()
        return token
        
    } catch (error) {
        return error
        
    }
}

// checking emailid and password to login
userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({ email })
    if (!user) {
        console.log("login failed, email")
        return({message:"User not found",status:true})
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if (!isMatch){
        console.log("password wrong")
        return({message:"Password Wrong",status:false})
    }
    console.log("success")
    return user
}


// hashing the plain text password before saving
userSchema.pre('save',async function(next){
    const user = this
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    console.log("just before saving")
    next()
})


// delete the tasks when user is removed
userSchema.pre('remove', async function (next){
    const user = this
    await Task.deleteMany({Owner:user._id})
    next()
})
const User = mongoose.model('User',userSchema)

module.exports = User
