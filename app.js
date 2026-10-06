const express = require("express");
const cors = require("cors");

const contactRoutes =
    require("./routes/contactRoutes");

const errorMiddleware =
    require("./middleware/errorMiddleware");


const app = express();


// MIDDLEWARE

app.use(cors());

app.use(express.json());


// HOME ROUTE

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Contact Management API is running"
    });

});


// CONTACT ROUTES

app.use(
    "/api/contacts",
    contactRoutes
);


// ERROR HANDLING

app.use(errorMiddleware);


module.exports = app;