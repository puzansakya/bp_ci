import _ = require('lodash');

exports.checkIfAuthorized = (allowedRoles, req, res, next) => {

    const userInfo = req['user'];    

    const roles = _.intersection(userInfo.roles, allowedRoles);

    if (roles.length > 0) {        
        next();
    }
    else {                
        res.sendStatus(403);
    }
}