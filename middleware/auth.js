import ErrorResponse from "../utils/errorResponse.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


// CHECK IS USER IS AUTHENTICATED

const isAuthenticated = async(req,res,next)=>{
    const {token} = req.cookies ;

    if ( !token ){
        return next(new ErrorResponse("Not authorized to access this route", 401))
    }

    try{
        // VERIFY TOKEN
        const decoded = jwt.verify( token, process.env.JWT_SECRET) ;
        req.user = await User.findById( decoded.id) ;
        next() ;
    }catch(error){
        return next( new ErrorResponse("Not autoorized for this route", 401))
    }
}

const isAdmin = (req,res,next)=>{
    if ( req.user.role === 0 ){
        return next(new ErrorResponse("Access denied, you must be Admin", 401))
    }
    next() ;
}

export default isAuthenticated ;
export {isAdmin} ;