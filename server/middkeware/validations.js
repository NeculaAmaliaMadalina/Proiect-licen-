const { check, validationResult } = require('express-validator');
const httpStatus = require('http-status');

const addProductValidator = [
    check('name')
        .trim().not().isEmpty().withMessage('You need to add a name').bail()
        .isLength({min:3}).withMessage('You need minimum 3 characters').bail(),
    check('brand')
        .trim().not().isEmpty().withMessage('You need to add a brand'),
    (req, res, next)=> {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(httpStatus.BAD_REQUEST).json({
                errors: errors.array()
            })
        }
        next();
    }


];



module.exports = {
    addProductValidator
}