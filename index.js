require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const rateLimit = require('express-rate-limit');
const DBConnection = require('./config/sequelize')
const cors = require('cors')

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "Please try again later!"
})

// app.use(limiter)
const whitelist = ['http://localhost:3001']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
DBConnection.connection()
app.use(express.json())
app.use(cors())

const v1route = './routes/v1'; // Directory where your route files are stored
fs.readdirSync(v1route).forEach((file) => {
    const routePath = path.join(v1route, file);
    const parts = routePath.split('/');
    const fileNameWithExtension = parts[parts.length - 1];
    const fileName = fileNameWithExtension.split('.')[0];
    const route = require(`./${routePath}`);
    app.use(`/v1/${fileName}`,route);
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
