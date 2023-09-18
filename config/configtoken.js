var jwt = require('jsonwebtoken');

class ConfigToken {
    key = "sslzr2023!"
    constructor() {}

    setToken({
        userId = "",
        userName = "",
        userEmail = ""
    }) {
        try {
            let token = jwt.sign({
                userId: userId,
                userName: userName,
                userEmail: userEmail
            }, this.key);
            return token
        } catch (error) {
            throw "failed set token"
        }
    }
    decodeToken(token = "") {
        try {
            let decoded = jwt.verify(token, this.key);
            return decoded
        } catch (error) {
            throw "failed decode token"
        }
    }
}

module.exports = ConfigToken
