const {authJwt} = require("../middlewares");
const controller = require("../controllers/classes.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/classes/all", controller.getAll);
    app.get("/api/classes/:id", controller.findOne);
    app.post("/api/classes/create", [authJwt.isStaff], controller.create);
    app.delete("/api/classes/delete/:id", [authJwt.isStaff], controller.delete);
    app.put("/api/classes/update/:id",[authJwt.isProf], controller.update);
};
