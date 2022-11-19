import jwt from 'jwt-simple';
import config from '../config';

export default {
    generateToken: function (user) {
        const timeStamp = new Date().getTime();
        const payload = {
            sub: user.id,
            iat: timeStamp
        }
        return jwt.encode(payload, config.jwt_secret);
    },
    verifyToken: function (token, cb) {
        return token === '1234';
    }
}