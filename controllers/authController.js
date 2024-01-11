import User from "../models/userModel.js";
import ErrorResponse from "../utils/errorResponse.js";

const signup = async(req,res,next)=>{
    const {email} = req.body ;
    const userExist = await User.findOne({email:email}) ;
    if ( userExist ){
        return next( new ErrorResponse("E-mail already registered",400)) ;
    }

    try{
        const user =await User.create(req.body) ;
        res.status(201).json({
            success: true,
            user
        })
    }catch( error ){
        next(error) ;
    }
}

const signin = async(req,res,next)=>{
    try{
        const {email, password} = req.body ;
        // VALIDATION
        if ( !email ){
            return next ( new ErrorResponse("Please add an email", 403)) ;
        }

        if ( !password ){
            return next( new ErrorResponse("Please add password ", 403)) ;
        }

        // CHECK USER EMAIL
        const user = await User.findOne({email:email}) ;
        if ( !user ){
            return next( new ErrorResponse("Invalid credentials ", 403)) ;
        }

        // CHECK PASSWORD
        const isMatched = await user.comparePassword(password) ;
        if ( !isMatched){
            return next( new ErrorResponse("Invalid credentials", 400)) ;
        }

        sendTokenResponse(user, 200, res) ;
    }catch( error ){
        next(error) ;
    }
}

const logout = async(req,res,next)=>{
    res.clearCookie('token'); 
    res.status(200).json({
        success : true,
        message: "Logged Out" 
    })
}

const userProfile = async(req,res,next)=>{
    const user = await User.findById(req.user.id).select('-password') ;
    res.status(200).json({
        success : true,
        user
    })
}



const sendTokenResponse = async(user, codeStatus, res)=>{
    const token = await user.getJwtToken() ;
    res.status(codeStatus)
    .cookie('token', token, { maxAge: 60*60*1000, httpOnly : true}) 
    .json({ 
        sucess : true, 
        role : user.role
    })
}

export {signup, signin, logout, userProfile} ;