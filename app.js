const http = require("http");


const server = http.createServer((request , response) => {
    const url = request.url;
    if(url === "/home"){
        response.write("<html>");
        response.write("<head><title>Home Page</title></head>");
        response.write("<body><h1>Welcome Home</h1></body>");
        response.write("</html>");
        response.end();    
    }
    if(url === "/about"){
        response.write("<html>");
        response.write("<head><title>About Page</title></head>");
        response.write("<body><h1>Welcome to About Us Page</h1></body>");
        response.write("</html>");
        response.end();    
    }
    if(url === "/node"){
        response.write("<html>");
        response.write("<head><title>Node Page</title></head>");
        response.write("<body><h1>Welcome to my Node Js project</h1></body>");
        response.write("</html>");
        response.end();    
    }

})

server.listen(4000);