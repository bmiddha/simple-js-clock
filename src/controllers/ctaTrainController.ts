import { Request, Response } from "express";
import getCtaTrain from "../util/getCtaTrain";

export let ctaTrain = (req: Request, res: Response): void => {
    getCtaTrain(req.query.train).then((result): void => {
        res.send(result);
    }).catch((err): Response => res.send(err));
};