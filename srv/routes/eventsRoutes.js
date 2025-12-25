
const express = require('express');
const timers = require("node:timers");
const router = express.Router();

const data = [
    {
        id: 1,
        name: "Nogomet: NK Olimpija Ljubljana vs. NK Maribor",
        date: "2026-01-17 19:00:00",
        location: "Arena Stožice"
    },
    {
        id: 2,
        name: "Gledališka predstava: Fantom iz veselice",
        date: "2026-04-01 18:00:00",
        location: "Cankarjev dom (Ljubljana)"
    },
    {
        id: 3,
        name: "Koncert: Gabry Ponte",
        date: "2025-08-29 20:00:00",
        location: "Arena Bonifika (Koper)"
    },
    {
        id: 4,
        name: "F1: Grand prix of Max Verstappen",
        date: "2026-07-16 18:00:00",
        location: "Le Mans, Francija"
    }
];


router.get('/', (req, res) => {
    setTimeout(function(){res.json(data)}, 2000);
    // setTimeout(function(){res.json([])}, 2000);
    // res.json(data)
})

module.exports = router;