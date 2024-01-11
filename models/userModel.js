import mongoose from 'mongoose' ;
import bcrypt from 'bcryptjs' ;
import jwt from 'jsonwebtoken' ;
import { ObjectId } from 'mongoose';

//_____________HISTORY___________________



const jobsHistorySchema = new mongoose.Schema({
    title : {
        type: String,
        trim : true,
        maxlength : 70
    },

    description : {
        type: String,
        trim : true,
    },

    salary : {
        type: String,
        trim : true,
    },

    location : {
        type: String,
    },

    interviewDate : {
        type: Date,
    },

    applicationStatus : {
        type: String,
        enum:['pending', 'accepted', 'rejected'] ,
        default: 'pending'
    },

    user : {
        type: ObjectId,
        ref : "User",
        required : true
    },

    
},{
    timestamps:true
})
//_______________________________________

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        trim : true,
        required : [ true, 'First Name is required'] ,
        maxlength : 32
    },

    lastName : {
        type: String,
        trim : true,
        required : [ true, 'Last Name is required'] ,
        maxlength : 32
    },

    email : {
        type: String,
        trim : true,
        unique : true,
        required : [ true, 'E-mailis required'] ,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },

    password : {
        type: String,
        trim : true,
        required : [ true, 'Password is required'] ,
        minlength : [8, 'Password must have at least 8 characters']
    },

    jobHistory:[jobsHistorySchema],

    role:{
        type : Number,
        default : 0
    }
},{
    timestamps:true
})
// ENCRYPT THE PASSWORD BEFORE SAVING
userSchema.pre('save', async function(next){
    if ( !this.isModified('password')){
        next() ;
    }
    this.password = await bcrypt.hash(this.password, 10) ;
})

// MATCH PASSWORD 
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password) ;
}

// RETURN JWT TOKEN
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this.id},process.env.JWT_SECRET, {expiresIn: 3600})
}

const User = mongoose.model("User", userSchema) ;
export default User ;