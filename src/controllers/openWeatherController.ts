import { Request, Response } from "express";
import getWeather from "../util/getWeather";

export let weather = (req: Request, res: Response): void => {
    getWeather(req.query.city).then((result) => {
        res.send(result);
    }).catch(err => res.send(err));
};