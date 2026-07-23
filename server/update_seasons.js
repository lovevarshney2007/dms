require('dotenv').config();
const mongoose = require('mongoose');
const ContentBlock = require('./src/models/ContentBlock');

async function updateSeasons() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Season 1 (2018)
    await ContentBlock.updateOne(
      { type: 'season', year: '2018' },
      { $set: { imageUrl: '/seasons/season_1_poster.jpeg' } }
    );
    // Season 2 (2019)
    await ContentBlock.updateOne(
      { type: 'season', year: '2019' },
      { $set: { imageUrl: '/seasons/season_2_poster.png' } }
    );
    // Season 3 (2021)
    await ContentBlock.updateOne(
      { type: 'season', year: '2021' },
      { $set: { imageUrl: '/seasons/season_3_poster_rajsathan.png' } }
    );
    // Season 4 (2026)
    await ContentBlock.updateOne(
      { type: 'season', year: '2026' },
      { $set: { imageUrl: '/seasons/season_4_poster.png' } }
    );

    console.log('Seasons updated with image URLs');
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
}

updateSeasons();
