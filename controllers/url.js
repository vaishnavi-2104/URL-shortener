const shortid = require("shortid");
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortId = shortid.generate();
    await URL.create({
        shortId: shortId,
        redirectId: body.url,  // Fix typo from `body.URL` to `body.url`
        visitHistory: [],
    });
    return res.render("home",{
        id: shortId 
    })


}

module.exports = {
    handleGenerateNewShortURL,
};
