import User from "../model/User.js"
import { generateToken } from "../utils/jwt.js";



export const register = async (req,res,next)=>{
    try {
        const{name,email,password}=req.body;
        const userExists= await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                success:false,
                error:'User already exits with this email'
            })
        }


        //create a new user
        const user = await User.create({
            name,
            email,
            password
        })


        //genrate token 

        const token = generateToken(user._id);
        
        res.status(201).json({
            success:true,
            data:{
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email

                },
                token
            },
            message:'user register succesfully'
        })


    } catch (error) {

        next(error)
        
    }
}

export const login = async (req,res,next)=>{
    try {
        const{email,password}=req.body;
        const user=await User.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({
                success:false,
                error:'invalid Email or Password'
            })
        }


        //check if password match

        const isPasswordMatch = await user.matchPassword(password);
        if(!isPasswordMatch){
            return res.status(401).json({
                success:false,
                error:'Invalid email or password '
            })
        }


        //genrate token 

        const token = generateToken(user._id);
        
        res.status(200).json({
            success:true,
            data:{
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email

                },
                token
            },
            message:'user login  succesfully'
        })


    } catch (error) {

        next(error)
        
    }
}


export const getMe = async (req,res,next)=>{
    try {
       const userId = req.user.userId;
       const user = await User.findById(userId);
       
       if(!user){
        return res.status(404).json({
            success:false,
            error:'user not found '
        })
       }

          res.status(200).json({
            success:true,
            data:{
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email

                }
            },
            message:'user get succesfully '
        })
    } catch (error) {

        next(error)
        
    }
}