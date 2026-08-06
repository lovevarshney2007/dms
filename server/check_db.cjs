const mongoose = require('mongoose');

async function check() {
  const uri = 'mongodb+srv://dmsaarohi_db_user:6b5mX6mlmEpmgDMu@dmsaarohi.8pmz1hu.mongodb.net/?appName=Dmsaarohi';
  try {
    await mongoose.connect(uri, { family: 4 });
    console.log("Connected successfully to SRV with family 4.");
    process.exit(0);
  } catch (err) {
    console.log("SRV failed, trying direct with family 4...");
    const directUri = 'mongodb://dmsaarohi_db_user:6b5mX6mlmEpmgDMu@ac-rcgtre5-shard-00-00.8pmz1hu.mongodb.net:27017,ac-rcgtre5-shard-00-01.8pmz1hu.mongodb.net:27017,ac-rcgtre5-shard-00-02.8pmz1hu.mongodb.net:27017/Dmsaarohi?ssl=true&replicaSet=atlas-rcgtre5-shard-0&authSource=admin&retryWrites=true&w=majority';
    try {
      await mongoose.connect(directUri, { family: 4 });
      console.log("Connected successfully to direct URI with family 4.");
      process.exit(0);
    } catch (e2) {
      console.error(e2);
      process.exit(1);
    }
  }
}
check();
