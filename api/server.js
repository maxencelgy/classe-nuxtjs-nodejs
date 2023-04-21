const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const dotenv = require("dotenv");
dotenv.config({   default_node_env: "development",   silent: true, });

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`${process.env.MONGO_METHOD}://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?${process.env.MONGO_OPTIONS}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to classe application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/classes.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "staff"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'staff' to roles collection");
      });

      new Role({
        name: "prof"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'prof' to roles collection");
      });

      new Role({
        name: "eleve"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'eleve' to roles collection");
      });
    }
  });
}
