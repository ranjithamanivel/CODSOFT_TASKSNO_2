//const { error } = require("node:console");

const errorMiddleware = (err, req, res, next) => {

    //console.error(err);
     console.error("========== ERROR ==========");
    console.error("Message:", err.message);
    console.error("Code:", err.code);
    console.error("SQL:", err.sql);
    console.error("Stack:", err.stack);
    console.error("===========================");


    // Duplicate entry
    if (err.code === "ER_DUP_ENTRY") {

        return res.status(409).json({
            success: false,
            message: "A contact with the same email or phone already exists"
        });
    }


    res.status(500).json({
        success: false,
        message: "Internal server error",
        error:err.message
    });
};

module.exports = errorMiddleware;