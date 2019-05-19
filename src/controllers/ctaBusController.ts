import { Request, Response } from "express";
import getCtaBus from "../util/getCtaBus";

export let ctaBus = (req: Request, res: Response): void => {
    getCtaBus(req.query.bus).then((result): void => {
        res.send(result);
    }).catch((err): Response => res.send(err));
};