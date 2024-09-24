const express = require("express");
const app = express();
const path =  require('path'); ///module built in for path 
const staticRoute = require("./routes/staticRouter")
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");


const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-URL")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("Failed to connect to MongoDB", err));
// express ko bata raha h mera view engine ejs hai aur views ejs ke file is folder pr padhi hai
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({extended:false})); ///Middleware to parse form data 


app.use("/url", urlRoute);
app.use("/",staticRoute);

// In your app.js or main server file
app.get('/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true }
        );

        if (entry) {
            res.redirect(entry.redirectId);
        } else {
            res.status(404).send("URL not found");
        }
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
