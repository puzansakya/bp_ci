import * as _ from "lodash";
const decodeJwt = require('./Token.middleware').decodeJwt;

export class AuthenticaitonMiddleware {

    async checkIfAuthenticated(req, res, next) {
        const jwt = req.headers.authorization.split(" ")[1];        

        if (jwt) {
            try {
                const payload = await decodeJwt(jwt);
                req["user"] = payload;                
                next()
            }
            catch (err) {                
                next();
            }           
        }
        else {
            res.sendStatus(403);
        }
    }

    checkIfAuthorized(allowedRoles, req, res, next) {
        const userInfo = req['user'];        
        const roles = _.intersection(userInfo.roles, allowedRoles);
        if (roles.length > 0) {
            next();
        }
        else {
            res.sendStatus(403);
        }
    }
}

export default new AuthenticaitonMiddleware();
