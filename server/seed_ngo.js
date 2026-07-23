require('dotenv').config();
const mongoose = require('mongoose');
const Registration = require('./src/models/Registration');
const Submission = require('./src/models/Submission');
const ContentBlock = require('./src/models/ContentBlock');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    // 1. Seed Talent Registrations (formType: 'talent-show')
    const talentCount = await Registration.countDocuments({ formType: 'talent-show' });
    if (talentCount === 0) {
      await Registration.insertMany([
        { formType: 'talent-show', name: 'Arijit Singh', email: 'arijit@example.com', phone: '9876543210', city: 'Mumbai', talentCategory: 'Bollywood', age: '28', gender: 'Male', status: 'pending' },
        { formType: 'talent-show', name: 'Shreya Ghoshal', email: 'shreya@example.com', phone: '9876543211', city: 'Delhi', talentCategory: 'Classical', age: '25', gender: 'Female', status: 'shortlisted' },
        { formType: 'talent-show', name: 'Sonu Nigam', email: 'sonu@example.com', phone: '9876543212', city: 'Noida', talentCategory: 'Ghazal', age: '32', gender: 'Male', status: 'approved' },
      ]);
      console.log('Seeded talent registrations.');
    }

    // 2. Seed NGO Volunteers (formType: 'join-us')
    const volunteerCount = await Registration.countDocuments({ formType: 'join-us' });
    if (volunteerCount < 2) {
      await Registration.insertMany([
        { formType: 'join-us', name: 'Ravi Kumar', email: 'ravi@example.com', phone: '9988776655', city: 'Delhi', talentCategory: 'Blood Donor', age: '24', gender: 'Male', status: 'pending' },
        { formType: 'join-us', name: 'Anita Sharma', email: 'anita@example.com', phone: '9988776644', city: 'Gurgaon', talentCategory: 'Child Mentor / Tutor', age: '29', gender: 'Female', status: 'active' },
        { formType: 'join-us', name: 'Vikram Singh', email: 'vikram@example.com', phone: '9988776633', city: 'Noida', talentCategory: 'Event Organiser', age: '35', gender: 'Male', status: 'contacted' },
      ]);
      console.log('Seeded NGO volunteers.');
    }

    // 3. Seed NGO Queries (Submission formType: 'ngo-contact')
    const queryCount = await Submission.countDocuments({ formType: 'ngo-contact' });
    if (queryCount === 0) {
      await Submission.insertMany([
        { formType: 'ngo-contact', name: 'Ramesh Foundation', email: 'contact@ramesh.org', phone: '1122334455', message: 'We would like to partner for the upcoming blood donation camp.', status: 'pending' },
        { formType: 'ngo-contact', name: 'Priya Verma', email: 'priya@example.com', phone: '1122334466', message: 'How can I donate books for the children?', status: 'replied' },
      ]);
      console.log('Seeded NGO queries.');
    }

    // 4. Seed NGO Content (ngo-gallery, ngo-camp, ngo-initiative)
    const ngoGalleryCount = await ContentBlock.countDocuments({ type: 'ngo-gallery' });
    if (ngoGalleryCount === 0) {
      await ContentBlock.insertMany([
        { type: 'ngo-gallery', title: 'Food Distribution Drive', imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&q=80', description: 'Distributing meals in slum areas.' },
        { type: 'ngo-gallery', title: 'Winter Clothes Donation', imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&q=80', description: 'Winter clothes distribution.' },
      ]);
      console.log('Seeded ngo-gallery.');
    }

    const ngoCampCount = await ContentBlock.countDocuments({ type: 'ngo-camp' });
    if (ngoCampCount === 0) {
      await ContentBlock.insertMany([
        { type: 'ngo-camp', title: 'Mega Blood Donation Camp', subtitle: 'Save Lives', year: '2024', imageUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=500&q=80', description: 'Collected over 500 units of blood.' },
      ]);
      console.log('Seeded ngo-camp.');
    }

    const ngoInitCount = await ContentBlock.countDocuments({ type: 'ngo-initiative' });
    if (ngoInitCount === 0) {
      await ContentBlock.insertMany([
        { type: 'ngo-initiative', title: 'Education for All', subtitle: 'Teaching underprivileged kids', imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80', description: 'Free evening classes for children in Noida slums.' },
      ]);
      console.log('Seeded ngo-initiative.');
    }

    console.log('Done!');
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
}

seed();
