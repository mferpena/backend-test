import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { Logger } from '../../config/Logger';

const logger = new Logger('ValidationMiddleware');

export function validateSchema(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body);

        if (error) {
            logger.error(`Validation failed: ${error.details.map(detail => detail.message).join(', ')}`);

            res.status(400).json({ error: error.details.map(detail => detail.message) });
            return;
        }

        next();
    };
}

export function validateQueryParams(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.query);

        if (error) {
            logger.error(`Validation failed: ${error.details.map(detail => detail.message).join(', ')}`);
            res.status(400).json({ error: error.details.map(detail => detail.message) });
            return;
        }

        next();
    };
}