import 'zone.js/dist/zone-node';
import 'reflect-metadata';
// import { enableProdMode } from '@angular/core';
// import { ngExpressEngine } from '@nguniversal/express-engine';
// import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
// import { AppServerModuleNgFactory, LAZY_MODULE_MAP } from '../../dist/server/main';

import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as objection from './objection';
import * as Knex from 'knex';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

import { Model } from 'objection';
import { HttpFlush } from './middleware/HttpFlush';
import customValidator from './middleware/Validator.middleware';

// Validators
import { UserObject } from './validators/User.validator';

// Controllers
import userController from './controller/User.controller';
import articleController from './controller/Article.controller';
import categoryController from './controller/Category.controller';

// Swagger
import swaggerJSDoc = require('swagger-jsdoc');
import swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    info: {
        title: 'Blog',
        version: '1.0.0',
        description: 'Api documentation for my personal blog.',
    },
    basePath: '/',
};

const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, '/swagger/*.js')],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    }
};

const swaggerSpec = swaggerJSDoc(options);
const DIST_FOLDER = path.join(process.cwd(), 'dist');

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../../dist/server/main');

class App {

    private httpFlush: HttpFlush;
    public express: express.Application;

    constructor() {
        // change the database environment here
        Model.knex(Knex(objection.production));

        this.httpFlush = new HttpFlush();
        this.express = express();

        enableProdMode();
        dotenv.config();
        this.middlewares();
        this.routes();

    }

    private middlewares(): void {

        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cors());
        this.express.use(compression());
        this.express.use(helmet());
        this.express.use(helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", 'fonts.googleapis.com']
            }
        }))

        // this.express.engine('html', ngExpressEngine({
        //     bootstrap: AppServerModuleNgFactory,
        //     providers: [
        //         provideModuleMap(LAZY_MODULE_MAP)
        //     ]
        // }));

        if (process.env.mode === 'prod') {
            let template = fs.readFileSync(path.join(DIST_FOLDER, 'browser', 'index.html')).toString();
            this.express.engine('html', (_, options, callback) => {
                renderModuleFactory(AppServerModuleNgFactory, {
                    // Our index.html
                    document: template,
                    url: options.req.url,
                    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
                    extraProviders: [
                        provideModuleMap(LAZY_MODULE_MAP)
                    ]
                }).then(html => {
                    callback(null, html);
                });
            });
        }

        this.express.set('view engine', 'html');
        // this.express.set('views', './dist/browser');
        this.express.set('views', path.join(DIST_FOLDER, 'browser'));


    }

    /**
     * Define all the controller routes here
     * Order does matter
     */
    private routes(): void {

        this.express.get('/redirect/**', (req, res) => {
            const location = req.url.substring(10);
            res.redirect(301, location);
        });

        /**
         * statics
         */
        // this.express.use(
        //     express.static(path.join(__dirname, '../uploads'), { maxAge: 31557600000 })
        // );  
        // this.express.use(
        //     express.static('./dist/browser', {
        //         maxAge: '1y'
        //     }));
        this.express.get('*.*', express.static(path.join(DIST_FOLDER, 'browser')));
        this.express.get('*.*', express.static(path.join(DIST_FOLDER, '../uploads')));
        // this.express.get('*.*', express.static('./dist/browser', {
        //     maxAge: '1y'
        //   }));

        /**
         * check api key
         * Uncomment if implemented
         */
        // this.express.use(this.httpFlush.checkKey);   

        /**
         * swagger
         */
        this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        // Serve swagger docs the way you like (Recommendation: swagger-tools)
        this.express.get('/api-docs.json', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(swaggerSpec);
        });

        this.express.get('/api-docs', swaggerUi.serve);

        this.express.use('/api/v1/user', customValidator.validate(UserObject), userController);
        this.express.use('/api/v1/articles', articleController);
        this.express.use('/api/v1/categories', categoryController);

        /**
        * universal redirect should be at last
        */
        this.express.get('/*', (req, res) => {
            res.render(path.join(DIST_FOLDER, 'browser', 'index.html'), { req });
        });

        this.express.use(this.httpFlush.notFound);
        this.express.use(this.httpFlush.globalSystemErrorHandler);

    }

}

export default new App().express;
