import express from 'express' ;
import { signup, signin, logout, userProfile } from '../controllers/authController.js';
import isAuthenticated from '../middleware/auth.js';

const router = express.Router() ;


        // AUTH ROUTES  
// SIGNUP
router.post('/signup', signup)
// SIGNIN
router.post('/signin', signin)
// LOGOUT
router.get( '/logout', logout) ;
// ME
router.get( '/me',isAuthenticated, userProfile)

export default router ;

