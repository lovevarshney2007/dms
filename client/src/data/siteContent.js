export const highlights = [
  "Registered under the Societies Registration Act, 1860",
  "Dedicated to discovering and nurturing singing talent",
  "Runs talent hunt, live shows, and stage competitions"
];

export const performances = [
  {
    title: "Live Singing Competitions",
    text: "DMS Aarohi organizes major singing contests across Delhi-NCR to discover hidden voices."
  },
  {
    title: "Talent Hunt Platform",
    text: "The society creates real stage visibility for emerging singers through structured auditions."
  },
  {
    title: "Grand Finales & Shows",
    text: "Top talents perform in grand finale events in front of celebrity judges and large audiences."
  }
];

export const objectives = [
  "Promote singing talent and Indian musical heritage.",
  "Arrange concerts and competitive performances for rising stars.",
  "Provide a transparent, merit-based platform for young singers to express their skills.",
  "Guide and mentor participants for professional musical careers."
];

export const teamMembers = [
  { name: "Pankaj Mathur", role: "Founder President", image: "/legacy/pp.jpg" },
  { name: "Rakesh Kala", role: "Vice President", image: "/legacy/bd1.jpg" },
  { name: "Bhawna Bhatt", role: "General Secretary", image: "/legacy/Bhawna Bhatt.jpg" },
  { name: "Pratibha Asthana", role: "Secretary", image: "/legacy/pa.jpg" },
  { name: "RB Mathur", role: "Treasurer", image: "/legacy/RB Mathur.jpg" },
  { name: "Mohit Data", role: "Executive Member", image: "/legacy/Mohit Data.jpg" },
  { name: "Rahul Yadav", role: "Executive Member", image: "/legacy/Rahul Yadav.jpg" },
  { name: "Saurabh Gangal", role: "Executive Member", image: "/legacy/Saurabh Gangal.jpg" },
  { name: "Kapil Tiwari", role: "Executive Member", image: "/legacy/KT.jpg" },
  { name: "Swati Tamahne", role: "Executive Member", image: "/legacy/ST.jpg" }
];

// New data for Leaderboard
export const leaderboardData = [
  { rank: 1, name: "Aarav Sharma", score: 98, city: "New Delhi", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80" },
  { rank: 2, name: "Priya Singh", score: 95, city: "Gurgaon", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" },
  { rank: 3, name: "Rohan Kapoor", score: 92, city: "Noida", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80" },
  { rank: 4, name: "Neha Verma", score: 89, city: "Faridabad", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" },
  { rank: 5, name: "Vikram Desai", score: 85, city: "New Delhi", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80" }
];

// New data for Upcoming Events

export const upcomingEvents = [
  {
    id: 1,
    title: "🎤 Voice of Delhi-NCR Season 4 Grand Finale",
    date: "July 4, 2026 • 5:00 PM Onwards",
    location: "Pearey Lal Bhawan (Gandhi Memorial Hall), ITO, New Delhi",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    description: "Join us for an unforgettable evening as the finest voices of Delhi-NCR, including our Junior Category Finalists, compete for the ultimate title! Features live music by the DO-RE-MI band. FREE ENTRY for all music lovers!"
  }
];

// New data for Past Events (Logically corrected & updated with working images)
export const pastEvents = [
  {
    id: 1,
    title: "Season 3 Grand Finale",
    date: "December 10, 2024",
    location: "Talkatora Stadium",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtyVP6J7j966N7KGncoNrvMdmLeErmSHUKog&s"
  },
  {
    id: 2,
    title: "Monsoon Melodies Unplugged",
    date: "July 05, 2024",
    location: "Dilli Haat",
    image: "https://tennews.in/wp-content/uploads/2018/02/DSC01780.jpg"
  },
  {
    id: 3,
    title: "Sufi Night Special",
    date: "March 22, 2024",
    location: "India Habitat Centre",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaWV-zJ1zZLggeh25DE_JjDiDwqrtaJEVg6Q&s"
  }
];
export const contactDetails = [
  ["Email", "dmsaarohi@gmail.com"],
  ["Phone", "+91-9810225442"],
  ["Address", "A5, 272, Paschim Vihar, New Delhi"]
];

export const eventDetails = [
  ["Event Series", "DMS Aarohi Singing Talent Hunt"],
  ["Format", "Live stage singing platform"],
  ["Contact", "dmsaarohi@gmail.com | +91-9810225442"]
];

export const defaultContactForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: ""
};

export const defaultJoinUsForm = {
  fullName: "",
  stageName: "",
  age: "",
  gender: "Male",
  city: "",
  phone: "",
  email: "",
  talentCategory: "Singer",
  languagePreference: "Hindi",
  videoLink: "",
  shortIntroduction: ""
};
