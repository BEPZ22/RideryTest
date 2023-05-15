const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectionManager = require('./connection')
const indexRouter = require('./routes/index');
const tradesRouter = require('./routes/trades');
const cors = require("cors")

const app = express();
connectionManager.getConnection();

// view engine setup
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: '*',
    credentials: true
}));

app.use('/trades', tradesRouter);
app.use('/', indexRouter);

app.listen(3000, () => {
    console.log("App listen in 127.0.0.0:3000")
});
module.exports = app;
