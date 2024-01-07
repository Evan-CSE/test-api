import { UserDTO } from "../Interface/Auth.Interface"
import AuthModel from "../Model/Auth.Model";
import { userModel } from "../Model/User.Model"


const createUser = async (user: UserDTO) => {
    try {
        const {password, ...result} = await userModel.create(user);
        return result;
    } catch(error) {
        return error;
    }
}

const emailAlreadyRegistered = async (email: string): Promise<boolean> => {
    try {
        const maybeUser = await userModel.findOne({email: email});
        return !!maybeUser?._id;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const loginRequest = async (user: AuthModel) => {
    try {
        const result = await userModel.findOne({email: user.email, password: user.password});
        return result;
    } catch (err) {
        console.log(err);
        return err;
    }
}

const updateUserInfo = async (user: UserDTO | any) => {
    try {
        const result = await userModel.updateOne({email: user.email}, user);
        if (!result.modifiedCount) {
            console.log("\n\n\nNo valid data found");
        }
    } catch (error) {
        console.log(error);
    }
}

const verifyAccount = async (token: string) => {
    const session = userModel.startSession();

    try {
        (await session).withTransaction(async () => {
            const result = await userModel.findOne({verificationToken: token});
            if (result) {
                result.verificationToken = '';
                result.verified = true;
            }
            await updateUserInfo(result);
            return result;
        })
    } catch (error) {
        return error;
    } finally {
        (await session).endSession();
    }
}

export const authService = {
    createUser,
    emailAlreadyRegistered,
    loginRequest,
    verifyAccount
};