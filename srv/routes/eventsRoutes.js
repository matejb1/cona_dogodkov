
const express = require('express');
const timers = require("node:timers");
const router = express.Router();
const dataEventsTypes= [
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

const dataCards = [
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

const dataDetails = [
    {
        id: 1,
        idEventType: 2,
        name: "Nogomet: NK Olimpija Ljubljana vs. NK Maribor",
        date: "2026-01-17",
        time: "19:00:00",
        price: 19.99,
        link: "https://nkolimpija.si/tekme/prva-liga-tekme/",
        summary: "Vsemogočni derbi, ki ga čakamo vsako leto... večkrat.",
        location: "Arena Stožice (Ljubljana)"
    },
    {
        id: 2,
        idEventType: 1,
        name: "Gledališka predstava: Fantom iz veselice",
        date: "2026-04-01",
        time: "18:00:00",
        price: 4.99,
        link: "https://cankarjev-dom.si/ta/mogocni/fantom/iz/veselice",
        summary: "Pridite na najboljšo predstavo vseh časov, ne bo vam žal." +
            "Ker to je Fantom iz veselice. Če nimate karte, jo lahko zadanete na kateremkoli srečolovu na veselici.",
        location: "Cankarjev dom (Ljubljana)"
    },
    {
        id: 3,
        idEventType: 5,
        name: "Koncert: Gabry Ponte",
        date: "2025-08-29",
        time: "20:00:00",
        location: "Arena Bonifika (Koper)",
        price: 30.0,
        link: "https://www.eventim.si/artist/gabry-ponte/",
        summary: "Felicita",
    },
    {
        id: 4,
        idEventType: 2,
        name: "F1: Grand prix of Max Verstappen",
        date: "2026-07-16",
        time: "18:00:00",
        price: 60.0,
        summary: "oui...",
        location: "Le Mans, Francija",
        link: "https://www.24h-lemans.com/en/tickets"
    }
];


router.get('/', (req, res) => {
    setTimeout(function(){res.json(dataCards.slice(-10))}, 2000);
    // setTimeout(function(){res.json([])}, 2000);
    // res.json(data)
})

router.get('/:id', (req, res) => {
    let id = parseInt(req.params['id']);
    var searched;
    for(let item of dataDetails) {
        if(item.id === id) {
            searched = JSON.parse(JSON.stringify(item));

            let nameEventType = dataEventsTypes.find(t => t.id === item.idEventType).name;
            searched.nameEventType = nameEventType;
            break;
        }
    }

    setTimeout(function(){res.json(searched)}, 2000);
    // setTimeout(function(){res.json([])}, 2000);
    // res.json(data)
})


router.post('/search', (req, res) => {

    let filteredItems = [];


    if(!req.body || !req.body.search || req.body.search.trim().length === 0) {
        filteredItems = dataCards;
    }
    else {
        let search = req.body.search.toLowerCase();
        for(let item of dataCards) {
            if(item.name.toLowerCase().includes(search)) {
                filteredItems.push(item);
            }
        }
    }


    setTimeout(function(){res.json(filteredItems.slice(-10))}, 2000);
    // setTimeout(function(){res.json([])}, 2000);
    // res.json(data)
})

router.post('/', (req, res) => {
    if(req.get("Authorization") === undefined || !req.body) {
        res.status(500);
        res.json({message:"Login failed."});
        return;
    }

    let id = dataCards[dataCards.length-1].id + 1;
    req.body.id = id;
    dataDetails.push(req.body);


    dataCards.push({
        id: id,
        name: req.body.name,
        date: req.body.date + " " + req.body.time + ":00",
        location: req.body.location,
    })


    // res.json({status: "OK"})
    setTimeout(function(){res.json({status: "OK"})}, 2000);
})


router.put('/:id', (req, res) => {
    if(req.get("Authorization") === undefined || !req.body) {
        res.status(500);
        res.json({message:"Login failed."});
        return;
    }
    let id = parseInt(req.params['id']);

    for(var i = 0; i < dataDetails.length; i++) {
        if(dataDetails[i].id === id) {
            dataDetails[i] = req.body;

            dataCards[i].date = dataDetails[i].date;
            dataCards[i].name = dataDetails[i].name;
            dataCards[i].location = dataDetails[i].location;
            break;
        }
    }

    if(i === dataDetails.length-1){
        res.status(500);
        res.json({message:"Login failed."});
        return;
    }


    // res.json({status: "OK"})
    setTimeout(function(){res.json({status: "OK"})}, 2000);
})

router.delete('/:id', (req, res) => {
    if(req.get("Authorization") === undefined) {
        res.status(500);
        res.json({message:"Login failed."});
        return;
    }
    let id = parseInt(req.params['id']);

    for(var i = 0; i < dataDetails.length; i++) {
        if(dataDetails[i].id === id) {
            dataDetails.splice(i, 1);
            dataCards.splice(i, 1);
            break;
        }
    }
    if(i === dataDetails.length-1){
        res.status(500);
        res.json({message:"Login failed."});
        return;
    }

    // res.json({status: "OK"})
    setTimeout(function(){res.json({status: "OK"})}, 2000);
})

module.exports = router;