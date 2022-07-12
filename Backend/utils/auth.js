let jwt = require('jsonwebtoken');

class Authentication {
    constructor() {
        this.secertKey = process.env.SECRET_KEY;
    }
    
    createAccessToken(data) {
        const payload = {
            sub: data,
            iat: Date.now()
        }
        const token = jwt.sign(payload, this.secertKey, {expiresIn: "24h"})
        return token;
    }

    verifyAccessToken(token) {
        try {
            let data = jwt.verify(token, this.secertKey);
            return data.sub;
        } catch(e) {
            return null;
        }
    }
}

module.exports = Authentication;