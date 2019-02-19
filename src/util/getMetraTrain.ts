import dotnev from "dotenv";
dotnev.config();

import getFromUrl from "./getFromUrl";

const metraTrainApiKey = process.env.METRA_TRAIN_API_KEY;
function getMetraTrain(trainStation: string): Promise<{}> {
    console.log(trainStation, metraTrainApiKey);
    return new Promise(() => { });
}

export default getMetraTrain;