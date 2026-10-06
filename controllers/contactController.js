const contactService = require("../services/contactService");


// CREATE CONTACT

const createContact = async (req, res, next) => {

    try {

        const contact =
            await contactService.createContact(req.body);

        res.status(201).json({
            success: true,
            message: "Contact created successfully",
            data: contact
        });

    } catch (error) {

        next(error);
    }
};


// GET ALL CONTACTS

const getContacts = async (req, res, next) => {

    try {

        const {
            search = "",
            sortBy = "id",
            order = "asc",
            page = 1,
            limit = 10
        } = req.query;


        const contacts =
            await contactService.getContacts({
                search,
                sortBy,
                order,
                page: Number(page),
                limit: Number(limit)
            });


        res.status(200).json({
            success: true,
            message: "Contacts retrieved successfully",
            page: Number(page),
            limit: Number(limit),
            count: contacts.length,
            data: contacts
        });

    } catch (error) {

        next(error);
    }
};


// GET CONTACT BY ID

const getContactById = async (req, res, next) => {

    try {

        const { id } = req.params;

        const contact =
            await contactService.getContactById(id);


        if (!contact) {

            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }


        res.status(200).json({
            success: true,
            data: contact
        });

    } catch (error) {

        next(error);
    }
};


// UPDATE CONTACT

const updateContact = async (req, res, next) => {

    try {

        const { id } = req.params;

        const existingContact =
            await contactService.getContactById(id);


        if (!existingContact) {

            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }


        await contactService.updateContact(
            id,
            req.body
        );


        const updatedContact =
            await contactService.getContactById(id);


        res.status(200).json({
            success: true,
            message: "Contact updated successfully",
            data: updatedContact
        });

    } catch (error) {

        next(error);
    }
};


// DELETE CONTACT

const deleteContact = async (req, res, next) => {

    try {

        const { id } = req.params;

        const result =
            await contactService.deleteContact(id);


        if (result.affectedRows === 0) {

            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }


        res.status(200).json({
            success: true,
            message: "Contact deleted successfully"
        });

    } catch (error) {

        next(error);
    }
};


module.exports = {
    createContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact
};