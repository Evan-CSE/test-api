export type UserDTO = {
    userName:           string;
    email:              string,
    password:           string;
    verified:           boolean,
    verificationToken:  string,
    persmissionLevels?: number[]
};