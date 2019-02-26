import * as _ from "lodash";
const decodeJwt = require('./Token.middleware').decodeJwt;

export class AuthenticaitonMiddleware {

    async checkIfAuthenticated(req, res, next) {

        const header = req.headers.authorization;

        if (header) {
            try {
                const jwt = header.split(" ")[1];
                const payload = await decodeJwt(jwt);
                req["user"] = payload;
                next()
            }
            catch (err) {
                next();
            }
        }
        else {
            // res.sendStatus(403);
            next();
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
