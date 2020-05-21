import { error } from "@ylz/logger";
import { constants, errors, responses } from "@ylz/common";

export function errorHandler(nodeEnv) {
  return function errorHandler(err, req, res, next) {
    if (nodeEnv !== constants.EnvVar.TEST) {
      error(err);
    }

    let response;

    switch (err.type) {
      case errors.NotFoundError.name:
        response = new responses.NotFoundResponse();
        break;
      case errors.DbValidationError.name:
        response = new responses.UnprocessableResponse({
          data: err.data.map((e) => ({
            location: "",
            param: e.path,
            value: e.value,
            msg: e.message
          })),
          message: err.message
        });
        break;
      case errors.DuplicateKeyError.name:
        response = new responses.UnprocessableResponse({
          message: err.message
        });
        break;
      case errors.BadRequestError.name:
        response = new responses.BadRequestResponse({
          message: err.message
        });
        break;
      case errors.InternalServerError.name:
      default:
        if (err.name === "AuthenticationError") {
          response = new responses.UnauthorizedResponse({});
        } else {
          response = new responses.InternalServerErrorResponse({});
        }
        break;
    }

    res.status(response.metadata.code).json(response);
  };
}
