const { body, param, query } = require("express-validator");


// VALIDATE CREATE / UPDATE CONTACT

const contactValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Name must be between 2 and 100 characters"),


    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email"),


    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required")
        .isLength({ min: 10, max: 15 })
        .withMessage("Phone number must be between 10 and 15 digits"),


    body("address")
        .optional()
        .trim()
        .isLength({ max: 255 })
        .withMessage("Address cannot exceed 255 characters"),


    body("company")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Company cannot exceed 100 characters")
];


// VALIDATE ID

const idValidation = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("ID must be a positive integer")
];


// VALIDATE QUERY PARAMETERS

const queryValidation = [

    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be at least 1"),


    query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Limit must be between 1 and 100"),


    query("order")
        .optional()
        .isIn(["asc", "desc", "ASC", "DESC"])
        .withMessage("Order must be ASC or DESC")

];


module.exports = {
    contactValidation,
    idValidation,
    queryValidation
};