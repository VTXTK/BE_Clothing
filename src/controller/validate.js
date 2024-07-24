const { body } = require('express-validator');
const validateUserInputs = [
    body('email').isEmail().withMessage('Email không hợp lệ'),
    body('password').notEmpty().withMessage('Password không được để trống'),
    body('phoneNumber').isMobilePhone('vi-VN').withMessage('Số điện thoại không hợp lệ'),
];
module.exports = validateUserInputs;
