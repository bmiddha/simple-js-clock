import { Request, Response } from "express";
import getWeather from "../util/getWeather";

export let weather = (req: Request, res: Response): void => {
    getWeather(req.query.weatherLatLong).then((result): void => {
        res.send(result);
    }).catch((err): Response => res.send(err));
};