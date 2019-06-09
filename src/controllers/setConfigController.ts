import { Request, Response } from "express";

export let setConfig = (req: Request, res: Response): void => {
    res.render("setConfig", {
        title: "Set Config"
    });
};