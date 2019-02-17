import { Router, NextFunction, Response, Request } from "express";
import Category from "../models/Category";


/**
 * Controller for Cateogry
 * 
 * getAll
 * getOne
 * create
 * update
 * 
 */
export class CategoryController {

    router: Router;

    constructor() {

        this.router = Router();
        this.initRoutes();

    }

    public async getAll(req: Request, res: Response, next: NextFunction) {

        try {
            //parse search parameter
            let search  = req.query.search;
            let order   = req.query.order;
            let sort    = req.query.sort;

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

            let query = Category
                .query();

            if (search != undefined) {
                query.where('category', 'like', '%' + search + '%');
            }

            if (sort != undefined) {
                if (order != undefined) {
                    query.orderBy(sort, order);
                }

            }

            let categories = await query
                .page(offset, limit)
                .debug(true);

            let response = {
                data: categories.results,
                paged: {
                    page        : 1,
                    pageSize    : limit,
                    rowCount    : categories.total,
                    pageCount   : Math.ceil(categories.total / limit)
                }
            };

            res.status(200).json(response);
        } catch (error) {
            next({ status: 400, message: error });
        }

    }

    public async getOne(req: Request, res: Response, next: NextFunction) {

        try {
            let categoryOne = await Category
                .query()
                .findById(req.params.id).debug(true);

            res.status(200).json(categoryOne);

        } catch (error) {
            next({ status: 400, message: error });
        }

    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            let categoryCreate = await Category
                .query()
                .insert({
                    category: req.body.category
                }).debug(true);
            res.status(201).json(categoryCreate);
        } catch (error) {
            next({ status: 400, message: error });

        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            let category = await Category
                .query()
                .findById(req.params.id).debug(true);

            let categoryUpdate = await Category
                .query()
                .patch({
                    category: req.body.category || category.category,
                })
                .where({ id: req.params.id });

            res.status(204).json(categoryUpdate);

        } catch (error) {
            next({ status: 400, message: error });
        }
    }    

    initRoutes() {
        this.router.get('/'     , this.getAll);
        this.router.post('/'    , this.create);
        this.router.get('/:id'  , this.getOne);
        this.router.put('/:id'  , this.update);
    }

}

// Create the HeroRouter, and export its configured Express.Router
export default new CategoryController().router;
