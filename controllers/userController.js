import User from "../models/userModel.js";
import ErrorResponse from '../utils/errorResponse.js'
// LOAD ALL USERS
const allUsers = async(req,res,next)=>{
    const pageSize = 15 ;
    const page = Number(req.query.pageNumber) || 1 ;
    const count = await User
                        .find({})
                        .estimatedDocumentCount()
                        .skip(pageSize*(page-1))
                        .limit(pageSize) ;
    try{
        const users  = await User.find({}).sort({createdAt: -1}).select('-password') ;
        res.status(200).json({
            success : true, 
            users,
            page,
            pages: Math.ceil(count/pageSize),
            count
        })
        next() ;
    }catch(error){
        return next(error) ;
    }
}

// LOAD SINGLE USER
const singleUser = async(req,res,next)=>{
    try{
        const user  = await User.findById(req.params.id) ;
        res.status(200).json({
            success : true, 
            user
        })
        next() ;
    }catch(error){
        return next(error) ;
    }
}

// EDIT USER
const editUser = async(req,res,next)=>{
    try{
        const user  = await User.findByIdAndUpdate(req.params.id, req.body, {new : true}) ;
        res.status(200).json({
            success : true, 
            user
        })
        next() ;
    }catch(error){
        return next(error) ;
    }
}

// DELETE USER
const deleteUser = async(req,res,next)=>{
    try{
        const user  = await User.findByIdAndDelete(req.params.id) ;
        res.status(200).json({
            success : true, 
            message : "User deleted successfully"
        })
        next() ;
    }catch(error){
        return next(error) ;
    }
}

// JOB HISTORY USER
const createUserJobsHistory = async(req,res,next)=>{
    const { title, description, salary, location } = req.body ;

    try{
        const currentUser  = await User.findOne({_id : req.user._id}) ;
        if ( !currentUser){
            return next( new ErrorResponse("You must log in ", 401))
        }else{
            const addJobHistory = {
                title, 
                description,
                salary,
                location,
                user: req.user._id
            }

            currentUser.jobHistory.push(addJobHistory) ;
            await currentUser.save() ;
        }
        res.status(200).json({
            success : true, 
            currentUser,
        })
        next() ;
    }catch(error){
        return next(error) ;
    }
}

export {allUsers, singleUser, editUser, deleteUser, createUserJobsHistory}

