import "reflect-metadata";
import express from "express";
import { useExpressServer, useContainer } from "routing-controllers";
import { join } from "path";
import hbs from "hbs";
import session from "express-session";
import cookieParser from "cookie-parser";
import { Container } from "typedi";
import morgan from "morgan";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// TODO: hook up to a sqlite store
// TODO: make secure === true in production mode
app.use(
  session({
    secret: "shhhhh",
    cookie: {
      secure: false,
    },
    resave: false,
    saveUninitialized: true,
  })
);
app.use(morgan("dev"));

// TODO: add a build step to copy .hbs files to /dist directory
app.set("views", join(__dirname, "../src"));
app.set("view engine", "hbs");

// TODO: add a build step to copy .hbs files to /dist directory
hbs.registerPartials(join(__dirname, "../src/partials"));
hbs.registerPartials(join(__dirname, "../src/routes/home/partials"));

useContainer(Container);

useExpressServer(app, {
  controllers: [join(__dirname, "./routes/**/*Controller.js")],
  // controllers: [join(__dirname, "./routes/**/*.js")],
});

app.listen(3000);

console.log("Starting server at http://localhost:3000");
