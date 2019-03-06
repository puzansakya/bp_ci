import { Router, NextFunction, Response, Request } from "express";
import User from "../models/User";
const hasher = require('../middleware/Hash.middleware');

const loginAndBuildResponse = require('../middleware/LoginAndBuildResponse.middleware');

export class UserController {

    router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        const credentials = req.body;        
        try {

            let user = await User
                .query()
                .first()
                .where({ email: credentials.email })
                .eager('roles')
                .limit(1)
                .debug(true);

            if (!user) {
                next({ status: 403, message: 'user not found' });
            } else {
                let response = {
                    id: user.id,
                    email: user.email,
                    passwordDigest: user.password_digest,
                    roles: user.roles.map(role => {
                        return role.role
                    })
                }                
                loginAndBuildResponse.loginAndBuildResponse(credentials, response, res);
            }
        } catch (error) {
            next({ status: 403, message: 'Login failed' });
        }

    }

    public async signUp(req: Request, res: Response, next: NextFunction) {
        const credentials = req.body;        
        try {

            let user = await User
                .query()
                .first()
                .where({ email: credentials.email })
                .eager('roles')
                .limit(1)
                .debug(true);            

            if (!user) {
                const hash = await hasher.hash(req.body.password);                
                let userCreate = await User
                    .query()
                    .insert({
                        email: req.body.email,
                        password_digest: hash,
                    }).debug(true);
                delete userCreate["password_digest"];
                res.status(201).json(userCreate);
            } else {
                next({ status: 403, message: 'user already exists.' });
            }
        } catch (error) {
            next({ status: 403, message: 'Signup failed' });
        }

    }



    initRoutes() {
        this.router.post('/login', this.login);
        this.router.post('/signup', this.signUp);
    }

}


// Create the HeroRouter, and export its configured Express.Router
export default new UserController().router;