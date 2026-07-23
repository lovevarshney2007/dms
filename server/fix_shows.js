const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const clientFile = path.join(__dirname, '../client/src/pages/musicSociety/MusicSocietyShowsPage.jsx');
let content = fs.readFileSync(clientFile, 'utf8');

const imageMap = {
  1: '/images/image1.jpeg',
  2: '/images/card_rafi.jpeg',
  3: '/images/img3.JPG',
  4: '/images/img4.jpg',
  5: '/images/img5.jpg',
  6: '/images/img6.jpg',
  7: '/images/img7.jpg',
  8: '/images/img8.jpg',
  9: '/images/img9.jpg',
  10: '/images/img10.jpg',
  11: '/images/img11.jpg',
  12: '/images/img12.jpg',
  13: '/images/img13.jpg',
  14: '/images/img14.jpg',
  15: '/images/img15.jpg',
  16: '/images/img16.jpg',
  17: '/images/img17.jpg',
  18: '/images/img18.jpg',
  19: '/images/img19.JPG',
  20: '/images/img20.jpg',
  21: '/images/img21.jpg'
};

// 1. Fix the frontend fallback array
// We can find each block by id and replace its image.
for (let id = 1; id <= 21; id++) {
  const newImage = imageMap[id];
  // Regex to match id: <id>, ... image: "...",
  const regex = new RegExp(`(id:\\s*${id}\\s*,[\\s\\S]*?image:\\s*)"[^"]+"`, 'g');
  content = content.replace(regex, `$1"${newImage}"`);
}

fs.writeFileSync(clientFile, content, 'utf8');
console.log('Fixed MusicSocietyShowsPage.jsx');

// 2. Fix the server seed script
const seedFile = path.join(__dirname, 'seed_all_shows.cjs');
if (fs.existsSync(seedFile)) {
  let seedContent = fs.readFileSync(seedFile, 'utf8');
  for (let id = 1; id <= 21; id++) {
    const newImage = imageMap[id];
    const regex = new RegExp(`(id:\\s*${id}\\s*,[\\s\\S]*?image:\\s*)"[^"]+"`, 'g');
    seedContent = seedContent.replace(regex, `$1"${newImage}"`);
  }
  fs.writeFileSync(seedFile, seedContent, 'utf8');
  console.log('Fixed seed_all_shows.cjs');
}

// 3. Fix the full_seed.js
const fullSeedFile = path.join(__dirname, 'full_seed.js');
if (fs.existsSync(fullSeedFile)) {
  let fullSeedContent = fs.readFileSync(fullSeedFile, 'utf8');
  const pastShowsRegex = /const pastShows = \[([\s\S]*?)\];/;
  const match = fullSeedContent.match(pastShowsRegex);
  if (match) {
    let pastShowsStr = match[1];
    // This has objects like { type: "competition", title: "100 Years of Indian Cinema", ..., imageUrl: "/legacy/patrons.jpg", ... }
    const titles = [
      { t: "100 Years of Indian Cinema", img: imageMap[1] },
      { t: "Rafi Saab - The Very Best", img: imageMap[2] },
      { t: "Ek Haseen Shaam Ko", img: imageMap[3] },
      { t: "Members Show", img: imageMap[4] },
      { t: "A Tribute to Mohammad Rafi", img: imageMap[5] },
      { t: "Dostana-2 - Kishore Kumar Tribute", img: imageMap[19] },
      { t: "Bollywood Dhamaka", img: imageMap[9] }
    ];
    for (const item of titles) {
      const r = new RegExp(`(title:\\s*"${item.t}"[\\s\\S]*?imageUrl:\\s*)"[^"]+"`, 'g');
      pastShowsStr = pastShowsStr.replace(r, `$1"${item.img}"`);
    }
    fullSeedContent = fullSeedContent.replace(pastShowsRegex, `const pastShows = [${pastShowsStr}];`);
    fs.writeFileSync(fullSeedFile, fullSeedContent, 'utf8');
    console.log('Fixed full_seed.js');
  }
}

// 4. Update the DB directly
require('dotenv').config({ path: path.join(__dirname, '.env') });
async function fixDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
    const ContentBlock = require('./src/models/ContentBlock');
    
    // We need to map title to image
    const fallbackShowsMatch = content.match(/const fallbackShows = (\[[\s\S]*?\]);/);
    if (fallbackShowsMatch) {
      // Evaluate the array
      const fallbackShows = eval(fallbackShowsMatch[1]);
      for (const show of fallbackShows) {
        await ContentBlock.updateOne(
          { type: 'competition', title: show.title },
          { $set: { imageUrl: show.image } }
        );
        console.log('Updated DB for', show.title, show.image);
      }
    }
  } catch (err) {
    console.error('DB Update Error:', err);
  } finally {
    mongoose.disconnect();
  }
}

fixDB();
