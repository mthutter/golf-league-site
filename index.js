/** @format */

const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const { resourceUsage } = require("process");
const expressSession = require("express-session");
const MemoryStore = require("memorystore")(expressSession);
const fileUpload = require("express-fileupload");
const helmet = require("helmet");
const app = new express();
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
//const sequelize = require("sequelize");
//const db = require('./models');
//const userRoutes = require('./routes/userRoutes.js/index.js')

const homeController = require("./controllers/home.js");
const courseController = require("./controllers/course.js");
const imagesController = require("./controllers/images.js");
const contactsController = require("./controllers/contacts.js");
const videosController = require("./controllers/videos.js");
const teetimesController = require("./controllers/tee-times.js");
const standingsController = require("./controllers/standings.js");
const availabilityController = require("./controllers/availability.js");
//const loginController = require("./controllers/login.js");
const resultsController = require("./controllers/results.js");
//const logoutController = require("./controllers/logout.js");
const newUserController = require("./controllers/newUser");
//const storeUserController = require("./controllers/storeUser");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");

app.disable("x-powered-by");

app.set("view engine", "ejs");
app.set("trust proxy", 1);

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: ["'self' data:", "fonts.gstatic.com", "fonts.googleapis.com", "static.elfsight.com", "cdn.jsdelivr.net"],
      connectSrc: ["'self'", "core.service.elfsight.com", "cdn.jsdelivr.net"],
      imgSrc: ["'self' data:", "'self'", "fonts.gstatic.com", "fonts.googleapis.com", "cdn.jsdelivr.net/npm/bootstrap@5.3.3", "static.elfsight.com", "files.elfsightcdn.com", "www.w3.org"],
    },
  })
);

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//db.sequelize.sync({force: true}).then(() => {
//  console.log("db has been resync'd")
//});

//app.use('/api/users', userRoutes);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(flash());
app.use(
  expressSession({
    cookie: { maxAge: 60000 },
    secret: "woot",
    store: new MemoryStore({ checkPeriod: 86400000 }),
    resave: false,
    saveUninitialized: false,
  })
);

const directoryPath = "public/images";
const imageFiles = [];
var index = 0;

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }  
  files.forEach((file) => {
    console.log(file);
    imageFiles[index] = file; 
    index++;
  });
});

app.get("/", homeController);
app.get("/course", courseController);
app.get("/images", async (req, res) => {
  console.log(req.session);
  res.render("images", { items: imageFiles });
});
app.get("/videos", videosController);
app.get("/results", resultsController);
app.get("/contacts", contactsController);
app.get("/tee-times", teetimesController);
app.get("/standings", standingsController);
app.get("/availability", availabilityController);
app.get("/auth/register", newUserController);
//app.get("/login", loginController);
//app.get("/logout", logoutController);
app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);

//app.post("/users/register", function () {
//  redirectIfAuthenticatedMiddleware, storeUserController;
//});

let port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("app listening on ", port);
});
