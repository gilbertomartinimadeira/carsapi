const crypto = require("crypto");
var router = require('express').Router();
var bodyParser = require('body-parser');

var cars = [];

router.use(bodyParser.json());

router.use((req,res,next) =>{
	var message = 'requisição recebida em '+ new Date();
	console.log(message);
	next();
});

/* #swagger.responses[200] = { 
                    description: 'User successfully obtained.',
                    schema: { $ref: "#/definitions/User" } 
} */
router.get('/:id?', (req,res) => {
	var idParam = req.params.id;
	if(idParam){
		console.log('requisitando o carro com id ' + idParam);
		selectedCar = cars.filter(c => c.id === idParam);
		res.send(selectedCar);
		return;
	}
	var nameFromQuery = req.query.name;
	if(nameFromQuery){
		var filteredCars = cars.filter(c => c.name.startsWith(nameFromQuery));
		res.send(filteredCars);
		return;
	}

	res.send(cars);
});


router.post('/', (req, res) => {
	var postedCar = req.body;

	postedCar.name = postedCar.name.toLowerCase();
	var carAlreadyExists = cars.some(c => c.name === postedCar.name);

	if(carAlreadyExists){
		res.sendStatus(409);
		return;
	}
	const id = crypto.randomBytes(16).toString("hex");
	console.log(id); 

	postedCar.id = id;
	cars.push(postedCar);
	res.status(201).send(postedCar);
});

module.exports = router;
