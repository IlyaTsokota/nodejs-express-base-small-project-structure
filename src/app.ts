import express, { Express } from 'express';
import { Server } from 'http';
import { ExceptionFilter } from './errors/exception.filter';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';

export class App {
    private app: Express;

    private server: Server;

    private port: number;

    private logger: LoggerService;

    private userController: UserController;

    private exceptionFilter: ExceptionFilter;

    constructor(
        logger: LoggerService,
        userController: UserController,
        exceptionFilter: ExceptionFilter,
    ) {
        this.app = express();
        this.port = 8000;
        this.logger = logger; 
        this.userController = userController; 
        this.exceptionFilter = exceptionFilter; 
    }

    useRoutes() {
        this.app.use('/users', this.userController.router);
    }

    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilters();

        this.server = this.app.listen(this.port);        
        this.logger.log(`Server is running ${this.port}`);
    }
}