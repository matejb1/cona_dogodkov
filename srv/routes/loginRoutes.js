const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cors = require("cors");

// This whole backend is mock. Never do this on production!

const SECRET = "aZSfMu8cHkn73k6tSqvTHLRwFBXD52TidrEuu1xeB9qxT09AUfSPcTaRuzLWB7D2";


const dbUsers = {
    marjan123: {
        username: "marjan123",
        password: "test1234",
        email: "marjan@example.com"
    },
    franci: {
        username: "franci",
        password: "test1234",
        email: "franci.na-balanci@example.com"
    },
}




router.post("/", (req, res) => {
    let data = req.body;

    if (dbUsers[data.username] === undefined || dbUsers[data.username].password !== data.password) {
        setTimeout(function(){
            res.status(500);
            res.json({
                message:"Login failed."
            });
        }, 2000);
        return;
    }

    let user = dbUsers[data.username]


    const payload = {
        username: user.username,
        email: user.email,
    };
    const token = jwt.sign(payload, SECRET, {
        expiresIn: '60m'
    });

    setTimeout(function(){res.json({token: token})}, 2000);
    // res.json({token: token});
})

module.exports = router;