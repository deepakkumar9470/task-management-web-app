import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    name  : {
        type: String,
        required: true
    },
    email  : {
        type: String,
        required: [true, 'Please enter email'],
        unique :true,
        lowercase : true,
    },
    password  : {
        type: String,
        required: [true, 'Please enter a valid password'],
        
    },
   
},{timestamps : true})



UserSchema.methods.matchPassword =  async function(userPassword){
    return await bcrypt.compare(userPassword,this.password)
}

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;

