/** @format */
import jQuery from 'jquery';
import mongoose from 'mongoose';
import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import flash from 'connect-flash';
import expressSession from 'express-session';
import { MemoryStore } from 'express-session';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import { v4 as uuid } from 'uuid';
import { MongoClient } from 'mongodb';
import cookieParser from 'cookie-parser'; 
import homeController from './controllers/home.js';
import courseController from './controllers/course.js';
//import contactsController from './controllers/contacts.js';
import videosController from './controllers/videos.js';
import teetimesController from './controllers/tee-times.js';
import firstHalfController from './controllers/first-half.js';
import secondHalfController from './controllers/second-half.js';
import overallController from './controllers/overall.js';
import availabilityController from './controllers/availability.js';
import loginController from './controllers/loginController.js';
import resultsController from './controllers/results.js';
import * as dbmodel from './models/dbModel.js';

const app = new express();

const uri = "mongodb+srv://golfUser:LJbTwTYnKJZmgIqM@cluster0.ovmegqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

dbmodel.connect(client);

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(flash());
app.use(
  expressSession({
    name: 'SessionCookie',
    cookie: { maxAge: 60000 },
    secret: "woot",
    store: new MemoryStore({ checkPeriod: 86400000 }),
    resave: false,
    saveUninitialized: false,
    genid: (req) => {
      return uuid();
    }
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
  res.render("images", { items: imageFiles });
});
app.get("/videos", videosController);
app.get("/results", resultsController);
//app.get("/contacts", contactsController);
app.get("/tee-times", teetimesController);
app.get("/second-half", secondHalfController);
app.get("/first-half", firstHalfController);
app.get("/overall", overallController);
app.get("/availability", availabilityController);
app.get("/login", loginController);

let port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("app listening on ", port);
});