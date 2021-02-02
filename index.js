var express = require('express');
var app = new express();
var carRoutes = require('./routes/car-routes');

app.use('/cars', carRoutes);

app.listen(5000,() => {
	console.log('listening to port 5000');
});
