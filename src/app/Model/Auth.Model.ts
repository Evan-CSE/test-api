import { Schema, model } from "mongoose";
import { UserDTO } from "../Interface/Auth.Interface";

const authUserSchema = new Schema <UserDTO>({
    userName:          {type: String, required: true},
    email:             {type: String, required: true},
    verified:          {type: Boolean, default: false},
    persmissionLevels: []
});

export const authUserModel = model<UserDTO>('UserTest', authUserSchema);