import "./index.css";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import AboutSection from "./components/AboutSection";
import TalentHuntSection from "./components/TalentHuntSection";
import SocialInitiativeSection from "./components/SocialInitiativeSection";
import TeamSection from "./components/TeamSection";
import ContactSection from "./components/ContactSection";
import RegistrationSection from "./components/RegistrationSection";
import VolunteerSection from "./components/VolunteerSection";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSlider />
        <AboutSection />
        <TalentHuntSection />
        <SocialInitiativeSection />
        <TeamSection />
        <ContactSection />
        <RegistrationSection />
        <VolunteerSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
