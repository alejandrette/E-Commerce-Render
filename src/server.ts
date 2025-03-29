import express from "express";
import colors  from "colors";
import router from "./router";
import db from "./config/db";

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

// Leer datos form
server.use(express.json())

server.use('/', router)

export default server