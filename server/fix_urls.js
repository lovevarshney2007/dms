const mongoose = require('mongoose');
require('dotenv').config();

const NgoGalleryImage = require('./src/models/NgoGalleryImage');
const NgoHeroSlide = require('./src/models/NgoHeroSlide');
const NgoTeamMember = require('./src/models/NgoTeamMember');
const NgoInitiativeContent = require('./src/models/NgoInitiativeContent');
const NgoEvent = require('./src/models/NgoEvent');

async function fixUrls() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const oldUrl = 'http://localhost:5000';
  const newUrl = 'http://localhost:5051';

  async function replaceInModel(Model, fields) {
    const docs = await Model.find();
    let count = 0;
    for (const doc of docs) {
      let changed = false;
      for (const field of fields) {
        if (doc[field] && doc[field].includes(oldUrl)) {
          doc[field] = doc[field].replace(oldUrl, newUrl);
          changed = true;
        }
      }
      if (changed) {
        await doc.save();
        count++;
      }
    }
    console.log(`Updated ${count} documents in ${Model.modelName}`);
  }

  await replaceInModel(NgoGalleryImage, ['url']);
  await replaceInModel(NgoHeroSlide, ['image']);
  await replaceInModel(NgoTeamMember, ['image']);
  await replaceInModel(NgoInitiativeContent, ['aboutImage']);
  await replaceInModel(NgoEvent, ['image']);

  mongoose.disconnect();
}
fixUrls().catch(console.error);