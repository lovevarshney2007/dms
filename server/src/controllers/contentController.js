const contentService = require("../services/contentService");
const createHttpError = require("../utils/createHttpError");

const VALID_TYPES = [
  "competition",
  "season",
  "qualified-contestant",
  "success-story",
  "gallery",
  "video",
  "patron",
  "sponsor",
  "testimonial",
  "website-setting",
  "page-meta",
  "ngo-gallery",
  "ngo-camp",
  "ngo-initiative"
];

async function listContent(req, res, next) {
  const { type } = req.params;
  if (!VALID_TYPES.includes(type)) {
    return next(createHttpError(400, `Invalid content type: ${type}`));
  }
  const items = await contentService.listContent(type);
  res.json(items);
}

async function createContent(req, res, next) {
  const { type } = req.params;
  if (!VALID_TYPES.includes(type)) {
    return next(createHttpError(400, `Invalid content type: ${type}`));
  }
  const item = await contentService.createContent(type, req.body);
  res.status(201).json(item);
}

async function updateContent(req, res, next) {
  const item = await contentService.updateContent(req.params.id, req.body);
  if (!item) return next(createHttpError(404, "Item not found."));
  res.json(item);
}

async function deleteContent(req, res, next) {
  const item = await contentService.deleteContent(req.params.id);
  if (!item) return next(createHttpError(404, "Item not found."));
  res.json({ message: "Deleted successfully." });
}

module.exports = { listContent, createContent, updateContent, deleteContent };
