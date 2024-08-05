const express = require("express");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const { resourceUsage } = require("process");
const expressSession = require("express-session");
const MemoryStore = require("memorystore")(expressSession);
const fileUpload = require("express-fileupload");
const helmet = require("helmet");

const homeController = require("./controllers/home.js");
const leaguesController = require("./controllers/leagues.js");
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

const app = new express();

app.disable("x-powered-by");

app.set("view engine", "ejs");
app.set("trust proxy", 1);

//added to support Juicebox
//app.use(helmet());

app.use(express.static("public"));
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
  }),
);
app.get("/", homeController);
app.get("/leagues", leaguesController);
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

//video test stream

app.get("/video", function (req, res) {
  const path = "/images/img_0483.webm";
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

/*app.use((req, res, next) => {
  res.status(404).send("Sorry...can't find that.")
})
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something is broken.')
}) */

app.listen(port, () => {
  console.log("app listening on ", port);
});
