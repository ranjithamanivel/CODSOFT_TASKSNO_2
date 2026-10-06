require("dotenv").config();

const app = require("./app");

const {
    testConnection
} = require("./config/database");


const PORT = process.env.PORT || 3000;


const startServer = async () => {

    try {

        await testConnection();


        app.listen(PORT, () => {

            console.log(
                `Server running on http://localhost:${PORT}`
            );

        });

    } catch (error) {

        console.error(
            "Server failed to start:",
            error.message
        );

        process.exit(1);
    }
};


startServer();