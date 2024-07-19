const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const flash = require('connect-flash');
const {resourceUsage} = require('process');
const expressSession = require('express-session');
const fileUpload = require("express-fileupload");

const homeController = require("./controllers/home.js");
const leaguesController = require("./controllers/leagues.js");
const courseController = require("./controllers/course.js");
const imagesController = require("./controllers/images.js");
const contactsController = require("./controllers/contacts.js");
const loginController = require("./controllers/login.js");
const resultsController = require("./controllers/results.js");
const logoutController = require("./controllers/logout.js");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginUserController = require("./controllers/loginUser");
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");

const app = new express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(flash());
app.use(expressSession({ cookie: { maxAge: 60000 },
                  secret: 'woot',
                  resave: false,
                  saveUninitialized: false }));

app.get("/", homeController);
app.get("/leagues", leaguesController);
app.get("/course", courseController);
app.get("/images", imagesController);
app.get("/results", resultsController);
app.get("/contacts", contactsController);
//app.get("/register", newUserController);
app.get("/login", loginController);
app.get("/logout", logoutController);

app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);
app.post("/users/register", function(req, res){
   redirectIfAuthenticatedMiddleware, storeUserController
    });
let port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("app listening on ", port);
});