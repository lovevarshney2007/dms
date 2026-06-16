const createHttpError = require("../utils/createHttpError");

function validateBody(rules) {
  return function bodyValidator(req, res, next) {
    const missingFields = rules.filter((rule) => {
      const value = req.body[rule.field];
      return rule.required && !String(value || "").trim();
    });

    if (missingFields.length > 0) {
      return next(
        createHttpError(
          400,
          `Missing required fields: ${missingFields.map((rule) => rule.field).join(", ")}`
        )
      );
    }

    next();
  };
}

module.exports = validateBody;
