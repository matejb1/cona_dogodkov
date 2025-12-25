const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

const eventsRouter = require('./routes/eventsRoutes');
const loginRouter = require('./routes/loginRoutes');

app.use(cors());
app.use(express.json());
app.use("/api/events", eventsRouter);
app.use("/api/login", loginRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
