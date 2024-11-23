import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // this.router.get(`${this.path}/latest`, this.getAll);
        // this.router.post(`${this.path}/:id`, this.addData);

        this.router.get(`${this.path}/:id`, this.getOneData);
        this.router.post(this.path, this.addNewData);
        this.router.delete(`${this.path}/:id`, this.deleteOneData);
        this.router.post(`${this.path}/:num`, this.getxData);
        this.router.get(`${this.path}s`, this.getAllData);
        this.router.delete(`${this.path}s`, this.deleteAllData);
    }

    private getOneData = async (request: Request, response: Response, next: NextFunction) => {
        const id = parseInt(request.params.id, 10);

        if(id <= 0 || id > testArr.length){
            response.status(404).json({error: "Element not found"});
            return;
        }

        response.status(200).json(testArr[id-1]);
    };

    private addNewData = async (request: Request, response: Response, next: NextFunction) => {
        const {elem} = request.body;


        testArr.push(parseInt(elem));

        response.status(200).json(testArr);
    };

    private deleteOneData = async (request: Request, response: Response, next: NextFunction) => {
        const id = parseInt(request.params.id, 10);

        if(isNaN(id)){
            response.status(400).json({error: "Invalid ID format"});
            return;
        }

        if(id <= 0 || id > testArr.length){
            response.status(404).json({error: "Element not found"});
            return;
        }

        testArr.splice((id-1), 1);

        response.status(200).json(testArr);
    };

    getxData = async(request: Request, response: Response, next: NextFunction) => {
        const num = parseInt(request.params.num);

        if (isNaN(num)){
            response.status(400).json({error: "Invalid Num format"});
        }
        response.status(200).json(testArr.slice(0, Number(num)));
    };

    getAllData = async(request: Request, response: Response, next: NextFunction) => {
        response.status(200).json(testArr);
    };

    deleteAllData = async(request: Request, response: Response, next: NextFunction) => {
        testArr = [];
        response.status(200).json();
    };

    // private getAll = async (request: Request, response: Response, next: NextFunction) => {

    //     response.status(200).json(testArr);
    // };

    // private addData = async (request: Request, response: Response, next: NextFunction) => {
        
    //     const { elem } = request.body;
    //     testArr.push(elem);

    //     response.status(200).json(testArr);
    // };

}

export default PostController;