var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./index');
var usersRouter = require('./routes/users');
var usuarioRoutes = require('./routes/usuarioRoutes');
var tareaRoutes = require('./routes/tareaRoutes');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api', usuarioRoutes);
app.use('/api', tareaRoutes);

//const PORT = process.env.PORT || 3001;
//app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

module.exports = app;
