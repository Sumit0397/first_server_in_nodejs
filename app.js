const http = require("http");


const server = http.createServer((request , response) => {
    console.log("sumit");
    response.end("sumit");
})

server.listen(4000);