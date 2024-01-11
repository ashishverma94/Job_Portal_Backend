import mongoose from 'mongoose' ;
import { ObjectId } from 'mongoose';

const jobTypeSchema = new mongoose.Schema({
    jobTypeName : {
        type: String,
        trim : true,
        required : [ true, 'Job category is required'] ,
        maxlength : 70
    },

    

    user : {
        type: ObjectId,
        ref : "User",
        required : true
    },

    
},{
    timestamps:true
})


const JobTypeModel = mongoose.model("JobType", jobTypeSchema) ;
export default JobTypeModel ;