import { Request, Response } from "express";
import getMetraTrain from "../util/metraTrainApiKey";

export let metraTrain = (req: Request, res: Response): void => {
    getMetraTrain(req.query.train).then((result) => {
        res.send(result);
    }).catch(err => res.send(err));
};