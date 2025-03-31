import express from "express";
import colors  from "colors";
import router from "./router";
import db from "./config/db";
import swaggerUi from "swagger-ui-express"
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

// Conectar con la base de datos
async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    // console.log(colors.magenta.bold('Connetc Successfull'));
  } catch (error) {
    console.log(error)
    console.log(colors.red.bold('Error connect DB'));
  }
}

connectDB()

const server = express()

server.use(express.json());
server.use('/api/products', router)

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server