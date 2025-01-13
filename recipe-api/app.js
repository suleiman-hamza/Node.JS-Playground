// console.log("welcome to the recipe app")
// const http = require('http');

// const server = http.createServer((req, res) => {
//     console.log(req.method, req.headers)
// })

// server.listen(8000)

// import and instantiate the fastify server
const server = require('fastify')();
// check process.env for host & port || use the default
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 8000;

// log out the workers process.pid
console.log(`worker pid=${process.pid}`);

// server route definition
server.get('/recipes/:id', async (req, reply) => {
    // log out text + process.pid 
    console.log(`worker request pid=${process.pid}`);
    // get the param id from request route id & assign to id variable
    const id = Number(req.params.id);
    // logs out error if id does not match param id with 404 status code 
    if (id !== 42) {
        reply.statusCode = 404;
        return { error: 'not_found' };
    }
    // returns a json that contains the recipe
    return {
        producer_pid: process.pid,
        recipe: {
            id, name: "Chicken Tikka Masala",
            steps: "Throw it in a pot...",
            ingredients: [
                { id: 1, name: "Chicken", quantity: "1 lb", },
                { id: 2, name: "Sauce", quantity: "2 cups", }
            ]
        }
    };
});

// here server listens to port and host to start the server and logs out the server address.
server.listen({ port: PORT, host: HOST }, () => {
console.log(`Producer running at http://${HOST}:${PORT}`);
});