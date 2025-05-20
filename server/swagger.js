const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'CPMS API',
            version: '1.0.0',
            description: 'XWZ system for managing parkings in Kigali city',
        },
        servers: [{
        url: 'http://localhost:5000',
        }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: [ './routes/authRoutes.js', './routes/parkingRoutes.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;