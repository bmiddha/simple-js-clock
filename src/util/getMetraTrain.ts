import dotenv from "dotenv";
dotenv.config();

import getHttps from "./getHttps";

const metraTrainApiKey = process.env.METRA_TRAIN_API_KEY;
function getMetraTrain(trainStation: string): Promise<{}> {
    console.log(trainStation, metraTrainApiKey);
    return new Promise(() => { });
}

export default getMetraTrain;