


const errorHandler = (err,req,res) =>{
    let statusCode = err.statusCode ||500;
    let message =err.message
|'internal server error';

//mongoose validation error
if(err.name==='ValidationError'){
    statusCode=400;
    message= Object.values(err.errors).map(error=>error.message).join(',')
}

//mongoose duplicate error

if(err.code===11000){
    statusCode=400;
    message='Duplicate Field value enterd'
}

//JWT

if(err.name==='JsonWebTokenError'){
    statusCode=401;
    message='Invalid Token'
}

if(err.name==='TokenExpiredError'){
    statusCode=401;
    message=' Token Expired'
}

console.error('Error',err);


res.status(statusCode).json({
    success:false,
    error:message,
})
}


export default errorHandler