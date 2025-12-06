import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodType } from 'zod';
import HttpCodes from '../constants/HttpCodes';

type ValidationMiddlewareProps = {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
};

const validate = (schema: ZodType, data: unknown) => {
  const result = schema.safeParse(data);
  return result.success ? null : result.error;
};

const validationMiddleware =
  (schema: ValidationMiddlewareProps) => (req: Request, res: Response, next: NextFunction) => {
    const results: Array<ZodError | null> = [];
    try {
      if (schema.body) {
        results.push(validate(schema.body, req.body));
      }
      if (schema.query) {
        results.push(validate(schema.query, req.query));
      }
      if (schema.params) {
        results.push(validate(schema.params, req.params));
      }

      const errors = results.filter(Boolean);
      if (errors.length > 0) {
        return res.status(HttpCodes.BadRequest).json(
          errors.map(value => ({
            ...value,
            ...(value?.message && { message: JSON.parse(value.message) }),
          })),
        );
      }

      return next();
    } catch (error) {
      console.error(error);
      return res.status(HttpCodes.BadRequest).json({ message: 'Validation failed' });
    }
  };

export default validationMiddleware;
