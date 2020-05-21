import { errors } from "@ylz/common";

export function pageNotFoundHandler(req, res, next) {
  return res.locals.isHit ? next() : next(new errors.NotFoundError([]))
} 