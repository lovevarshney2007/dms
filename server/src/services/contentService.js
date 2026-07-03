const ContentBlock = require("../models/ContentBlock");

async function listContent(type) {
  return ContentBlock.find({ type }).sort({ order: 1, createdAt: -1 }).lean();
}

async function createContent(type, payload) {
  return ContentBlock.create({ type, ...payload });
}

async function updateContent(id, payload) {
  return ContentBlock.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });
}

async function deleteContent(id) {
  return ContentBlock.findByIdAndDelete(id);
}

async function getContentByKey(key) {
  return ContentBlock.findOne({
    type: "website-setting",
    settingKey: key
  }).lean();
}

async function upsertSetting(key, value) {
  return ContentBlock.findOneAndUpdate(
    { type: "website-setting", settingKey: key },
    { type: "website-setting", settingKey: key, settingValue: value },
    { new: true, upsert: true }
  );
}

async function getContentById(id) {
  return ContentBlock.findById(id).lean();
}

module.exports = {
  listContent,
  createContent,
  updateContent,
  deleteContent,
  getContentByKey,
  upsertSetting,
  getContentById
};
