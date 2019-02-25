import { Router, NextFunction, Response, Request } from "express";

export class HttpFlush {

    constructor() {
    }

    public notFound(req: Request, res: Response, next: NextFunction) {
        // const err: { status?: number, message: string } = new Error('Not Found');
        // next(err);
        res.status(400).json({
            error: "not found"
        })
    }

    public globalSystemErrorHandler(error: {status:number,message:string}, req: Request, res: Response, next: NextFunction) {
        res.status(error.status);        
        res.json({
            error: {
                message: error.message || "Oops! Something went wrong."
            }
        });
    }

    public checkKey(req: Request, res: Response, next: NextFunction) {
        const key = req.query.apiKey;
        if (key !== "$2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG") {
            const err: { status?: number, message: string } = new Error('Something is missing');
            err.status = 404;
            next(err);
        } else {
            const err: { status?: number, message: string } = new Error('AFK');
            err.status = 200;
            next();
        }
    }



}
