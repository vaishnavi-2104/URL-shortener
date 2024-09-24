


const mongoose = require("mongoose");
async function connectToMongoDB(url) {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

module.exports = {
    connectToMongoDB,
};
