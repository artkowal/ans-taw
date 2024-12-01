import {Request, Response, NextFunction } from 'express';

const logRequests = (request: Request, response: Response, next: NextFunction) => {
    console.log(`|| [${request.method}] || ${request.url} || ${new Date().toISOString()}`);
    next();
};

export default logRequests;