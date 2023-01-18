import { NextFunction, Request, Response } from "express";
import { LoggerService } from "../logger/logger.service";
import { IExceptionFilter } from "./exception.filter.interface";
import { HTTPError } from "./http-error.class";

export class ExceptionFilter implements IExceptionFilter {
    constructor(
        public logger: LoggerService,
    ) { }

    catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HTTPError) {
            this.logger.error(`[${err.context}] Failed ${err.statusCode} ${err.message}`);
            res.status(err.statusCode).send({ error: err.message });
        } else {
            this.logger.error(err.message);
            res.status(500).send({ error: err.message });
        }
    }
}
