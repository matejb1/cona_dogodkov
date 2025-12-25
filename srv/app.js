const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

const eventsRouter = require('./routes/eventsRoutes')

app.use(cors())

app.use("/api/events", eventsRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
