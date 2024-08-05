const express = require("express");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const { resourceUsage } = require("process");
const expressSession = require("express-session");
const MemoryStore = require("memorystore")(expressSession);
const fileUpload = require("express-fileupload");
const helmet = require("helmet");
const app = new express();

const homeController = require("./controllers/home.js");
const courseController = require("./controllers/course.js");
const imagesController = require("./controllers/images.js");
const contactsController = require("./controllers/contacts.js");
const videosController = require("./controllers/videos.js");
const teetimesController = require("./controllers/tee-times.js");
const availabilityController = require("./controllers/availability.js");
const loginController = require("./controllers/login.js");
const resultsController = require("./controllers/results.js");
const logoutController = require("./controllers/logout.js");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");

app.disable("x-powered-by");

app.set("view engine", "ejs");
app.set("trust proxy", 1);

//app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    scriptSrc: ["'self'", "https://fonts.gstatic.com", "https://fonts.googleapis.com", "https://static.elfsight.com", "https://cdn.jsdelivr.net"],
    connectSrc: ["'self'", "https://core.service.elfsight.com", "https://cdn.jsdelivr.net"],
    imgSrc: ["'self'", "https://fonts.gstatic.com", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net", "https://static.elfsight.com", "https://files.elfsightcdn.com"]
  }
}));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(flash());
app.use(expressSession({
    cookie: { maxAge: 60000 },
    secret: "woot",
    store: new MemoryStore({ checkPeriod: 86400000 }),
    resave: false,
    saveUninitialized: false,
  }),
);

app.get("/", homeController);
app.get("/course", courseController);
app.get("/images", imagesController);
app.get("/videos", videosController);
app.get("/results", resultsController);
app.get("/contacts", contactsController);
app.get("/tee-times", teetimesController);
app.get("/availability", availabilityController);
app.get("/auth/register", newUserController);
app.get("/login", loginController);
app.get("/logout", logoutController);
app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);

app.post("/users/register", function () {
  redirectIfAuthenticatedMiddleware, storeUserController;
});
let port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("app listening on ", port);
});