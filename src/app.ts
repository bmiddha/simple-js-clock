import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import compression from "compression";
import bodyParser from "body-parser";

dotenv.config();

import * as homeController from "./controllers/homeController";
import * as ctaBusController from "./controllers/ctaBusController";
import * as ctaTrainController from "./controllers/ctaTrainController";
import * as metraTrainController from "./controllers/metraTrainController";
import * as openWeatherController from "./controllers/openWeatherController";

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public"), { maxAge: 31557600000 }));



app.get("/", homeController.index);
app.get("/api/ctabus", ctaBusController.ctaBus);
app.get("/api/ctatrain", ctaTrainController.ctaTrain);
app.get("/api/metratrain", metraTrainController.metraTrain);
app.get("/api/weather", openWeatherController.weather);

export default app;