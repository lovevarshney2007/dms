const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://dmsaarohi_db_user:6b5mX6mlmEpmgDMu@dmsaarohi.8pmz1hu.mongodb.net/?appName=Dmsaarohi';
async function run() {
  try {
    console.log('Connecting...');
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected!');
    const db = client.db('test');
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    // Also fetch gallery images
    const images = await db.collection('galleryimages').find().toArray();
    console.log('Found gallery images:', images.length);
    
    await client.close();
  } catch (e) {
    console.error(e);
  }
}
run();