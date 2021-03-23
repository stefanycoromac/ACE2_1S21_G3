const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const indexRouter = require('./routes/index.route');
const heartRateRouter = require('./routes/heartRate.route');
const temperatureRouter = require('./routes/temperature.route');
const oxygenRouter = require('./routes/oxygen.route');
const userRouter = require('./routes/user.route');
const speedRouter = require('./routes/speed.route');
const distanceRouter = require('./routes/distance.route');
const courseNavetteRouter = require('./routes/courseNavette.route');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(morgan('dev'));
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({
    // application/x-www-form-urlencoded
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Routes 
app.use('/', indexRouter);
app.use('/heart-rate', heartRateRouter);
app.use('/temperature', temperatureRouter);
app.use('/oxygen', oxygenRouter);
app.use('/user', userRouter);
app.use('/speed', speedRouter);
app.use('/distance', distanceRouter);
app.use('/course-navette', courseNavetteRouter);

// Port assignment
app.listen(PORT, () => {
    console.log(`App listening on port ${ PORT }`);
});

// Catch 404
app.use((req, res, next) => {
    res.status(404).send({
        Error: 404,
        Descripcion: 'Pagina no encontrada'
    });
    // res.status(404).sendFile(__dirname + "/public/404.html"); 
    // next(createError(404));
});