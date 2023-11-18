const isValidMail = (email: string) : boolean => {
    const emailRegex     = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    const maybeValidMail = emailRegex.test(email);
    
    if (!email || email.length > 254 || !maybeValidMail) {
        return false;
    }
    
    const splittedMail = email.split('@');
    const userName     = splittedMail[0];
    const domainName   = splittedMail.length > 1 ? splittedMail[1] : '';

    return (
        userName.length <= 254 
        && !!domainName 
        && domainName.length <= 254
    );
}

const isValidUserName = (userName: string) : boolean => {
    return (
        !!userName
        && userName.length <= 32
    );
}

export const Validator = {
    isValidMail,
    isValidUserName
}