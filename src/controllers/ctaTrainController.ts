import { Request, Response } from "express";
import getCtaTrain from "../util/ctaTrainApiKey";

export let ctaTrain = (req: Request, res: Response): void => {
    getCtaTrain(req.query.train).then((result) => {
        res.send(result);
    }).catch(err => res.send(err));
};