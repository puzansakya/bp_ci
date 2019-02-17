import { NextFunction, Response, Request } from "express";

export class CustomValidator {

    public validate(schema: any) {
        return (req: Request, res: Response, next: NextFunction) => {            
            const { error } = schema.body.validate(req.body) || schema.id.validate({ id: req.params.id })

            if (error) {
                next({ status: 400, message: error });
            }else{
                next()
            }
        }
    }     
}

export default new CustomValidator();
