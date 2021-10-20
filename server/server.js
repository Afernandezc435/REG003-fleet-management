const express = require('express')
const http = require('http')

const PORT = 3000
const app = express()//instancia de express
const server = http.createServer(app)//instancia del servidor

//servidor escuchando en el puerto 3000
server.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`)
})
