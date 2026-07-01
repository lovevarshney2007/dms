const mongoose = require("mongoose");
require("dotenv").config({ path: require('path').join(__dirname, '.env') });
const ContentBlock = require("./src/models/ContentBlock");

// Dummy Data
const pastShows = [
  { type: "competition", title: "100 Years of Indian Cinema", subtitle: "1st Show of DMS Aarohi", description: "The very first show of DMS Aarohi. The Indian Cinema has undergone a massive change over the years. It started in 1913 from silent movies to the first talkie in 1931 to the colored movies to the ones today.", imageUrl: "/legacy/patrons.jpg", year: "2013", order: 1 },
  { type: "competition", title: "Rafi Saab — The Very Best", subtitle: "94th Birth Anniversary", description: "Tribute to the Singer of the millennium — Mohammad Rafi Sahab by DMS AAROHI Singers on his 94th Birth Anniversary. A soulful evening celebrating the golden era of Indian music.", imageUrl: "/legacy/patrons.jpg", year: "2013", order: 2 },
  { type: "competition", title: "Ek Haseen Shaam Ko", subtitle: "2nd Show — Rafi Tribute", description: "2nd show of DMS AAROHI on Mohd. Rafi. He was an Indian playback singer & one of the most popular & successful singers of the Hindi film industry.", imageUrl: "/legacy/current_event.jpg", year: "2013", order: 3 },
  { type: "competition", title: "Members Show", subtitle: "Open Air Theatre", description: "The Musical Evening was enjoyed by all and provided a great platform for the members to engage with the students and encourage them in their endeavors.", imageUrl: "/legacy/about_group.png", year: "2014", order: 4 },
  { type: "competition", title: "A Tribute to Mohammad Rafi", subtitle: "Remembering the Legend", description: "Another soulful tribute by the society to remember the iconic voice of Indian cinema. His songs bring back the golden memories of the past.", imageUrl: "/legacy/image1.jpeg", year: "2015", order: 5 },
  { type: "competition", title: "Bollywood Dhamaka", subtitle: "Amphitheatre Special", description: "An electrifying evening of high-energy Bollywood performances by our rising stars. The open-air setting added to the magical experience.", imageUrl: "/legacy/show.png", year: "2015", order: 6 },
  { type: "competition", title: "Dostana-2", subtitle: "Kishore Kumar Tribute", description: "A spectacular tribute to Kishore Da. DMS Aarohi celebrated his timeless classics with power-packed performances by our most versatile singers.", imageUrl: "/legacy/current_event.jpg", year: "2018", order: 7 }
];

const seasons = [
  { type: "season", title: "Season 1", subtitle: "First ever singing competition by DMS Aarohi", description: "The first edition of Voice of Delhi NCR launched DMS Aarohi's flagship competition, bringing together hundreds of aspiring singers for a grand showcase of talent.", year: "2018", order: 1 },
  { type: "season", title: "Season 2", subtitle: "Bigger & Better", description: "Season 2 expanded the competition to reach more cities and localities within Delhi NCR, featuring bigger stages and more intense battles.", year: "2019", order: 2 },
  { type: "season", title: "Season 3", subtitle: "Voice of Rajasthan", description: "First competition outside Delhi NCR. We expanded to discover extraordinary talent from Rajasthan, bringing a unique cultural flair to the stage.", year: "2023", order: 3 }
];

const patrons = [
  { type: "patron", title: "Ashok Srivastava", subtitle: "Chief Patron", imageUrl: "/patrons/Ashok_Srivastava (Chief Patron).png", order: 1 },
  { type: "patron", title: "Nalini Kamalni", subtitle: "Patron", imageUrl: "/patrons/NALINI KAMALNI.jpg", order: 2 },
  { type: "patron", title: "Radhika Chopra", subtitle: "Patron", imageUrl: "/patrons/RADHIKA CHOPRA.jpg", order: 3 },
  { type: "patron", title: "Kumar Vishu", subtitle: "Patron", imageUrl: "/patrons/KUMAR VISHU.jpg", order: 4 },
  { type: "patron", title: "G.B. Mathur", subtitle: "Patron", imageUrl: "/patrons/G.B. Mathur (Patron).png", order: 5 },
  { type: "patron", title: "Pankaj Mathur", subtitle: "Founder & President", imageUrl: "/team/Pankaj Mathur (Founder & President).JPG", order: 6 },
  { type: "patron", title: "Dr. Bhawna Bhat", subtitle: "General Secretary", imageUrl: "/team/Dr Bhawna Bhat (General Secretary).jpg", order: 7 },
  { type: "patron", title: "Kapil Tiwari", subtitle: "Vice President", imageUrl: "/team/Kapil Tiwari (Vice President).jpg", order: 8 },
  { type: "patron", title: "Shalinder Kumar", subtitle: "Vice President", imageUrl: "/team/Shalinder Kumar (Vice President).jpg", order: 9 },
  { type: "patron", title: "Pratibha Asthana", subtitle: "Secretary", imageUrl: "/team/Pratibha Asthana (Seceratry).jpg", order: 10 },
  { type: "patron", title: "Sumit Kumar", subtitle: "Legal Advisor", imageUrl: "/team/Sumit Kumar (Legal Advisor).jpg", order: 11 },
  { type: "patron", title: "Shalini Lal", subtitle: "Executive Member", imageUrl: "/team/Shalini Lal (Executive Member).png", order: 12 },
  { type: "patron", title: "Peehu Srivastava", subtitle: "Brand Ambassador", imageUrl: "/team/Peehu Srivastava (Brand Ambassador).png", order: 13 }
];

const qualifiedContestants = [
  { type: "qualified-contestant", title: "Adaa", subtitle: "Grand Finalist (Junior) - Delhi NCR", imageUrl: "/seasons/adaa.png", order: 1 },
  { type: "qualified-contestant", title: "Arijit", subtitle: "Grand Finalist (Senior) - Delhi NCR", imageUrl: "/seasons/arijit.png", order: 2 },
  { type: "qualified-contestant", title: "Ayaami", subtitle: "Grand Finalist (Junior) - Delhi NCR", imageUrl: "/seasons/ayaami.png", order: 3 },
  { type: "qualified-contestant", title: "Deepshikha", subtitle: "Grand Finalist (Senior) - Delhi NCR", imageUrl: "/seasons/deepshikha.png", order: 4 },
  { type: "qualified-contestant", title: "Kuvam", subtitle: "Grand Finalist (Senior) - Delhi NCR", imageUrl: "/seasons/kuvam.png", order: 5 },
  { type: "qualified-contestant", title: "Mandeep", subtitle: "Grand Finalist (Senior) - Delhi NCR", imageUrl: "/seasons/mandeep.png", order: 6 },
  { type: "qualified-contestant", title: "Pritika", subtitle: "Grand Finalist (Senior) - Delhi NCR", imageUrl: "/seasons/pratikia.png", order: 7 },
  { type: "qualified-contestant", title: "Rahul", subtitle: "Grand Finalist (Senior) - Delhi NCR", imageUrl: "/seasons/rahul.png", order: 8 },
  { type: "qualified-contestant", title: "Rajesh", subtitle: "Grand Finalist (Senior) - Delhi NCR", imageUrl: "/seasons/rajesh.png", order: 9 },
  { type: "qualified-contestant", title: "Srishti", subtitle: "Grand Finalist (Senior) - Delhi NCR", imageUrl: "/seasons/sristi.png", order: 10 },
  { type: "qualified-contestant", title: "Vineet", subtitle: "Grand Finalist (Senior) - Delhi NCR", imageUrl: "/seasons/vineet.png", order: 11 },
  { type: "qualified-contestant", title: "Chetan", subtitle: "Grand Finalist (Senior) - Delhi NCR", imageUrl: "/legacy/pp.jpg", order: 12 },
  { type: "qualified-contestant", title: "Khushjit", subtitle: "Grand Finalist (Senior) - Delhi NCR", imageUrl: "/legacy/pa.jpg", order: 13 }
];

const successStories = [
  { type: "success-story", title: "Peehu Srivastava", subtitle: "Winner — Season 1 (2018)", description: "Voice of Delhi NCR Season 1 Winner. Rising Star on Colors TV and Indian Idol Jr. Mega Finalist on Sony TV. Now Brand Ambassador of DMS Aarohi.", imageUrl: "/team/Peehu Srivastava (Brand Ambassador).png", order: 1 },
  { type: "success-story", title: "Season 2 Champion", subtitle: "Voice of Delhi NCR — Season 2", description: "Season 2 brought even bigger talent from across Delhi NCR. The champion's journey inspired hundreds to pursue their musical dreams.", imageUrl: "/legacy/about_group.png", order: 2 },
  { type: "success-story", title: "Season 3 Champion", subtitle: "Voice of Rajasthan — Season 3", description: "In a special edition — Voice of Rajasthan — DMS Aarohi expanded its reach and discovered extraordinary talent from Rajasthan.", imageUrl: "/legacy/current_event.jpg", order: 3 }
];

const testimonials = [
  { type: "testimonial", title: "A Season 1 Participant", subtitle: "Voice of Delhi NCR — Season 1", description: "DMS Aarohi gave me the stage I always dreamt of. Performing in front of such amazing judges boosted my confidence to another level.", imageUrl: "/legacy/pa.jpg", order: 1 },
  { type: "testimonial", title: "A Season 2 Finalist", subtitle: "Voice of Delhi NCR — Season 2", description: "The mentorship provided during the competition is unparalleled. I grew not just as a singer, but as a performer.", imageUrl: "/legacy/pp.jpg", order: 2 },
  { type: "testimonial", title: "A Season 3 Participant", subtitle: "Voice of Rajasthan — Season 3", description: "From online auditions to the grand finale stage, the entire journey was magical and extremely transparent.", imageUrl: "/legacy/pa.jpg", order: 3 }
];

const allData = [...pastShows, ...seasons, ...patrons, ...qualifiedContestants, ...successStories, ...testimonials];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DB_NAME });
    console.log("MongoDB connected:", process.env.MONGODB_DB_NAME);

    // Delete old seed data of these types before inserting to prevent duplicates
    const typesToSeed = ["competition", "season", "patron", "qualified-contestant", "success-story", "testimonial"];
    await ContentBlock.deleteMany({ type: { $in: typesToSeed } });
    console.log("Cleared old static data.");

    await ContentBlock.insertMany(allData);
    console.log("Seeded successfully:", allData.length, "items.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
