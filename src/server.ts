import app from "./app";
import dotenv from "dotenv";
import http from "http";
import https from "https";
import fs from "fs";

dotenv.config();

const port = process.env.PORT;
const httpOptions = (process.env.HTTPS === "true") ? {
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CERT),
    ca: fs.readFileSync(process.env.SSL_CA)
} : {};

const h = (process.env.HTTPS === "true") ? https: http;

const server = h.createServer(httpOptions, app);

server.listen(port, (): void => {
    console.log("Server started on port " + port);
});

export default server;