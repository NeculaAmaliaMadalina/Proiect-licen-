const passport = require('passport');
const {ApiError} = require('./apiError');
const httpStatus = require('http-status');
const {roles} = require('../config/roles');

const verify = (req, res, resolve, reject, rights) => async(err,user) => {
    if(err || !user){
        return reject(new ApiError(httpStatus.UNAUTHORIZED,'Sorry, unauthorized'));

    }
    req.user = user;
    if(rights.length){
        const action = rights[0]
        const resources  = rights[1]
        const permission = roles.can(req.user.role)[action](resources);
        if(!permission.granted){
            return reject(new ApiError(httpStatus.FORBIDDEN,"Sorry, you don't have enough rights"));
        }
        res.locals.permission = permission;
    }

    resolve();
}
const auth = (...rights) => async(req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt',{session:false}, verify(req, res, resolve, reject,rights))(req, res, next);
        
    })
    .then(()=> next())
    .catch((err)=>next(err))
}

module.exports = auth;