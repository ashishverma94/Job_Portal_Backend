import JobType from '../models/jobTypeModel.js'
import ErrorResponse from '../utils/errorResponse.js'

// CREATE JOB CATEGORY
const createJobType = async(req,res,next)=>{
    try{
        const jobT = await JobType.create({
            jobTypeName: req.body.jobTypeName,
            user:req.user.id
        }) ;
        res.status(201).json({
            success:true,
            jobT
        })
    }catch(error){
        next(error) ;
    }
}

// ALL JOBS CATEGORY
const allJobsType = async(req,res,next)=>{
    try{
        const jobT = await JobType.find() ;
        res.status(200).json({
            success:true,
            jobT
        })
    }catch(error){
        next(error) ;
    }
}

// UPDATE JOBS CATEGORY
const updateJobType = async(req,res,next)=>{
    try{
        const jobT = await JobType.findByIdAndUpdate(req.params.type_id, req.body,{new: true}) ;
        res.status(200).json({
            success:true,
            jobT
        })
    }catch(error){
        next(error) ;
    }
}

// DELETE JOBS CATEGORY
const deleteJobType = async(req,res,next)=>{
    try{
        const jobT = await JobType.findByIdAndDelete(req.params.type_id) ;
        res.status(200).json({
            success:true,
            message:"Job Type Deleted"
        })
    }catch(error){
        next(new ErrorResponse("Server Error", 500)) ;
    }
}


export {createJobType, allJobsType, updateJobType, deleteJobType} ;