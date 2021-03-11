const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/car-routes.js']

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./index.js')
})