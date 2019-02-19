import { Request, Response, NextFunction } from 'express';
import * as express from 'express';

export const app = express();

app.use(express.static("public"));

app.use(function (req: Request, res: Response, next: NextFunction): void {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
