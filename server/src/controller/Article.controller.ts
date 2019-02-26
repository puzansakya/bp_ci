import { Router, NextFunction, Response, Request } from "express";
import Article from "../models/Article";
import Clap from "../models/Clap";
import { upload } from "../middleware/Fileupload";
const cloudinary = require('cloudinary').v2;
import { raw } from "objection";

import slugify from 'slugify';

import * as _ from 'lodash';
// const checkIfAuthenticated = require('../middlewares/Authentication.middleware').checkIfAuthenticated;
import auth from '../middleware/Authentication.middleware';
import Bookmark from "../models/Bookmark";
// const checkIfAuthenticated = require('../middleware/Authentication.middleware').checkIfAuthenticated;
// const checkIfAuthorized = require('../middleware/Authorization.middleware').checkIfAuthorized;



/**
 * Controller for articles
 * 
 * * getAll
 * * clap
 * * create
 * 
 */
export class ArticleController {

    router: Router;

    constructor() {

        this.router = Router();
        this.initRoutes();

    }

    public async getAll(req: Request, res: Response, next: NextFunction) {

        try {
            //parse search parameter
            let search = req.query.search;
            let order = req.query.order;
            let sort = req.query.sort;

            let pageNo = parseInt(req.query.page, 10);

            if (isNaN(pageNo) || pageNo < 1) {
                pageNo = 1;
            }

            let limit = parseInt(req.query.limit, 10);

            if (isNaN(limit)) {
                limit = 10;
            } else if (limit > 50) {
                limit = 50;
            } else if (limit < 1) {
                limit = 1;
            }

            let offset = pageNo - 1;

            let query = Article
                .query();

            if (search != undefined) {
                query.where('name', 'like', '%' + search + '%');
            }

            if (sort != undefined) {
                if (order != undefined) {
                    query.orderBy(sort, order);
                }

            }

            // const user = req['user'];
            // if(user){

            // }
            let articles = await query
                .select(
                    'articles.id',
                    'articles.heading',
                    'articles.slug',
                    'articles.description',
                    'articles.backdrop',
                    'articles.created_at',
                    'articles.modified_date',
                    Article.relatedQuery('claps').count().as('claps'),
            )
                .eager('user')
                .where({ status: true })
                .page(offset, limit)
                .debug(true);

            let response = {
                data: articles.results,
                paged: {
                    page: pageNo,
                    pageSize: limit,
                    rowCount: articles.total,
                    pageCount: Math.ceil(articles.total / limit)
                }
            };

            res.status(200).json(response);
        } catch (error) {
            next({ status: 400, message: error });
        }

    }

    public async getOne(req: Request, res: Response, next: NextFunction) {

        try {
            let articleOne = await Article
                .query()
                .findById(req.params.id).debug(true);

            res.status(200).json(articleOne);

        } catch (error) {
            next({ status: 400, message: error });
        }

    }

    public async getBySlug(req: Request, res: Response, next: NextFunction) {

        try {
            let articleSlug = await Article
                .query()
                .findOne({ slug: req.params.slug })
                .eager('user')
                .debug(true);

            res.status(200).json(articleSlug);

        } catch (error) {
            next({ status: 400, message: error });
        }

    }

    public async getByAuthor(req: Request, res: Response, next: NextFunction) {

        try {
            //parse search parameter
            let search = req.query.search;
            let order = req.query.order;
            let sort = req.query.sort;

            let pageNo = parseInt(req.query.page, 10);

            if (isNaN(pageNo) || pageNo < 1) {
                pageNo = 1;
            }

            let limit = parseInt(req.query.limit, 10);

            if (isNaN(limit)) {
                limit = 10;
            } else if (limit > 50) {
                limit = 50;
            } else if (limit < 1) {
                limit = 1;
            }

            let offset = pageNo - 1;

            let query = Article
                .query();

            if (search != undefined) {
                query.where('name', 'like', '%' + search + '%');
            }

            if (sort != undefined) {
                if (order != undefined) {
                    query.orderBy(sort, order);
                }

            }

            // const user = req['user'];
            // if(user){

            // }
            let articles = await query
                .eager('user')
                .where({ status: true, user_id: req.params.authorId })
                .page(offset, limit)
                .debug(true);

            let response = {
                data: articles.results,
                paged: {
                    page: pageNo,
                    pageSize: limit,
                    rowCount: articles.total,
                    pageCount: Math.ceil(articles.total / limit)
                }
            };

            res.status(200).json(response);
        } catch (error) {
            next({ status: 400, message: error });
        }

    }

    public async getBookmarkedArticle(req: Request, res: Response, next: NextFunction) {

        try {
            //parse search parameter
            let search = req.query.search;
            let order = req.query.order;
            let sort = req.query.sort;
            let authorId = req.params.authorId;

            let pageNo = parseInt(req.query.page, 10);

            if (isNaN(pageNo) || pageNo < 1) {
                pageNo = 1;
            }

            let limit = parseInt(req.query.limit, 10);

            if (isNaN(limit)) {
                limit = 10;
            } else if (limit > 50) {
                limit = 50;
            } else if (limit < 1) {
                limit = 1;
            }

            let offset = pageNo - 1;

            let query = Article
                .query();

            if (search != undefined) {
                query.where('name', 'like', '%' + search + '%');
            }

            if (sort != undefined) {
                if (order != undefined) {
                    query.orderBy(sort, order);
                }

            }

            // const user = req['user'];
            // if(user){

            // }
            let articles = await query
                .select(
                    'articles.*',
                    raw(`case when bookmarks.id IS NULL then false else true end as "bookmarked"`)
                )
                // .leftJoin('bookmarks', (join) => {
                //     join.on('bookmarks.article_id', '=', 'articles.id').andOn(raw('bookmarks.user_id = ?', '1'));
                // })
                .joinRelation('bookmarks')
                .eager('user')
                .where({ status: true, 'bookmarks.user_id': authorId })
                .page(offset, limit)
                .debug(true);

            let response = {
                data: articles.results,
                paged: {
                    page: pageNo,
                    pageSize: limit,
                    rowCount: articles.total,
                    pageCount: Math.ceil(articles.total / limit)
                }
            };

            res.status(200).json(response);
        } catch (error) {
            next({ status: 400, message: error });
        }

    }

    public async create(req: Request, res: Response, next: NextFunction) {
        const user = req['user'];
        if (!user) {
            next({ status: 400, message: 'user not found' });
        }
        upload(req, res, async (err) => {
            if (err) {
                console.error(err)
                return res.status(400).json({ message: "failed upload" })
            } else {

                // uncomment if file is writing to disk
                // let backdrop;
                // if (req.file != undefined) {
                //     backdrop = 'http://localhost:3000/' + req.file.filename;
                // }
                // try {
                //     let slug = slugify(req.body.heading, { remove: /[*+~.()'"!:@]/g, lower: true });
                //     let articleCreate = await Article
                //         .query()
                //         .insert({
                //             heading: req.body.heading,
                //             slug: slug,
                //             description: req.body.description,
                //             content: req.body.content,
                //             backdrop: backdrop,
                //             status: req.body.status,
                //             user_id: user.sub,
                //             category_id: req.body.category_id,
                //         }).debug(true);
                //     res.status(201).json(articleCreate);
                // } catch (error) {
                //     console.log(error);
                //     next({ status: 400, message: error });
                // }

                // cloudiary support uncomment here
                cloudinary.config({
                    cloud_name: 'dnammd7o9',
                    api_key: '454537438423116',
                    api_secret: '--ZROy5RT31hr5SKQV4eQEw1VBQ'
                });
                const uniqueFilename = new Date().toISOString();
                cloudinary.uploader.upload_stream({ public_id: `blog/${uniqueFilename}`, tags: `blog` }, async (error, result) => {
                    if (error) {
                        next({ status: 400, message: error });
                    } else {
                        try {
                            let slug = slugify(req.body.heading, { remove: /[*+~.()'"!:@]/g, lower: true });
                            let articleCreate = await Article
                                .query()
                                .insert({
                                    heading: req.body.heading,
                                    slug: slug,
                                    description: req.body.description,
                                    content: req.body.content,
                                    backdrop: result.secure_url,
                                    status: req.body.status,
                                    user_id: user.sub,
                                    category_id: req.body.category_id,
                                }).debug(true);
                            res.status(201).json(articleCreate);
                        } catch (error) {
                            next({ status: 400, message: error });
                        }
                    }

                }).end(req.file.buffer);
            }
        });
    }

    // public async update(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         let hotel = await Hotel
    //             .query()
    //             .findById(req.params.id).debug(true);

    //         let authorUpdate = await Hotel
    //             .query()
    //             .patch({
    //                 name            : req.body.name         || hotel.name,
    //                 description     : req.body.description  || hotel.description,
    //                 logo            : req.body.logo         || hotel.logo,
    //                 backdrop        : req.body.backdrop     || hotel.backdrop,
    //                 parking         : req.body.parking      || hotel.parking,
    //                 opening_time    : req.body.opening_time || hotel.opening_time,
    //                 closing_time    : req.body.closing_time || hotel.closing_time,
    //                 phone           : req.body.phone        || hotel.phone,
    //                 location        : req.body.location     || hotel.location,
    //                 lat             : req.body.lat          || hotel.lat,
    //                 lng             : req.body.lng          || hotel.lng,
    //                 modified_date   : new Date()
    //             })
    //             .where({ id: req.params.id });

    //         res.status(204).json(authorUpdate);

    //     } catch (error) {
    //         next({ status: 400, message: error });
    //     }
    // }

    // public async delete(req: Request, res: Response, next: NextFunction) {

    //     try {
    //         let hotelDelete = await Hotel.query().patch(
    //             {
    //                 status: false,
    //             })
    //             .where({ id: req.params.id });

    //         res.status(204).json("Hotel successfully deleted")
    //     } catch (error) {
    //         next({ status: 400, message: error });
    //     }
    // }

    public async clap(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.body.clap) {
                let clapCreate = await Clap
                    .query()
                    .insert({
                        user_id: req.body.user_id,
                        article_id: req.body.article_id
                    }).debug(true);
                res.status(201).json({ message: 'Claped' });
            } else {
                let clapDelete = await Clap
                    .query()
                    .delete()
                    .where({
                        article_id: req.body.article_id,
                        user_id: req.body.user_id
                    })
                    .debug(true);
                res.status(201).json({ message: 'Unciked' });
            }
        } catch (error) {
            next({ status: 400, message: error });

        }
    }

    public async bookmark(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req['user'];
            if (!user) {                
                next({ status: 400, message: 'user not found' });
            }
            if (req.body.bookmark) {
                let bookmarkCreate = await Bookmark
                    .query()
                    .insert({
                        user_id: user.sub,
                        article_id: req.body.id
                    }).debug(true);
                res.status(201).json({ message: 'bookmarked' });
            } else {                
                let bookmarkDelete = await Bookmark
                    .query()
                    .delete()
                    .where({
                        article_id: req.body.id,
                        user_id: user.sub
                    })
                    .debug(true);
                res.status(201).json({ message: 'Bookmark removed' });
            }
        } catch (error) {
            console.log('error', error);
            next({ status: 400, message: error });

        }
    }

    // public async getFavs(req: Request, res: Response, next: NextFunction){

    // }

    // public async favs(req: Request, res: Response, next: NextFunction){
    //     try {
    //         if(!req.body.fav){
    //             let favCreate = await HotelFav
    //             .query()
    //             .insert({
    //                 customer_id : req.body.customer_id,
    //                 hotel_id    : req.body.hotel_id                    
    //             }).debug(true);
    //             res.status(201).json({message:'Faved'});
    //         }else{
    //             let favDelete = await HotelFav
    //             .query()
    //             .delete()
    //             .where({ 
    //                 hotel_id    : req.body.hotel_id,
    //                 customer_id : req.body.customer_id
    //              })
    //             .debug(true);
    //             res.status(201).json({message:'Unfaved'});
    //         }
    //     } catch (error) {
    //         next({ status: 400, message: error });

    //     }
    // }

    // public async getReviews(req: Request, res: Response, next: NextFunction){
    //     try {            

    //         let pageNo  = parseInt(req.query.page, 10);

    //         if (isNaN(pageNo) || pageNo < 1) {
    //             pageNo = 1;
    //         }

    //         let limit = parseInt(req.query.limit, 10);

    //         if (isNaN(limit)) {
    //             limit = 10;
    //         } else if (limit > 50) {
    //             limit = 50;
    //         } else if (limit < 1) {
    //             limit = 1;
    //         }

    //         let offset = pageNo - 1;

    //         let hotelReview = await HotelReview
    //             .query()
    //             .where({ hotel_id: req.params.hotelId})                              
    //             .page(offset, limit)
    //             .debug(true);  

    //         let response = {
    //             data: hotelReview.results, paged: {
    //                 page        : pageNo,
    //                 pageSize    : limit,
    //                 rowCount    : hotelReview.total,
    //                 pageCount   : Math.ceil(hotelReview.total / limit)
    //             }
    //         };
    //         res.status(200).json(response);
    //     } catch (error) {
    //         next({ status: 400, message: error });

    //     }
    // }

    // public async createReviews(req: Request, res: Response, next: NextFunction){

    // }

    initRoutes() {
        // this.router.get('/', auth.checkIfAuthenticated, _.partial(auth.checkIfAuthorized, ['ADMIN']), this.getAll);
        this.router.get('/', this.getAll);
        this.router.post('/', auth.checkIfAuthenticated, _.partial(auth.checkIfAuthorized, ['ADMIN', 'USER']), this.create);
        this.router.get('/:slug', this.getBySlug);
        this.router.get('/author/:authorId', this.getByAuthor);
        this.router.get('/bookmark/:authorId', this.getBookmarkedArticle);
        // this.router.get('/:id'              , this.getOne);
        // this.router.put('/:id'              , this.update);
        // this.router.delete('/:id'           , this.delete);
        this.router.post('/clap', this.clap);
        this.router.post('/bookmark', auth.checkIfAuthenticated, _.partial(auth.checkIfAuthorized, ['ADMIN', 'USER']), this.bookmark);
        // this.router.get('/favs'             , this.getFavs);
        // this.router.post('/favs'            , this.favs);
        // this.router.get('/reviews/:hotelId' , this.getReviews);
        // this.router.post('/reviews'         , this.createReviews);
    }

}

// Create the HeroRouter, and export its configured Express.Router
export default new ArticleController().router;


// SELECT `photos`.*, IF(`likes`.`id` IS NULL, 'no', 'yes') as `he_likes_it`
// FROM `photos`
// LEFT JOIN `likes` on `likes`.`photo_id` = `photos`.`id` AND `likes`.`user_id` = 123
// ORDER BY `photos`.`created_at` DESC
// LIMIT 0,5


// endpoints
// (get) api/v1/articles/ -> get all articles
// (post) api/v1/articles/ -> create and article
// (get) api/v1/articles/{slug} -> get one article based on article slug
// (post) api/v1/articles/clap -> create clap based on particular user id and article id
// (post) api/v1/articles/bookmark -> create bookmark based on particular user id and article id
// (get) api/v1/articles/bookmark -> get bookmarked articles for particular user id
