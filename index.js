var express = require('express');
var app = new express();
var cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')


var carRoutes = require('./routes/car-routes.js');
app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/cars', carRoutes);

app.listen(5000,() => {
	console.log('listening to port 5000');
});
