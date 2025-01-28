import { checkPostCount } from '../middlewares/checkPostCount.middleware';
import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import DataService from '../modules/services/data.service';
import Joi = require('joi');

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();
    public dataService = new DataService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.get(`${this.path}s`, this.getAllData); 
        this.router.get(`${this.path}/:id`, this.getElementById); 
        this.router.post(this.path, this.addData); 
        this.router.post(`${this.path}/:num`, checkPostCount, this.getxData); 
        this.router.delete(`${this.path}/:id`, this.deleteOneData); 
        this.router.delete(`${this.path}s`, this.deleteAllData);

    }

    private getAllData = async(request: Request, response: Response, next: NextFunction) => {

        response.status(200).json(await this.dataService.getAll());
    };

    private getElementById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        // const allData = await this.dataService.query({_id: id});
        // response.status(200).json(allData);

        response.status(200).json(await this.dataService.getById(id));
    };

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const {title, text, image} = request.body;

        const schema = Joi.object({
            title: Joi.string().required(),
            text: Joi.string().required(),
            image: Joi.string().uri().required()
        });
    
        try {
            const validatedData = await schema.validateAsync({title, text, image});
            await this.dataService.createPost(validatedData);
            response.status(200).json(validatedData);
        } catch (error) {    
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Invalid input data.'});
        }
    };

    private getxData = async(request: Request, response: Response, next: NextFunction) => {
        const { num } = request.params

        response.status(200).json(await this.dataService.getLimit(Number(num)));
    };

    private deleteOneData = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        response.status(200).json(await this.dataService.deleteById(id));
    };

    private deleteAllData = async(request: Request, response: Response, next: NextFunction) => {
        response.status(200).json(await this.dataService.deleteAllPosts());
    };

}

export default PostController;