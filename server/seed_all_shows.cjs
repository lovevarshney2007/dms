const mongoose = require("mongoose");
require("dotenv").config({ path: require('path').join(__dirname, '.env') });
const ContentBlock = require("./src/models/ContentBlock");

const fallbackShows = [
  {
    id: 1,
    title: "100 Years of Indian Cinema",
    subtitle: "1st Show of DMS Aarohi",
    date: "2013",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "The very first show of DMS Aarohi. The Indian Cinema has undergone a massive change over the years. It started in 1913 from silent movies to the first talkie in 1931 to the colored movies to the ones today.",
    image: "/images/image1.jpeg",
    tag: "Cultural Event"
  },
  {
    id: 2,
    title: "Rafi Saab — The Very Best",
    subtitle: "94th Birth Anniversary",
    date: "23rd December, 2013",
    location: "India Islamic Cultural Centre, Lodhi Road, New Delhi",
    description: "Tribute to the Singer of the millennium — Mohammad Rafi Sahab by DMS AAROHI Singers on his 94th Birth Anniversary. A soulful evening celebrating the golden era of Indian music.",
    image: "/images/card_rafi.jpeg",
    tag: "Tribute Concert"
  },
  {
    id: 3,
    title: "Ek Haseen Shaam Ko",
    subtitle: "2nd Show — Rafi Tribute",
    date: "2013",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "2nd show of DMS AAROHI on Mohd. Rafi. He was an Indian playback singer & one of the most popular & successful singers of the Hindi film industry.",
    image: "/images/img3.JPG",
    tag: "Tribute Concert"
  },
  {
    id: 4,
    title: "Members Show",
    subtitle: "Open Air Theatre",
    date: "2014",
    location: "Open Theatre, Dilli Haat, INA, New Delhi",
    description: "The Musical Evening was enjoyed by all and provided a great platform for the members to engage with the students and encourage them in their endeavors.",
    image: "/images/img4.jpg",
    tag: "Musical Evening"
  },
  {
    id: 5,
    title: "A Tribute to Mohammad Rafi",
    subtitle: "Special Edition",
    date: "2014",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "Another show in 2014 with a song for every emotion. Sahab's voice continues to bind people across generations and geographies.",
    image: "/images/img5.jpg",
    tag: "Tribute Concert"
  },
  {
    id: 6,
    title: "Shaam-e-Sangam",
    subtitle: "R.D. Burman & Kishore Kumar Night",
    date: "2014",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "The music of Burman's are awesome — each and every song that Kishore Kumar sang for him are heart touching and cannot be expressed in words.",
    image: "/images/img6.jpg",
    tag: "Musical Evening"
  },
  {
    id: 7,
    title: "Kishore Kumar",
    subtitle: "Dev Anand Special",
    date: "2015",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "Kishore Kumar was ideally the best playback singer for Dev Anand and together they gave several super hit songs.",
    image: "/images/img7.jpg",
    tag: "Kishore Tribute"
  },
  {
    id: 8,
    title: "Melodious Queens of Bollywood",
    subtitle: "Asha Bhosle Special",
    date: "September 2015",
    location: "Gurgaon",
    description: "Show on Melodious Queen of Bollywood Asha Bhosle in Gurgaon by Anuja Sinha.",
    image: "/images/img8.jpg",
    tag: "Musical Evening"
  },
  {
    id: 9,
    title: "Bollywood Dhamaka",
    subtitle: "Amphitheatre Special",
    date: "2015",
    location: "Amphitheatre, Gurgaon",
    description: "Another show by DMS AAROHI in Amphitheatre in Gurgaon covering all genres of Bollywood music.",
    image: "/images/img9.jpg",
    tag: "Bollywood Night"
  },
  {
    id: 10,
    title: "Ek Shaam Rafi Ke Naam",
    subtitle: "11th Show of DMS Aarohi",
    date: "2015",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "11th show of DMS AAROHI on Mohd. Rafi — a special tribute to the legend of Indian music.",
    image: "/images/img10.jpg",
    tag: "Tribute Concert"
  },
  {
    id: 11,
    title: "Main Hu Jhumroo — Kishore Sings for Kishore",
    subtitle: "Special Edition",
    date: "30th April, 2016",
    location: "India Islamic Cultural Centre, Lodhi Road, New Delhi",
    description: "Dedicated to Gurudev Kishore Da, the immeasurable depth of many of Kishore Da's songs is what has tugged at the hearts of listeners for decades & continues to do so.",
    image: "/images/img11.jpg",
    tag: "Kishore Tribute"
  },
  {
    id: 12,
    title: "The Garam Dharam",
    subtitle: "Dharmendra Special",
    date: "9th April, 2016",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "Another Hit Show of DMS AAROHI on Garam Dharam – Dharmendra on 9th April, 2016.",
    image: "/images/img12.jpg",
    tag: "Bollywood Night"
  },
  {
    id: 13,
    title: "Signatures of the Greatest Superstars",
    subtitle: "Kishore Kumar Tribute",
    date: "2016",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "Kishore Kumar Sings for the greatest superstars in Bollywood — Dev Anand, Rajesh Khanna & Amitabh Bachchan by Pankaj Mathur.",
    image: "/images/img13.jpg",
    tag: "Kishore Tribute"
  },
  {
    id: 14,
    title: "Remembering Mukesh",
    subtitle: "Musical Tribute",
    date: "December 2016",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "'Remembering Mukesh' in December 2016. He is considered to be one of the most popular and acclaimed singers of the Hindi film industry.",
    image: "/images/img14.jpg",
    tag: "Tribute Concert"
  },
  {
    id: 15,
    title: "Madan Mohan Night",
    subtitle: "The Maestro of Ghazals",
    date: "2016",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "Madan Mohan was a popular and unparalleled Indian music director from 1950–1970. He is particularly remembered for the immortal Ghazals.",
    image: "/images/img15.jpg",
    tag: "Musical Evening"
  },
  {
    id: 16,
    title: "Remembering Rafi Saab",
    subtitle: "37th Barsi Special",
    date: "July 2017",
    location: "India Islamic Cultural Centre, Lodhi Road, New Delhi",
    description: "Tribute to the Singer of the millennium Rafi Sahab by DMS AAROHI Singers on his 37th Barsi. Remembering Rafi Sahab on his Birthday — an Indian playback singer and one of the most popular singers of Hindi film industry.",
    image: "/images/img16.jpg",
    tag: "Tribute Concert"
  },
  {
    id: 17,
    title: "Dostana",
    subtitle: "Rafi & Kishore — Greatest Friends",
    date: "2017",
    location: "India Islamic Cultural Centre, New Delhi",
    description: "Great Legends: Greatest Friends — particularly in regard to the lasting friendship that existed between two of these titanic icons of the Hindi music industry.",
    image: "/images/img17.jpg",
    tag: "Musical Evening"
  },
  {
    id: 18,
    title: "Voice of Delhi-NCR",
    subtitle: "Talent Hunt — Season 1",
    date: "2018",
    location: "Multiple Venues, Delhi NCR",
    description: "DMS Aarohi's flagship singing talent hunt that discovered hundreds of emerging voices from across the Delhi NCR region. Season 1 Winner: Peehu Srivastava.",
    image: "/images/img18.jpg",
    tag: "Talent Hunt"
  },
  {
    id: 19,
    title: "Dostana-2",
    subtitle: "Tribute to Kishore Kumar",
    date: "4th August, 2018",
    location: "India Islamic Cultural Centre, Lodhi Road, New Delhi",
    description: "Dedicated to Gurudev, the immeasurable depth of many of Kishore Da's songs is what has tugged at the hearts of listeners for decades & continues to do so.",
    image: "/images/img19.JPG",
    tag: "Kishore Tribute"
  },
  {
    id: 20,
    title: "Voice of Delhi-NCR",
    subtitle: "Talent Hunt — Season 2",
    date: "2019",
    location: "Multiple Venues, Delhi NCR",
    description: "Season 2 expanded to more cities, featuring celebrity judges and bigger prize pools for talented singers from the Delhi NCR region.",
    image: "/images/img20.jpg",
    tag: "Talent Hunt"
  },
  {
    id: 21,
    title: "Voice of Rajasthan",
    subtitle: "Season 3 — Special Edition",
    date: "2021",
    location: "Rajasthan",
    description: "A special edition — Voice of Rajasthan — expanded DMS Aarohi's reach beyond Delhi NCR, celebrating the rich musical heritage of Rajasthan.",
    image: "/images/img21.jpg",
    tag: "Special Edition"
  }
];

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://127.0.0.1:27017/dms_aarohi";

async function seedAllShows() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
    
    // Fetch existing shows
    const existingShows = await ContentBlock.find({ type: "competition" });
    const existingTitles = existingShows.map(s => s.title.toLowerCase().trim());
    
    let added = 0;
    
    for (let i = 0; i < fallbackShows.length; i++) {
      const show = fallbackShows[i];
      if (!existingTitles.includes(show.title.toLowerCase().trim())) {
        await ContentBlock.create({
          type: "competition",
          title: show.title,
          subtitle: show.subtitle,
          description: show.description,
          imageUrl: show.image,
          order: existingShows.length + added + 1,
          meta: {
            date: show.date,
            location: show.location,
            tag: show.tag
          }
        });
        added++;
        console.log(`Added missing show: ${show.title}`);
      } else {
        console.log(`Show already exists: ${show.title}`);
      }
    }
    
    console.log(`Finished adding ${added} shows.`);
  } catch (error) {
    console.error("Error seeding shows:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedAllShows();
