const express = require("express");
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const router = require("./src/router/index");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require('node-cron');
const user = require("./src/model/user");

app.use(cors());
const dburi = process.env.mongoDbUrl;

let isConnected; // Track connection status

async function connectDB() {
    if (isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }

    try {
        await mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true });
        isConnected = true; // Mark as connected
        console.log("Mongo Connected");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

connectDB(); // Call the async function to connect to the DB

app.use(express.json()); // Middleware for parsing JSON bodies
app.use("/api/v1", router); // Define your routes

// Test route
app.get("/", (req, res) => {
    res.send("This is for testing purposes");
});

// Start the server
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

// Cron job for marking users as inactive
cron.schedule('*/5 * * * *', async () => {
    const now = new Date();
    console.log("Running 5-minute inactivity check");

    const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000); 

    try {
        const result = await user.updateMany(
            { lastActive: { $lt: thirtyMinutesAgo }, status: 'active' },
            { $set: { status: 'inactive' } }
        );

        console.log(`Marked ${result.nModified} users as inactive`);
    } catch (error) {
        console.error('Error marking users as inactive:', error);
    }
});
