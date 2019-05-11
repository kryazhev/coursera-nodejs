const http = require('http');
const fs = require('fs');
const path = require('path');

function write(response, statusCode, fileName) {
    console.log("Response " + statusCode + " fileName " + fileName);

    response.statusCode = statusCode;
    response.setHeader("Content-Type", "text/html");
    fs.createReadStream(path.resolve(fileName)).pipe(response)
}


function handle(request, response) {
    console.log("Request for " + request.url + " by method " + request.method);

    if (request.method === "GET") {
        if (request.url == "/") {
            write(response, 200, "./public/index.html")
            return;
        }
    }

    write(response, 404, "./public/not-found.html")
}

const server = http.createServer(handle);

const host = "localhost";
const port = 3000;

server.listen(port, host , () => {
    console.log(`Server running at http://${host}:${port}`);
});