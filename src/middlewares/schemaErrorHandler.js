import { validationResult } from "express-validator";
import { responses } from "@ylz/common";

export function schemaErrorHandler() {
  return (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const response = new responses.UnprocessableResponse({ data: errors.array() });

      return res.status(response.metadata.code).json(response);
      // return res.json({}).end();
    }

    next();
  };
}