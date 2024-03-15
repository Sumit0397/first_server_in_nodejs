const http = require("http");
const fs = require('fs');

const server = http.createServer((request, response) => {
    const url = request.url;
    const method = request.method;
    if (url === "/") {
        let file = "";
        fs.readFile("message.txt" , "utf-8" , (err,data) => {
            file += data;
            console.log(file);
        })
        response.write("<html>");
        response.write("<head><title>Form Page</title></head>");
        response.write(`<body><h1>${file}</h1><form action='/message' method='POST' ><input type='text' name='message'/><button type='submit'>Send</button></form></body>`);
        response.write("</html>");
        return response.end();
    }

    if (url === "/message" && method === "POST") {
        const body = [];
        request.on("data", (chunk) => {
            console.log(chunk);
            body.push(chunk);
        })
        return request.on("end", () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split("=")[1];
            fs.writeFile("message.txt", message , err => {
                response.statusCode = 302;
                response.setHeader('Location', "/");
                return response.end();
            });
        })
    }

    response.setHeader("Content-Type", "text/html");
    response.write("<html>");
    response.write("<head><title>Home Page</title></head>");
    response.write("<body><h1>Welcome To my project.</h1></body>");
    response.write("</html>");
    response.end();

})

server.listen(4000);