import ErrorResponse from '../utils/errorResponse.js' ;

const ErrorHandler = (err,req,res,next)=>{
    let error = {...err} ;
    error.message = err.message ;

    if ( err.name === "CastError" ){
        const message = `Resource not found ${err.value}` ;
        error = new ErrorResponse(message,404) ;
    }

    // MONGOOSE DUPLICATE VALUE
    if ( err.code === 11000 ){
        const message = `Duplicate field value entered` ;
        error = new ErrorResponse(message,400) ;
    }

    // MONGOOSE VALIDATION
    if ( err.name === "ValidationError" ){
        const message = Object.values(err.errors).map(val => ` ` + val.message) ;
        error = new ErrorResponse(message,400) ;
    }

    res.status(error.codeStatus || 500 ).json({
        success : false,
        error : error.message || 'server error'
    })
}

export default ErrorHandler ;