import express from 'express';
import {body,ExpressValidator, validationResult} from 'express-validator'
import { BSON } from 'mongodb';
import { getMe, login, register } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router =express.Router();


//valiation middleware

const handleValidationError =(req,res,next)=>{
    const errors =validationResult(req);
    if(!errors.isEmpty()){
    return res.status(400).json({
        success:false,
        error:errors.array()[0].msg
    }) 
}
    next();
}

//post /api/auth/register 

router.post(
    '/register',
    [
        body('name')
        .trim()
        .isLength({min:2,max:50})
        .withMessage('name must be between 2 and 50 chatecters '),
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please provise a valid email'),
            body('password')
            .isLength({min:6})
            .withMessage('Password must be at least 6 ')
        

    ],
    handleValidationError,
    register
)


//post req for login

router.post(
    '/login',
    [
        
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please provise a valid email'),
            body('password')
            .isLength({min:6})
            .withMessage('Password must be at keast 6 ')
        

    ],
    handleValidationError,
    login
)

//GET /api/auth/me
router.get('/me',protect,getMe)

export default router;
