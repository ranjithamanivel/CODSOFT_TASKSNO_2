const express = require("express");

const router = express.Router();

const contactController =
    require("../controllers/contactController");

const validateRequest =
    require("../middleware/validationMiddleware");

const {
    contactValidation,
    idValidation,
    queryValidation
} = require("../validators/contactValidator");


// CREATE CONTACT

router.post(
    "/",
    contactValidation,
    validateRequest,
    contactController.createContact
);


// GET ALL CONTACTS

router.get(
    "/",
    queryValidation,
    validateRequest,
    contactController.getContacts
);


// GET CONTACT BY ID

router.get(
    "/:id",
    idValidation,
    validateRequest,
    contactController.getContactById
);


// UPDATE CONTACT

router.put(
    "/:id",
    idValidation,
    contactValidation,
    validateRequest,
    contactController.updateContact
);


// DELETE CONTACT

router.delete(
    "/:id",
    idValidation,
    validateRequest,
    contactController.deleteContact
);


module.exports = router;