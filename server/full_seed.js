const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const ContentBlock = require("./src/models/ContentBlock");

const seasons = [
  {
    type: "season", title: "Voice of Delhi NCR", subtitle: "Season 1", year: "2018", order: 1,
    meta: { status: "completed", color: "from-amber-500 to-orange-600", lightBg: "from-amber-50 to-orange-50", borderColor: "border-amber-200", winner: "Peehu Srivastava", winnerImg: "/team/Peehu Srivastava (Brand Ambassador).png", description: "The first edition of Voice of Delhi NCR launched DMS Aarohi's flagship competition, bringing together hundreds of singing talents from across the Delhi NCR region for the very first time.", highlights: ["First ever singing competition by DMS Aarohi", "Hundreds of participants from Delhi NCR", "Grand Finale at a prestigious Delhi venue"], youtube: "https://www.youtube.com/channel/UCFmS_dMuj8yvCUcR-X2NdYQ", poster: "/legacy/poster.png" }
  },
  {
    type: "season", title: "Voice of Delhi NCR", subtitle: "Season 2", year: "2019", order: 2,
    meta: { status: "completed", color: "from-orange-500 to-red-500", lightBg: "from-orange-50 to-red-50", borderColor: "border-orange-200", winner: "Grand Finale Champion", winnerImg: "/legacy/about_group.png", description: "Season 2 expanded the competition to reach more cities and localities within Delhi NCR, featuring bigger stages and more competitive rounds than ever before.", highlights: ["Expanded to more Delhi NCR localities", "Celebrity judges panel", "Bigger prize pool"], youtube: "https://youtu.be/kom0cU5fUFE", poster: "/legacy/current_event.jpg" }
  },
  {
    type: "season", title: "Voice of Rajasthan", subtitle: "Season 3", year: "2021", order: 3,
    meta: { status: "completed", color: "from-rose-500 to-pink-600", lightBg: "from-rose-50 to-pink-50", borderColor: "border-rose-200", winner: "Grand Finale Champion", winnerImg: "/legacy/KT.jpg", description: "A special edition \u2014 Voice of Rajasthan \u2014 expanded DMS Aarohi's reach beyond Delhi, celebrating the rich musical heritage of Rajasthan and discovering incredible talent from the region.", highlights: ["Special edition \u2014 Voice of Rajasthan", "First competition outside Delhi NCR", "Celebrated Rajasthani musical heritage"], youtube: "https://www.youtube.com/channel/UCFmS_dMuj8yvCUcR-X2NdYQ", poster: "/legacy/KT.jpg" }
  },
  {
    type: "season", title: "Voice of Delhi NCR", subtitle: "Season 4", year: "2026", order: 4,
    meta: { status: "grand-finale", color: "from-orange-500 to-amber-400", lightBg: "from-orange-50 to-amber-50", borderColor: "border-orange-300", winner: null, winnerImg: null, grandFinale: "4th July 2026", venue: "Pearey Lal Bhawan (Gandhi Memorial Hall), ITO, New Delhi", description: "The most anticipated Grand Finale is here! Voice of Delhi NCR Season 4 culminates in a spectacular Grand Finale on 4th July 2026. Watch the finest voices of Delhi-NCR, including Junior & Senior Category Finalists, compete for the ultimate title. Live music by the DO-RE-MI band!", highlights: ["Grand Finale: 4th July 2026 \u2022 5:00 PM Onwards", "Venue: Pearey Lal Bhawan, ITO, New Delhi", "Junior & Senior Categories", "Live music by DO-RE-MI Band"], youtube: null, poster: "/legacy/poster.png" }
  }
];

const pastShows = [
  { type: "competition", title: "100 Years of Indian Cinema", subtitle: "1st Show of DMS Aarohi", imageUrl: "/images/image1.jpeg", order: 1, meta: { date: "2013", location: "India Islamic Cultural Centre, New Delhi", description: "The very first show of DMS Aarohi. The Indian Cinema has undergone a massive change over the years. It started in 1913 from silent movies to the first talkie in 1931 to the colored movies to the ones today.", tag: "Cultural Event" } },
  { type: "competition", title: "Rafi Saab - The Very Best", subtitle: "94th Birth Anniversary", imageUrl: "/images/card_rafi.jpeg", order: 2, meta: { date: "23rd December, 2013", location: "India Islamic Cultural Centre, Lodhi Road, New Delhi", description: "Tribute to the Singer of the millennium - Mohammad Rafi Sahab by DMS AAROHI Singers on his 94th Birth Anniversary. A soulful evening celebrating the golden era of Indian music.", tag: "Tribute Concert" } },
  { type: "competition", title: "Ek Haseen Shaam Ko", subtitle: "2nd Show - Rafi Tribute", imageUrl: "/images/img3.JPG", order: 3, meta: { date: "2013", location: "India Islamic Cultural Centre, New Delhi", description: "2nd show of DMS AAROHI on Mohd. Rafi. He was an Indian playback singer & one of the most popular & successful singers of the Hindi film industry.", tag: "Tribute Concert" } },
  { type: "competition", title: "Members Show", subtitle: "Open Air Theatre", imageUrl: "/images/img4.jpg", order: 4, meta: { date: "2014", location: "Open Theatre, Dilli Haat, INA, New Delhi", description: "The Musical Evening was enjoyed by all and provided a great platform for the members to engage with the students and encourage them in their endeavors.", tag: "Musical Evening" } },
  { type: "competition", title: "A Tribute to Mohammad Rafi", subtitle: "Legends Live On", imageUrl: "/images/img5.jpg", order: 5, meta: { date: "2014", location: "Pearey Lal Bhawan, New Delhi", description: "Another magical evening dedicated to the legendary Mohammad Rafi, featuring classic hits from the golden era of Bollywood.", tag: "Tribute Concert" } },
  { type: "competition", title: "Dostana-2 - Kishore Kumar Tribute", subtitle: "A Night of Melodies", imageUrl: "/images/img19.JPG", order: 6, meta: { date: "4th August, 2018", location: "India Islamic Cultural Centre, New Delhi", description: "Celebrating the versatility and genius of Kishore Kumar, our talented singers brought his evergreen songs back to life.", tag: "Tribute Concert" } },
  { type: "competition", title: "Bollywood Dhamaka", subtitle: "Blockbuster Hits", imageUrl: "/images/img9.jpg", order: 7, meta: { date: "2015", location: "Amphitheatre, Gurgaon", description: "A high-energy show featuring the biggest Bollywood chartbusters from the 90s to the present, getting the audience on their feet.", tag: "Musical Extravaganza" } }
];

const patrons = [
  { type: "patron", title: "Ashok Srivastava", subtitle: "Chief Patron", imageUrl: "/patrons/Ashok_Srivastava (Chief Patron).png", order: 1, meta: {} },
  { type: "patron", title: "Nalini Kamalni", subtitle: "Patron", imageUrl: "/patrons/NALINI KAMALNI.jpg", order: 2, meta: {} },
  { type: "patron", title: "Radhika Chopra", subtitle: "Patron", imageUrl: "/patrons/RADHIKA CHOPRA.jpg", order: 3, meta: {} },
  { type: "patron", title: "Kumar Vishu", subtitle: "Patron", imageUrl: "/patrons/KUMAR VISHU.jpg", order: 4, meta: {} },
  { type: "patron", title: "G.B. Mathur", subtitle: "Patron", imageUrl: "/patrons/G.B. Mathur (Patron).png", order: 5, meta: {} },
  { type: "patron", title: "Pankaj Mathur", subtitle: "Founder & President", imageUrl: "/team/Pankaj Mathur (Founder & President).JPG", order: 6, meta: { role: "Founder & President", isTeam: true } },
  { type: "patron", title: "Dr. Bhawna Bhat", subtitle: "General Secretary", imageUrl: "/team/Dr Bhawna Bhat (General Secretary).jpg", order: 7, meta: { role: "General Secretary", isTeam: true } },
  { type: "patron", title: "Kapil Tiwari", subtitle: "Vice President", imageUrl: "/team/Kapil Tiwari (Vice President).jpg", order: 8, meta: { role: "Vice President", isTeam: true } },
  { type: "patron", title: "Shalinder Kumar", subtitle: "Vice President", imageUrl: "/team/Shalinder Kumar (Vice President).jpg", order: 9, meta: { role: "Vice President", isTeam: true } },
  { type: "patron", title: "Pratibha Asthana", subtitle: "Secretary", imageUrl: "/team/Pratibha Asthana (Seceratry).jpg", order: 10, meta: { role: "Secretary", isTeam: true } },
  { type: "patron", title: "Sumit Kumar", subtitle: "Legal Advisor", imageUrl: "/team/Sumit Kumar (Legal Advisor).jpg", order: 11, meta: { role: "Legal Advisor", isTeam: true } },
  { type: "patron", title: "Shalini Lal", subtitle: "Executive Member", imageUrl: "/team/Shalini Lal (Executive Member).png", order: 12, meta: { role: "Executive Member", isTeam: true } },
  { type: "patron", title: "Peehu Srivastava", subtitle: "Brand Ambassador", imageUrl: "/team/Peehu Srivastava (Brand Ambassador).png", order: 13, meta: { role: "Brand Ambassador", isTeam: true } }
];

const qualifiedContestants = [
  { type: "qualified-contestant", title: "Adaa", imageUrl: "/seasons/adaa.png", order: 1, meta: { status: "Grand Finalist", city: "Delhi NCR", category: "Junior", score: "98.5" } },
  { type: "qualified-contestant", title: "Arijit", imageUrl: "/seasons/arijit.png", order: 2, meta: { status: "Grand Finalist", city: "Delhi NCR", category: "Senior", score: "96.0" } },
  { type: "qualified-contestant", title: "Ayaami", imageUrl: "/seasons/ayaami.png", order: 3, meta: { status: "Grand Finalist", city: "Delhi NCR", category: "Junior", score: "95.5" } },
  { type: "qualified-contestant", title: "Deepshikha", imageUrl: "/seasons/deepshikha.png", order: 4, meta: { status: "Grand Finalist", city: "Delhi NCR", category: "Senior", score: "94.0" } },
  { type: "qualified-contestant", title: "Kuvam", imageUrl: "/seasons/kuvam.png", order: 5, meta: { status: "Grand Finalist", city: "Delhi NCR", category: "Senior", score: "93.5" } },
  { type: "qualified-contestant", title: "Mandeep", imageUrl: "/seasons/mandeep.png", order: 6, meta: { status: "Grand Finalist", city: "Delhi NCR", category: "Senior", score: "92.0" } },
  { type: "qualified-contestant", title: "Pritika", imageUrl: "/seasons/pratikia.png", order: 7, meta: { status: "Grand Finalist", city: "Delhi NCR", category: "Senior", score: "91.5" } },
  { type: "qualified-contestant", title: "Rahul", imageUrl: "/seasons/rahul.png", order: 8, meta: { status: "Grand Finalist", city: "Delhi NCR", category: "Senior", score: "90.0" } },
  { type: "qualified-contestant", title: "Rajesh", imageUrl: "/seasons/rajesh.png", order: 9, meta: { status: "Grand Finalist", city: "Delhi NCR", category: "Senior", score: "89.5" } },
  { type: "qualified-contestant", title: "Srishti", imageUrl: "/seasons/sristi.png", order: 10, meta: { status: "Grand Finalist", city: "Delhi NCR", category: "Senior", score: "88.0" } },
  { type: "qualified-contestant", title: "Vineet", imageUrl: "/seasons/vineet.png", order: 11, meta: { status: "Grand Finalist", city: "Delhi NCR", category: "Senior", score: "87.5" } },
  { type: "qualified-contestant", title: "Chetan", imageUrl: "/legacy/pp.jpg", order: 12, meta: { status: "Grand Finalist", city: "Delhi NCR", category: "Senior", score: "86.0" } },
  { type: "qualified-contestant", title: "Khushjit", imageUrl: "/legacy/pa.jpg", order: 13, meta: { status: "Grand Finalist", city: "Delhi NCR", category: "Senior", score: "85.5" } }
];

const successStories = [
  { type: "success-story", title: "Peehu Srivastava", subtitle: "Winner - Season 1 (2018)", description: "Voice of Delhi NCR Season 1 Winner. Rising Star on Colors TV and Indian Idol Jr. Mega Finalist on Sony TV. Now Brand Ambassador of DMS Aarohi.", imageUrl: "/team/Peehu Srivastava (Brand Ambassador).png", order: 1, meta: {} },
  { type: "success-story", title: "Season 2 Champion", subtitle: "Voice of Delhi NCR - Season 2", description: "Season 2 brought even bigger talent from across Delhi NCR. The champion's journey inspired hundreds to pursue their musical dreams.", imageUrl: "/legacy/about_group.png", order: 2, meta: {} },
  { type: "success-story", title: "Season 3 Champion", subtitle: "Voice of Rajasthan - Season 3", description: "In a special edition - Voice of Rajasthan - DMS Aarohi expanded its reach and discovered extraordinary talent from Rajasthan.", imageUrl: "/legacy/current_event.jpg", order: 3, meta: {} }
];

const gallery = [
  { type: "gallery", title: "Grand Finale Performance", imageUrl: "/legacy/show.png", order: 1, meta: { type: "Video", season: "Season 1", youtubeLink: "https://youtu.be/kom0cU5fUFE" } },
  { type: "gallery", title: "Classical Solo Act", imageUrl: "/legacy/current_event.jpg", order: 2, meta: { type: "Video", season: "Season 2", youtubeLink: "https://youtu.be/kom0cU5fUFE" } },
  { type: "gallery", title: "Group Fusion", imageUrl: "/legacy/patrons.jpg", order: 3, meta: { type: "Video", season: "Season 3", youtubeLink: "https://youtu.be/kom0cU5fUFE" } },
  { type: "gallery", title: "Audience Favorites", imageUrl: "/legacy/about_group.png", order: 4, meta: { type: "Gallery", season: "Season 4", youtubeLink: "" } },
  { type: "gallery", title: "Winner Announcement", imageUrl: "/legacy/poster.png", order: 5, meta: { type: "Gallery", season: "Season 4", youtubeLink: "" } }
];

const allData = [...pastShows, ...seasons, ...patrons, ...qualifiedContestants, ...successStories, ...gallery];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DB_NAME });
    console.log("MongoDB connected:", process.env.MONGODB_DB_NAME);

    const typesToSeed = ["competition", "season", "patron", "qualified-contestant", "success-story", "gallery"];
    await ContentBlock.deleteMany({ type: { $in: typesToSeed } });
    console.log("Cleared old static data.");

    await ContentBlock.insertMany(allData);
    console.log("Seeded successfully:", allData.length, "items.");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
