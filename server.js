const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const expressJWT = require("express-jwt"); 
const PORT = process.env.PORT || 8000;

const app = express();
const db = require('./models');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// expressJWT Setup - Not needed??
// app.use(expressJWT({ secret: "JWTpassword" }).unless({path: ['/', '/login', 'api/user', '/compare', '/learn', '/api/learn']}));

// Handlebars =========================
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes ==============================
require("./routes/html-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/learn-api-routes.js")(app);
// require("./routes/crypto-api-routes.js")(app);

// Sequelize Sync ======================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

// REMEMBER TO CHANGE FORCE IN SYNC ABOVE TO FALSE