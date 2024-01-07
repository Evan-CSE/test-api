import bcrypt from 'bcrypt';
import config from '../config';
import jsonwebtoken from 'jsonwebtoken'
import { UserDTO } from '../Interface/Auth.Interface';
import { UserSession } from '../Model/UserSession.Model';

export const generateToken = (userData: UserDTO): UserSession=> {
    const payload = {
        userEmail      : userData.email,
        permissionLevel: userData.persmissionLevels
    };

    const token = jsonwebtoken.sign(payload, config.JWT_SECRET_KEY as string, {
        expiresIn: '1h'
    });

    return {token: token};
}

export const generatePasswordHash = async (password: string) => {
    const hashedPass = await bcrypt.hash(password, Number(config.HASH_SALT_ROUND) ?? 4);
    return hashedPass;
};