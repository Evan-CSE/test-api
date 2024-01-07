import { Schema, model } from "mongoose";
import { UserDTO } from "../Interface/Auth.Interface";

const userSchema = new Schema <UserDTO>({
    userName:          {type: String, required: true},
    email:             {type: String, required: true},
    password:          {type: String},
    verified:          {type: Boolean, default: false},
    verificationToken: {type: String, required: true},
    persmissionLevels: []
});

export const userModel = model<UserDTO>('UserTest', userSchema);