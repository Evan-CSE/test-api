const static_crypto = require("static-crypto")
const user_password = "1447";

let sensitive_data = 
    "971ee50e74e79c10082426a3d7db60b2a3cae6a495295c6e28fec852c2fd7a37a5";

const systemAdmin = {
    user_password,
    sensitive_data
};

module.exports = systemAdmin;