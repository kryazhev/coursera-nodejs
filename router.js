const express = require("express");
const dbutils = require("./data/dbutils");

module.exports.create = (domain) => {
    const router = express.Router();

    router.route("/")
    .all((req, resp, next) => {
        resp.statusCode = 200;
        resp.setHeader("Content-Type", "application/json");
        next();
    })
    .get((req, resp, next) => {
        dbutils.findAll(domain).then(result => {
            resp.json(result);
        });
    })
    .post((req, resp, next) => {
        const data = {name: req.body.name, description: req.body.description};
        dbutils.insert(domain, data).then(result => {
            resp.json(result);
        });
    })
    .put((req, resp, next) => {
        resp.statusCode = 403;
        resp.setHeader("Content-Type", "plain/text");
        resp.end(`PUT operation not supported on /${domain}`);
    })
    .delete((req, resp, next) => {
        dbutils.deleteAll(domain).then(result => {
            resp.json(result);
        });
    });
    
    router.route("/:id")
    .get((req, resp, next) => {
        dbutils.findOne(domain, req.params.id).then(result => {
            resp.json(result);
        });
    })
    .post((req, resp, next) => {
        resp.statusCode = 403;
        resp.setHeader("Content-Type", "plain/text");
        resp.end(`POST operation not supported on /${domain}/${req.params.id}`);
    })
    .put((req, resp, next) => {
        const data = {name: req.body.name, description: req.body.description};
        dbutils.update(domain, req.params.id, data).then(result => {
            resp.json(result);
        });    
    })
    .delete((req, resp, next) => {
        dbutils.delete(domain, req.params.id).then(result => {
            resp.json(result);
        });
    });

    return router;
};