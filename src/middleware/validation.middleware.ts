import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import express from "express";



export function validationMiddleware<T>(type: any): express.RequestHandler {
    return async (req, res, next) => {
        await validate(plainToClass(type, req.body))
            .then((errors: ValidationError[]) => {
                if (errors && errors.length) {
                    res.status(400).send(errors.map(e => {
                        return { field: e.property, errors: e.constraints }
                    }));
                } else {
                    next();
                }
            })
    }
}