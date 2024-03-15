const http = require("http");
const fs = require('fs');

const server = http.createServer((request, response) => {
    const url = request.url;
    const method = request.method;

    if (url === "/") {
        fs.readFile("message.txt", "utf-8", (err, data) => {
            if (err) {
                console.error(err);
                renderForm(response);
                return;
            }
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write("<html>");
            response.write("<head><title>Form Page</title></head>");
            response.write(`<body><h1>${data}</h1><form action='/message' method='POST' ><input type='text' name='message'/><button type='submit'>Send</button></form></body>`);
            response.write("</html>");
            response.end();
        });
    } else if (url === "/message" && method === "POST") {
        const body = [];
        request.on("data", (chunk) => {
            body.push(chunk);
        });
        request.on("end", () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split("=")[1];
            fs.writeFile("message.txt", message, err => {
                if (err) {
                    console.error(err);
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.end('Internal Server Error');
                    return;
                }
                response.statusCode = 302;
                response.setHeader('Location', "/");
                response.end();
            });
        });
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('Not Found');
    }
});

function renderForm(response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write("<html>");
    response.write("<head><title>Form Page</title></head>");
    response.write(`<body><h1>Welcome to the form page</h1><form action='/message' method='POST' ><input type='text' name='message'/><button type='submit'>Send</button></form></body>`);
    response.write("</html>");
    response.end();
}

server.listen(4000);
