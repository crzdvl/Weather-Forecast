const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');

module.exports = {
    /**
     * @function
     * @description express middleware
     * @param {express.Application} app
     * @returns void
     */
    init(app) {
        require('dotenv').config();
        app.use(
            bodyParser.urlencoded({
                extended: true,
            }),
        );
        app.use(bodyParser.json());
        // connect static file
        app.use(express.static('public'));
        // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
        app.use(cookieParser());
        // returns the compression middleware
        app.use(compression());
        // helps you secure your Express apps by setting various HTTP headers
        app.use(helmet());
        // providing a Connect/Express middleware that
        // can be used to enable CORS with various options
        app.use(cors());
        // cors
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
            res.header('Access-Control-Allow-Credentials', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With,'
                + ' Content-Type, Accept,'
                + ' Authorization,'
                + ' Access-Control-Allow-Credentials',
            );
            next();
        });
        // configuration for ejs
        app.set('views', './src/views');
        app.set('view engine', 'ejs');
        // configuration for static files
        app.use(express.static(`${__dirname}/../content`));
    },
};
