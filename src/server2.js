const systemAdmin   = require('./system');
const static_crypto = require('static-crypto');

let decryption =
    static_crypto.decrypt(
        systemAdmin.user_password,
        systemAdmin.sensitive_data
    );
    
console.log(decryption);