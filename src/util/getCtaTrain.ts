import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

function getCtaTrain(trainStation: string): Promise<{}> {
    return new Promise((resolve, reject): void => {
        const url = "https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=" + process.env.CTA_TRAIN_API_KEY + "&mapid=" + trainStation + "&max=10&outputType=JSON";
        fetch(url).then((res): {} => res.json()).then((result: {}): void => resolve(result))
            .catch((err): void => reject(err));
    });
}

export default getCtaTrain;