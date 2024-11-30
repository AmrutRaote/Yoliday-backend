// index.js
const cors = require('cors');
const express = require('express');
const data = require('./data/data.json');
const { asyncHandler } = require('./utils/asyncHandler');
const { Apierror } = require('./utils/Apierror');
const { ApiResponse } = require('./utils/ApiRespose');
require('dotenv').config();

const app = express()
const PORT = 8000

app.use(cors({
    origin: true,
    credentials: true
}))

app.listen(PORT, () => {
    console.log(`API listening on PORT ${PORT} `)
})

// app.get('/', (req, res) => {
//     res.send('Hey this is my API running 12345 🥳')
// })

app.get("/", asyncHandler(async(req, res) => {
    if (!data) {
        throw new Apierror(404, "Data not found")
    }
    return res.status(200)
        .json(new ApiResponse(200, data, "data fetched successfully"))
}))

app.get('/about', (req, res) => {
    res.send('This is my about route..... ')
})

// Export the Express API
module.exports = app