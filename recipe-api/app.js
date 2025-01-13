// console.log("welcome to the recipe app")
const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.method, req.headers)
})

server.listen(8000)