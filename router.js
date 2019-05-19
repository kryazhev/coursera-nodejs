const express = require("express");

module.exports.create = (domain, dao) => {
    const router = express.Router();

    router.route("/")
    .all((req, resp, next) => {
        resp.statusCode = 200;
        resp.setHeader("Content-Type", "application/json");
        next();
    })
    .get((req, resp, next) => {
        dao.findAll(domain)
        .then(result => {
            resp.json(result);
        }, error => next(error))
        .catch(error => next(error));
    })
    .post((req, resp, next) => {
        dao.insert(domain, req.body)
        .then(result => {
            resp.json(result);
        }, error => next(error))
        .catch(error => next(error));
    })
    .put((req, resp, next) => {
        resp.statusCode = 403;
        resp.setHeader("Content-Type", "plain/text");
        resp.end(`PUT operation not supported on /${domain}`);
    })
    .delete((req, resp, next) => {
        dao.deleteAll(domain)
        .then(result => {
            resp.json(result);
        }, error => next(error))
        .catch(error => next(error));
    });
    
    router.route("/:id")
    .get((req, resp, next) => {
        dao.findOne(domain, req.params.id)
        .then(result => {
            resp.json(result);
        }, error => next(error))
        .catch(error => next(error));
    })
    .post((req, resp, next) => {
        resp.statusCode = 403;
        resp.setHeader("Content-Type", "plain/text");
        resp.end(`POST operation not supported on /${domain}/${req.params.id}`);
    })
    .put((req, resp, next) => {
        dao.update(domain, req.params.id, req.body)
        .then(result => {
            resp.json(result);
        }, error => next(error))
        .catch(error => next(error));
    })
    .delete((req, resp, next) => {
        dao.delete(domain, req.params.id)
        .then(result => {
            resp.json(result);
        }, error => next(error))
        .catch(error => next(error));
    });

    return router;
};