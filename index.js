const http = require("http");
const express = require("express");
const morgan = require("morgan");

const router = require("./router");

const host = "localhost";
const port = 3000;

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/dishes", router.create("dishes"));
app.use("/leaders", router.create("leaders"));
app.use("/promotions", router.create("promotions"));

app.use(express.static(__dirname + "/public"));

app.use((req, resp, next) => {
    resp.statusCode = 200;
    resp.setHeader("Content-Type", "text/html");
    resp.end("<html><body>Hello from Express</body></html>");
});

const server = http.createServer(app);

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});
