
const express = require('express');
const timers = require("node:timers");
const router = express.Router();

const data = [
    {
        id: 1,
        name: "Kulturni",
    },
    {
        id: 2,
        name: "Športni",
    },
    {
        id: 3,
        name: "Izobraževalni",
    },
    {
        id: 4,
        name: "Verski",
    },
    {
        id: 5,
        name: "Zabavni",
    }
];


router.get('/', (req, res) => {
    if(req.get("Authorization") === undefined) {
        res.status(500);
        res.json({message:"Login failed."});
        return;
    }
    res.json(data);
})

module.exports = router;