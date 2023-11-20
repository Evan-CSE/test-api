import { UserDTO } from "../Interface/Auth.Interface"
import { authUserModel } from "../Model/Auth.Model"


const createUser = async (user: UserDTO) => {
    const result = await authUserModel.create(user);
    return result;
}

export const authService = {
    createUser
};