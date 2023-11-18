import { Schema, model } from "mongoose";
import { UserDTO } from "./Auth.Interface";

const authUserSchema = new Schema <UserDTO>({
    id:                {type: Number, required: true},
    email:             {type: String, required: true},
    persmissionLevels: {type: Array}
});

export const authUserModel = model<UserDTO>('UserTest', authUserSchema);