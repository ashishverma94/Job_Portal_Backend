import express from 'express' ;
import { allUsers, createUserJobsHistory, deleteUser, editUser, singleUser } from '../controllers/userController.js';
import isAuthenticated, { isAdmin } from '../middleware/auth.js';

const router = express.Router() ;


        // User ROUTES  ;
// ALL USERS
router.get( '/allusers',isAuthenticated, isAdmin, allUsers)
// SINGLE USER
router.get( '/user/:id',isAuthenticated, singleUser)
// EDIT USER
router.put( '/user/edit/:id',isAuthenticated, editUser)
// DELETE USER
router.delete( '/admin/user/delete/:id',isAuthenticated, isAdmin, deleteUser)
// ADD USER HISTORY
router.post( '/user/jobshistory',isAuthenticated, createUserJobsHistory)

export default router ;

