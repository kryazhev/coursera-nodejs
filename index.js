const http = require("http");
const express = require("express");
const morgan = require("morgan");

const mongo = require("./data/mongo-utils")
const model = require("./data/model")
const mongooose = require("./data/mongooose-utils")
const router = require("./router");

const host = "localhost";
const port = 3000;

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/v1/dishes", router.create("dishes", mongo));
app.use("/v1/leaders", router.create("leaders", mongo));
app.use("/v1/promotions", router.create("promotions", mongo));

app.use("/v2/dishes", router.create("dishes", mongooose.create(model.Dishes)));
app.use("/v2/leaders", router.create("leaders", mongooose.create(model.Leaders)));
app.use("/v2/promotions", router.create("promotions", mongooose.create(model.Promotions)));

app.use(express.static(__dirname + "/public"));

app.use((req, resp, next) => {
    resp.statusCode = 200;
    resp.setHeader("Content-Type", "text/html");
    resp.end("<html><body>Hello from Express</body></html>");
});

app.use(function(error, req, resp, next) {
    console.error(error.stack);
    resp.setHeader("Content-Type", "plain/text");
    resp.status(500).send(error.message);
});

const server = http.createServer(app);

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});
