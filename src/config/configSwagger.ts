import swaggerJSDoc from 'swagger-jsdoc'
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Service API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.ts'],
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)
export default swaggerSpec
