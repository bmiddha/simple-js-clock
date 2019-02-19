import { app } from './app';
import { getCtaBus, getCtaTrain, getWeather } from './helpers';
import { Request, Response } from 'express';

app.get("/api/bus", (req: Request, res: Response): void => {
    let bus: string = req.query.bus;
    getCtaBus(bus).then((result) => {
        res.send(result);
    });
});
app.get("/api/train", (req: Request, res: Response): void => {
    let train: string = req.query.train;
    getCtaTrain(train).then((result) => {
        res.send(result);
    });
});
app.get("/api/weather", (req: Request, res: Response): void => {
    let city: string = req.query.city;
    getWeather(city).then((result) => {
        res.send(result);
    });
});
