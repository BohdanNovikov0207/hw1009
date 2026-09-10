const moment = require("moment")
const express = require("express")

const HOST = "localhost"
const PORT = 8000

const app = express()

app.get("/timestamp", (req, res) => {
    const now = moment().format('YYYY-MM-DD HH:mm:ss');

    res.status(200).json({
        date: now
    })
})

app.listen(PORT, HOST, () => {
    console.log("Running")
})