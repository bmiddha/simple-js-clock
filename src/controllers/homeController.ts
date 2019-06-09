import { Request, Response } from "express";

interface ExplictAnyIndex {
    [key:string]: any; // Add index signature
}

const defaultConfig: ExplictAnyIndex = {
    ctaBusStops: ["6700", "6627", "307", "332", "4640", "14487", "6347", "206"],
    ctaTrainStations: ["40350"],
    weatherCity: "Chicago",
    eventCalendars: ["kc72g1ctfg8b88df34qqb62d1s@group.calendar.google.com"],
}

export let index = (req: Request, res: Response): void => {
    if (req.query.config != "") {
        res.redirect("/config/?" + Object.keys(defaultConfig).map((k): string => {
            return encodeURIComponent(k) + '=' + encodeURIComponent(defaultConfig[k])
        }).join('&'));
    }
};

export let config = (req: Request, res: Response): void => {
    res.render("home", {
        title: "Home"
    });
}

export let setConfig = (req: Request, res: Response): void => {
    res.render("setConfig", {
        title: "Set Config"
    });
};

export let offline = (req: Request, res: Response): void => {
    res.render("home", {
        title: "Home"
    });
}

export let demo = (req: Request, res: Response): void => {
    res.render("home", {
        title: "Home"
    });
}