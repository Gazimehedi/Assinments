const {body, validationResult} = require('express-validator');

const userValidation = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username name is require"),
    body("email")
        .notEmpty()
        .withMessage("Email is required"),
    body("email")
        .isEmail()
        .withMessage("Email is invalid")
        .normalizeEmail(),
    body("age")
        .notEmpty()
        .withMessage("Age is required"),
    (req, res, next) => {
        const errors = validationResult(req).formatWith(({ msg }) => msg);
        if (!errors.isEmpty())
            return res.status(400).json({ status:"error", message: errors.array()[0] });
        next();
    },
];

module.exports = userValidation;