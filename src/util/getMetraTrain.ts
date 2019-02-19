import dotenv from "dotenv";
dotenv.config();

import getHttps from "./getHttps";

const username = process.env.METRA_TRAIN_ID;
const passw = process.env.METRA_TRAIN_SECRET;

function getMetraTrain(route?: string): Promise<{}> {
    const options = {
        host: "gtfsapi.metrarail.com",
        port: 443,
        path: "/gtfs/schedule/" + route,
        headers: {
            "Authorization": "Basic " + new Buffer(username + ":" + passw).toString("base64")
        }
    };
    return new Promise((resolve, reject) => {
        getHttps(options).then((result) => {
            const metraJson = JSON.parse(result);
            if (metraJson.hasOwnProperty("error")) {
                reject("Error response on route" + route);
            }
            resolve(metraJson);
        }).catch(err => reject(err));
    });
}

export default getMetraTrain;