import express from 'express' ;
import isAuthenticated, { isAdmin } from '../middleware/auth.js';
import { createJob, showJobs, singleJob, updateJob } from '../controllers/jobsController.js';

const router = express.Router() ;

        // JobType ROUTES  ;
// CREATE JOB
router.post( '/job/create',isAuthenticated, isAdmin, createJob);

// GET SINGLE JOB
router.get( '/job/:id', singleJob);

// UPDATE SINGLE
router.put( '/job/update/:job_id',isAuthenticated, isAdmin, updateJob);

// SHOW JOBS
router.get( '/jobs/show', showJobs);


export default router ;

