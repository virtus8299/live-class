import express from 'express';
import {body,validationResult} from 'express-validator';
import {getSession,createSession,leaveSession,endSession,JoinSession,listSession} from '../controllers/sessionControllers.js';
import {protect} from '../middleware/auth.js';


const router = express.Router();


const handleValidationError = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            success:false,
            error:errors.array()[0].msg
        })
    }

    next();
}


router.use(protect)


router.get('/list',listSession)

router.post('/create',createSession)

router.post(
    '/join',
    [
        body('roomId')
        .trim()
        .notEmpty()
        .withMessage('RoomId is required'),
    ],
    handleValidationError,
    JoinSession
)


router.get('/:roomId',getSession)


router.post('/end/:sessionId',endSession)


router.post(
    '/leave',
    [
        body('roomId')
        .trim()
        .notEmpty()
        .withMessage('RoomId is required'),
    ],
    handleValidationError,
    leaveSession
)


export default router;