require('dotenv').config();
const mongoose = require('mongoose');

async function test() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  const blocks = await db.collection('contentblocks').find({}).toArray();
  const counts = {};
  blocks.forEach(b => { counts[b.type] = (counts[b.type] || 0) + 1; });
  console.log('ContentBlock types:');
  Object.entries(counts).sort((a,b) => b[1]-a[1]).forEach(([t,c]) => console.log(' ', t, ':', c));
  
  // Also check a sample show/event content block
  const showBlocks = blocks.filter(b => b.type === 'show' || b.type === 'event');
  if (showBlocks.length > 0) {
    console.log('\nShow/Event samples:', JSON.stringify(showBlocks.slice(0,2), null, 2));
  }
  mongoose.disconnect();
}
test().catch(console.error);
