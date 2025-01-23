import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import {auth} from '../middlewares/auth.middleware';
import {admin} from '../middlewares/admin.middleware';
import UserService from "../modules/services/user.service";
import PasswordService from "../modules/services/password.service";
import TokenService from "../modules/services/token.service";
import { send } from 'process';


class UserController implements Controller {
    public path = '/api/user';
    public router = Router();
    private userService = new UserService();
    private passwordService = new PasswordService();
    private tokenService = new TokenService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/create`, this.createNewOrUpdate);
        this.router.post(`${this.path}/auth`, this.authenticate);
        this.router.delete(`${this.path}/logout/:userId`, this.removeHashSession);

        this.router.post(`${this.path}/reset/:userId`, auth,  this.resetPassword);
        this.router.patch(`${this.path}/change-password`, auth, this.changePassword);
    }

    private authenticate = async (request: Request, response: Response, next: NextFunction) => {
        const { login, password } = request.body;
    
        try {
            const user = await this.userService.getByEmailOrName(login);
            if (!user) {
                return response.status(401).json({ error: 'Unauthorized: Invalid login or password.' });
            }
    
            await this.passwordService.authorize(user._id.toString(), password);
    
            const token = await this.tokenService.create(user);
    
            return response.status(200).json(this.tokenService.getToken(token));
        } catch (error) {
            console.error(`Authentication Error: ${error.message}`);
            return response.status(401).json({ error: 'Unauthorized: Invalid login or password.' });
        }
    };
    

    private createNewOrUpdate = async (request: Request, response: Response, next: NextFunction) => {
        const userData = request.body;
        try {
            const user = await this.userService.createNewOrUpdate(userData);
            if (userData.password) {
                const hashedPassword = await this.passwordService.hashPassword(userData.password)
                await this.passwordService.createOrUpdate({
                    userId: user._id,
                    password: hashedPassword
                });
            }
            response.status(200).json(user);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Bad request', value: error.message});
        }
    
    };
    
    private removeHashSession = async (request: Request, response: Response, next: NextFunction) => {
        const { userId } = request.params;
    
        try {
            const result = await this.tokenService.remove(userId);
    
            if (result.deletedCount === 0) {
                return response.status(404).json({ error: 'No active session found for the user.' });
            }
    
            return response.status(200).json({ message: 'Session successfully removed.' });
        } catch (error) {
            console.error(`Session Removal Error: ${error.message}`);
            return response.status(500).json({ error: 'Failed to remove session. Please try again later.' });
        }
    };

    private resetPassword = async(request: Request, response: Response, next: NextFunction) => {
        const {userId} = request.params;

        try{
            const result = await this.passwordService.deletePassword(userId);
            response.status(200).send(result);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(401).json({error: 'Unauthorized'});
        }
    };

    private changePassword = async(request: Request, response: Response, next: NextFunction) => {
        const {userId, oldPassword, newPassword} = request.body;

        try{
            const result = await this.passwordService.changePassword(
                userId,
                oldPassword,
                await this.passwordService.hashPassword(newPassword)
            );
            response.status(200).send(result);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(401).json({error: 'Unauthorized'});
        }

    };

}

export default UserController;
