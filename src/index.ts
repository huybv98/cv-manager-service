import express from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/configSwagger'
import { connectDB } from './config/connectDB'
import bodyParser from 'body-parser'
import initWebRoutes from './routes/index'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
initWebRoutes(app)

// connect database
connectDB()

// use swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
