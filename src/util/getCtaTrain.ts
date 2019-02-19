import dotnev from "dotenv";
dotnev.config();

import getFromUrl from "./getFromUrl";

function getCtaTrain(trainStation: string): Promise<{}> {
    return new Promise((resolve, reject) => {
        const trainUrl = "https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=" + process.env.CTA_TRAIN_API_KEY + "&mapid=" + trainStation + "&max=5&outputType=JSON";
        getFromUrl(trainUrl).then((result) => {
            const trainJson = JSON.parse(result);
            if (trainJson.hasOwnProperty("error")) {
                reject("Error response on train station " + trainStation);
            }
            resolve(trainJson);
        }).catch(err => reject(err));
    });
}

export default getCtaTrain;