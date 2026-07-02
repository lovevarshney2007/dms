import { Link } from "react-router-dom";
import SectionHeading from "../../components/common/SectionHeading";
import ScrollReveal from "../../components/common/ScrollReveal";
import { objectives, teamData } from "../../data/siteContent";
import { usePageMeta } from "../../hooks/usePageMeta";
import { useState } from "react";

// Updated milestones with corrected season names
const milestones = [
  { year: "2013", title: "Society Founded", desc: "DMS Aarohi Musical Society was registered under the Societies Registration Act, 1860 with a vision to promote Indian music." },
  { year: "2018", title: "Voice of Delhi NCR — Season 1", desc: "The flagship competition was launched, bringing together hundreds of singing talents from across the Delhi NCR region." },
  { year: "2019", title: "Voice of Delhi NCR — Season 2", desc: "Season 2 expanded to more localities, featuring celebrity judges and bigger prize pools." },
  { year: "2021", title: "Voice of Rajasthan — Season 1", desc: "A special edition — Voice of Rajasthan — expanded DMS Aarohi's reach beyond Delhi NCR, celebrating the rich musical heritage of Rajasthan." },
  { year: "2024", title: "Voice of Delhi NCR — Season 3", desc: "Season 3 launched online auditions for the first time, significantly expanding participant reach across Delhi NCR." },
  { year: "2026", title: "Voice of Delhi NCR — Season 4", desc: "Voice of Delhi NCR Season 4 — Grand Finale on 4th July 2026 at Pearey Lal Bhawan (Gandhi Memorial Hall), ITO, New Delhi." },
];

// Updated stats
const stats = [
  { number: "5", label: "Total Seasons" },
  { number: "5,000+", label: "Total Participants" },
  { number: "100+", label: "Shows Organized" },
  { number: "Since 2013", label: "Promoting Music" },
];

// Team members without Peehu Srivastava, ordered as per user instructions:
// 1. Pankaj Mathur, 2. Kapil Tiwari, 3. Shalinder Kumar, 4. Dr. Bhawna Bhat, 5. Pratibha Asthana, 6. Sumit Kumar, 7. Shalini Lal
const teamMembers = [
  { name: "Pankaj Mathur", role: "Founder & President", image: "/team/Pankaj Mathur (Founder & President).JPG" },
  { name: "Kapil Tiwari", role: "Vice President", image: "/team/Kapil Tiwari (Vice President).jpg" },
  { name: "Shalinder Kumar", role: "Vice President", image: "/team/Shalinder Kumar (Vice President).jpg" },
  { name: "Dr. Bhawna Bhat", role: "General Secretary", image: "/team/Dr Bhawna Bhat (General Secretary).jpg" },
  { name: "Pratibha Asthana", role: "Secretary", image: "/team/Pratibha Asthana (Seceratry).jpg" },
  { name: "Sumit Kumar", role: "Legal Advisor", image: "/team/Sumit Kumar (Legal Advisor).jpg" },
  { name: "Shalini Lal", role: "Executive Member", image: "/team/Shalini Lal (Executive Member).png" },
];

function TeamMemberCard({ member, index }) {
  return (
    <ScrollReveal direction="up" delay={index * 0.07}>
      <div className="group flex flex-col items-center bg-white rounded-[2rem] p-6 border border-stone-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(234,88,12,0.15)] hover:-translate-y-2 transition-all duration-300 text-center h-full">
        {/* Large image */}
        <div className="relative mb-5 w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-orange-50 shadow-lg group-hover:border-orange-200 transition-colors group-hover:shadow-xl">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 rounded-full ring-2 ring-orange-400/0 group-hover:ring-orange-400/40 ring-offset-2 transition-all duration-300" />
        </div>
        <h3 className="font-serif font-bold text-stone-900 text-lg leading-tight mb-1.5">{member.name}</h3>
        <p className="text-orange-600 text-xs font-bold uppercase tracking-wider">{member.role}</p>
      </div>
    </ScrollReveal>
  );
}

function MusicSocietyOverviewPage() {
  const pageMeta = usePageMeta("about", {
    title: "Promoting Music & Nurturing Talent Since 2013",
    subtitle: "Our Story",
    description: "DMS Aarohi Musical Society has been promoting Indian music and nurturing emerging singing talent since 2013. Through its flagship competition, Voice of Delhi NCR, along with live concerts, tribute shows, and cultural events, the society provides aspiring artists with a professional platform to perform, grow, and showcase their talent while celebrating the rich heritage of Indian music.",
    imageUrl: "/legacy/about_group.png"
  });

  return (
    <div className="space-y-12 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Page Hero */}
      <ScrollReveal direction="up">
        <div className="text-center max-w-4xl mx-auto pt-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            About Us
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-stone-900 mb-6 leading-tight">
            DMS{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
              Aarohi
            </span>{" "}
            Musical Society
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto mb-8">
            A registered musical society dedicated to discovering, nurturing, and elevating singing talent across Delhi NCR and beyond.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/register"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-sm hover:-translate-y-1 transition-transform shadow-md"
            >
              Register for Upcoming Season 6
            </Link>
            <Link
              to="/voice-of-delhi-ncr"
              className="px-6 py-3 rounded-full border-2 border-stone-300 text-stone-800 font-bold text-sm hover:border-orange-500 hover:text-orange-600 transition-all"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* Stats Row */}
      <ScrollReveal direction="up">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 text-center border border-orange-100 shadow-[0_10px_30px_rgba(234,88,12,0.05)]">
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 mb-1">{stat.number}</div>
              <div className="text-xs text-stone-500 font-bold uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* About DMS Aarohi — Our Story */}
      <ScrollReveal direction="up">
        <div className="bg-gradient-to-br from-white/90 via-[#fff8ef] to-orange-50/60 rounded-[2.5rem] p-8 sm:p-14 border border-orange-100 shadow-[0_20px_60px_rgba(234,88,12,0.06)] relative overflow-hidden">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-400/10 blur-[80px]"></div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start relative z-10">
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orange-600 mb-3">Our Story</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 mb-6 leading-tight">
                Promoting Music & Nurturing Talent Since 2013
              </h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                DMS Aarohi Musical Society has been promoting Indian music and nurturing emerging singing talent since 2013. Through its flagship competition, <strong className="text-orange-700">Voice of Delhi NCR</strong>, along with live concerts, tribute shows, and cultural events, the society provides aspiring artists with a professional platform to perform, grow, and showcase their talent while celebrating the rich heritage of Indian music.
              </p>

              {/* Our Recognition */}
              <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100 mb-6">
                <h3 className="font-serif font-bold text-stone-900 text-lg mb-3">Our Recognition</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <p className="text-stone-700 text-sm font-medium">Registered under the Societies Registration Act, 1860<br/><span className="text-stone-500">(Registration No. Society/West/2013/8900890)</span></p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <p className="text-stone-700 text-sm font-medium">Registered under Section 12A & 80G of the Income Tax Act, 1961</p>
                  </div>
                </div>
              </div>

              {/* What We Do */}
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-lg mb-3">What We Do</h3>
                <div className="space-y-2">
                  {[
                    "Organize Voice of Delhi NCR singing competition",
                    "Promote Indian music and emerging talent",
                    "Conduct live concerts and tribute shows",
                    "Provide a professional platform for aspiring singers"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <p className="text-stone-700 text-sm font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img src={pageMeta.imageUrl} alt={pageMeta.title} className="w-full h-80 object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-orange-400 to-amber-300 rounded-3xl -z-10 rotate-6 opacity-60 blur-sm"></div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Mission, Vision, Values */}
      <div className="grid sm:grid-cols-3 gap-6 items-stretch">
        {[
          {
            icon: "🎵",
            title: "Our Mission",
            desc: "To promote Indian music and create meaningful opportunities for aspiring singers through transparent competitions, live performances, and musical events.",
            color: "from-amber-400 to-orange-500",
          },
          {
            icon: "🌟",
            title: "Our Vision",
            desc: "To nurture emerging talent and inspire a lifelong appreciation for Indian music by creating a trusted platform for artists to perform and grow.",
            color: "from-rose-400 to-orange-500",
          },
          {
            icon: "❤️",
            title: "Our Values",
            desc: "To uphold integrity, transparency, creativity, and excellence while fostering a supportive environment where every artist is encouraged to learn, perform, and grow.",
            color: "from-pink-400 to-rose-500",
          },
        ].map((item, i) => (
          <ScrollReveal key={i} direction="up" delay={i * 0.1} className="flex">
            <div className="group relative overflow-hidden rounded-[2rem] border border-white bg-white p-7 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all backdrop-blur-md w-full flex flex-col">
              <div className={`absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b ${item.color}`}></div>
              <div className="flex items-start gap-4 flex-1">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-stone-100 text-3xl shadow-sm transition-transform group-hover:scale-110">
                  {item.icon}
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">{item.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Objectives */}
      <ScrollReveal direction="up">
        <div className="bg-stone-900 rounded-[2.5rem] p-8 sm:p-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-500 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500 rounded-full blur-[100px]"></div>
          </div>
          <div className="relative z-10">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">Our Purpose</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold">Objectives of the Society</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/10 rounded-2xl p-5 border border-white/10 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-sm shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed font-medium">{obj}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Society Journey / Timeline */}
      <div>
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <SectionHeading
              eyebrow="Our History"
              title="The Society Journey"
              text="From a small musical society to one of Delhi's most celebrated talent platforms."
            />
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-400 to-amber-300 -translate-x-0.5 sm:-translate-x-0"></div>
          
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <ScrollReveal key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.05}>
                <div className={`relative flex items-center gap-6 sm:gap-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  {/* Year bubble */}
                  <div className="absolute left-6 sm:left-1/2 sm:-translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-black text-xs shadow-lg z-10">
                    {m.year.slice(2)}
                  </div>
                  
                  {/* Content Card */}
                  <div className={`ml-20 sm:ml-0 sm:w-5/12 ${i % 2 === 0 ? "sm:mr-auto sm:pr-16" : "sm:ml-auto sm:pl-16"}`}>
                    <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-orange-200 transition-all">
                      <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-1">{m.year}</p>
                      <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">{m.title}</h3>
                      <p className="text-stone-600 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section — Larger Cards */}
      <div>
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <SectionHeading
              eyebrow="The People Behind DMS Aarohi"
              title="Meet Our Team"
              text="Passionate individuals dedicated to nurturing musical talent and celebrating India's rich musical heritage."
            />
          </div>
        </ScrollReveal>

        {/* First row: 4 members */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
          {teamMembers.slice(0, 4).map((member, i) => (
            <TeamMemberCard key={i} member={member} index={i} />
          ))}
        </div>
        {/* Second row: 3 members centered */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {teamMembers.slice(4).map((member, i) => (
            <TeamMemberCard key={i + 4} member={member} index={i + 4} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <ScrollReveal direction="up">
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-[2.5rem] p-10 text-center border border-orange-100">
          <h2 className="font-serif text-3xl font-bold text-stone-900 mb-4">
            Be Part of Our Journey
          </h2>
          <p className="text-stone-600 mb-8 max-w-lg mx-auto">
            Registrations are open for the upcoming season. Join thousands of music lovers and aspiring singers in celebrating the power of music.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold hover:shadow-[0_10px_20px_rgba(234,88,12,0.3)] hover:-translate-y-1 transition-all"
            >
              Register for Upcoming Season
            </Link>
            <Link
              to="/voice-of-delhi-ncr"
              className="px-8 py-4 rounded-full border-2 border-stone-300 text-stone-700 font-bold hover:border-orange-400 hover:text-orange-600 transition-all"
            >
              Explore Seasons
            </Link>
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
}

export default MusicSocietyOverviewPage;