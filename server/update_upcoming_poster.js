require('dotenv').config();
const mongoose = require('mongoose');
const ContentBlock = require('./src/models/ContentBlock');

async function updateSeasons() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Update Upcoming Season (assume year 2027 or title contains upcoming)
    await ContentBlock.updateMany(
      { type: 'season', year: '2027' },
      { $set: { imageUrl: '/seasons/upcomingEvent.png' } }
    );
    // Also try by title if year is empty
    await ContentBlock.updateMany(
      { type: 'season', title: /upcoming/i },
      { $set: { imageUrl: '/seasons/upcomingEvent.png' } }
    );
    
    // Just in case it's in another format
    console.log('DB updated for upcoming event poster.');
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
}

updateSeasons();
