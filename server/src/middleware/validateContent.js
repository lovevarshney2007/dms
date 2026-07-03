const createHttpError = require("../utils/createHttpError");
const { getRulesForType } = require("../validators/contentValidators");
const contentService = require("../services/contentService");

function validateContent() {
  return async function (req, res, next) {
    try {
      let type = req.params.type;
      // For updates, resolve type from existing content item if not provided
      if (!type && req.params.id) {
        const item = await contentService.getContentById(req.params.id);
        if (!item) return next(createHttpError(404, "Content item not found."));
        type = item.type;
      }

      const rules = getRulesForType(type);
      if (!rules.length) return next();

      const missing = rules.filter(rule => {
        const value = req.body[rule.field];
        return rule.required && !String(value || "").trim();
      });
      if (missing.length) {
        return next(createHttpError(400, `Missing required fields: ${missing.map(r => r.field).join(", ")}`));
      }
      next();
    } catch (err) { next(err); }
  };
}

module.exports = validateContent;
