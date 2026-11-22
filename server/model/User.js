import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema ({
    name:{
        type:String,
        required:[true,'Plese provide name'],
        trim:true,
        maxlength:[50,'name  should be less than 50 charectres']
    },

    email:{
        type:String,
        required:[true,'plese provide email'],
        trim:true,
        unique:true,
        lowercase:true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
        
    },
    password:{
        type:String,
        required:[true,'plese provide a password'],
        minlength:[6,'pasword should be strrong'],
        select:false,
    }

},{
    timestamps:true
}) 

//hash the pasword before saving in the database

userSchema.pre('save', async function(){
    if(!this.isModified('password')){
        return;

    }

    const salt=await bcryptjs.genSalt(12);
    this.password = await bcryptjs.hash(this.password,salt);
    
})

//yha methods ho skta hai agr error aaya to
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcryptjs.compare(enteredPassword,this.password);

}
export default mongoose.model('User',userSchema);
