import mongoose from 'mongoose' ;
import { ObjectId } from 'mongoose';

const jobSchema = new mongoose.Schema({
    title : {
        type: String,
        trim : true,
        required : [ true, 'Title is required'] ,
        maxlength : 70
    },

    description : {
        type: String,
        trim : true,
        required : [ true, 'Description is required'] ,
    },

    salary : {
        type: String,
        trim : true,
        required : [ true, 'Salary is required'] ,
    },

    location : {
        type: String,
    },

    available : {
        type: Boolean,
        default: true,
    },

    jobType : {
        type: ObjectId,
        ref : "JobType",
        required : true
    },

    user : {
        type: ObjectId,
        ref : "User",
        required : true
    },

    
},{
    timestamps:true
})


const JobModel = mongoose.model("Job", jobSchema) ;
export default JobModel ;