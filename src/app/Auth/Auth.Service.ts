import { UserDTO } from "./Auth.Interface"
import { authUserModel } from "./Auth.Model"


const createUser = async (user: UserDTO) => {
    const result = await authUserModel.create(user);
    return result;
}

export const authService = {
    createUser
};