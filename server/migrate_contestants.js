require('dotenv').config();
const mongoose = require('mongoose');
const ContentBlock = require('./src/models/ContentBlock');

const season4Finalists = [
  // Junior
  { name: "Aarna Agrawal", category: "Junior", image: "/images/looth.png" },
  { name: "Adaa Srivastava", category: "Junior", image: "/seasons/adaa.png" },
  { name: "Ayami Aadhya", category: "Junior", image: "/seasons/ayaami.png" },
  { name: "Devarsh Sharma", category: "Junior", image: "/images/looth.png" },
  { name: "Dhruv Pandit", category: "Junior", image: "/images/looth.png" },
  { name: "Lavishka Sharma", category: "Junior", image: "/images/looth.png" },
  { name: "Mandeep Singh", category: "Junior", image: "/images/looth.png" },
  { name: "Netra Singh", category: "Junior", image: "/images/looth.png" },
  { name: "Praharsh Kashyap", category: "Junior", image: "/images/looth.png" },
  { name: "Priyanshi", category: "Junior", image: "/images/looth.png" },
  { name: "Shreyas Thakur", category: "Junior", image: "/images/looth.png" },
  { name: "Varin Kakkar", category: "Junior", image: "/seasons/kuvam.png" },
  { name: "Advita Mittal", category: "Junior", image: "/images/looth.png" },
  { name: "Keshav Pandit", category: "Junior", image: "/images/looth.png" },
  // Senior
  { name: "Arijit Roy", category: "Senior", image: "/seasons/arijit.png" },
  { name: "Bhoomi Tyagi", category: "Senior", image: "/images/looth.png" },
  { name: "Chandreyi Banerjee", category: "Senior", image: "/images/looth.png" },
  { name: "Deepshikha Mitra", category: "Senior", image: "/seasons/deepshikha.png" },
  { name: "Kuvam Sethi", category: "Senior", image: "/seasons/kuvam.png" },
  { name: "Maanvi Dwivedi", category: "Senior", image: "/seasons/mandeep.png" },
  { name: "Manoneet Munesha", category: "Senior", image: "/images/looth.png" },
  { name: "Nagma Ali", category: "Senior", image: "/images/looth.png" },
  { name: "Nitin Mishra", category: "Senior", image: "/images/looth.png" },
  { name: "Ruchika Chatterjee", category: "Senior", image: "/images/looth.png" },
  { name: "Sakshi Kumari", category: "Senior", image: "/images/looth.png" },
  { name: "Soumava Mukhopadhyay", category: "Senior", image: "/images/looth.png" },
  { name: "Srishti Sargam", category: "Senior", image: "/seasons/sristi.png" },
  // Super Senior
  { name: "Chetan P. Barodia (Dr.)", category: "Super Senior", image: "/images/looth.png" },
  { name: "Khushjit Singh", category: "Super Senior", image: "/images/looth.png" },
  { name: "Mandeep Negi", category: "Super Senior", image: "/images/looth.png" },
  { name: "P. Kumar (Dr.)", category: "Super Senior", image: "/images/looth.png" },
  { name: "Pritika Singh Gupta", category: "Super Senior", image: "/seasons/pratikia.png" },
  { name: "Rahul Agarwal", category: "Super Senior", image: "/seasons/rahul.png" },
  { name: "Rajat Chakraborthy", category: "Super Senior", image: "/images/looth.png" },
  { name: "Rajesh Kapoor", category: "Super Senior", image: "/seasons/rajesh.png" },
  { name: "Rajesh Laxmi Chand", category: "Super Senior", image: "/images/looth.png" },
  { name: "Vineet Sharma", category: "Super Senior", image: "/seasons/vineet.png" },
];

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
    
    await ContentBlock.deleteMany({ type: 'qualified-contestant' });

    const blocks = season4Finalists.map((f, i) => ({
      type: "qualified-contestant",
      name: f.name,
      role: f.category, 
      imageUrl: f.image,
      season: "Season 4", 
      order: i
    }));

    await ContentBlock.insertMany(blocks);
    console.log("Successfully migrated " + blocks.length + " contestants!");
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

migrate();
