import express from 'express' ;
import isAuthenticated, { isAdmin } from '../middleware/auth.js';
import {allJobsType, createJobType, deleteJobType, updateJobType} from '../controllers/jobTypeController.js';

const router = express.Router() ;


        // JobType ROUTES  ;
// CREATE JOB TYPE
router.post( '/type/create',isAuthenticated, isAdmin, createJobType)
// GET JOB TYPE
router.get( '/type/jobs', allJobsType) ;
// UPDATE JOB TYPE
router.put( '/type/update/:type_id',isAuthenticated, isAdmin, updateJobType) ;
// DELETE JOB TYPE
router.delete( '/type/delete/:type_id',isAuthenticated, isAdmin, deleteJobType) ;


export default router ;

