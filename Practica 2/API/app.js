const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const indexRouter = require('./routes/index.route');
const userRouter = require('./routes/user.route');
const testRouter = require('./routes/test.route');
const volumeRouter = require('./routes/volume.route');

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
app.use('/user', userRouter);
app.use('/test', testRouter);
app.use('/volume', volumeRouter);

// Port assignment
app.listen(PORT, () => {
    console.log(`App listening on port ${ PORT }`);
});

// Catch 404
app.use((_req, res, _next) => {
    res.status(404).send({
        Error: 404,
        Descripcion: 'Pagina no encontrada'
    });
});