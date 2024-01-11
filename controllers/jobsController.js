import Job from '../models/jobModel.js'
import JobTypeModel from '../models/jobTypeModel.js';

// CREATE JOB 
const createJob = async(req,res,next)=>{
    try{
        const job = await Job.create({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            location: req.body.location,
            jobType: req.body.jobType,
            user:req.user.id
        }) ;
        res.status(201).json({
            success:true,
            job
        })
    }catch(error){
        next(error) ;
    }
}

// SINGLE JOB 
const singleJob = async(req,res,next)=>{
    try{
        const job = await Job.findById(req.params.id) ;
        res.status(200).json({
            success:true,
            job
        })
    }catch(error){
        next(error) ;
    }
}

// UPDATE JOB 
const updateJob = async(req,res,next)=>{
    try{
        const job = await Job
                            .findByIdAndUpdate(req.params.job_id, req.body, {new:true})
                            .populate('jobType','jobTypeName')
                            .populate('user','firstName lastName')
        res.status(200).json({
            success:true,
            job
        })

    }catch(error){
        next(error) ;
    }
}

// SHOW JOBS 
const showJobs = async(req,res,next)=>{
    // ENABLE SEARCH QUERY
    const keyword = req.query.keyword ? {
        title:{
            $regex: req.query.keyword,
            $options: 'i'
        }
    }:{}

    // FILTER BY CATEGORY
    let ids = [];
    const jobTypeCategory = await JobTypeModel.find({},{_id:1})
    jobTypeCategory.forEach(cat=>{
        ids.push(cat._id) ;
    })

    let cat = req.query.cat;
    let categ = cat !== '' ? cat : ids ;

    // FILTER BY LOCATION
    let locations = [] ;
    const jobByLocation = await Job.find({},{location:1}) ;
    jobByLocation.forEach(val=>{
        locations.push(val.location) ;
    })

    let setUniqueLocation = [...new Set(locations)] ;
    let location = req.query.location ;
    let locationFilter = location !== '' ? location : setUniqueLocation ;

    // ENABLE PAGINATION
    const pageSize = 5 ;
    const page = Number(req.query.pageNumber) || 1;
    // const count = await Job.find({}).estimatedDocumentCount() ;
    const count = await Job.find({...keyword, jobType: categ, location :locationFilter }).countDocuments() ;

    try{
        const jobs = await Job.find({...keyword, jobType: categ, location :locationFilter })
                              .populate('jobType', 'jobTypeName')
                              .populate('user', 'firstName')
                              .sort({createdAt:-1})
                              .skip(pageSize*(page-1))
                              .limit(pageSize)
        
        
        res.status(200).json({
            success:true,
            jobs,
            page,
            pages:Math.ceil(count/pageSize) ,
            count,
            setUniqueLocation
        })

    }catch(error){
        next(error) ;
    }
}

export {createJob, singleJob, updateJob, showJobs} ;