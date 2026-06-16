import { useState, useEffect } from "react";
import SectionHeading from "../../components/common/SectionHeading";
import NgoContactForm from "../../components/forms/NgoContactForm";
import { contactDetails } from "../../data/siteContent";

const banners = [
  {
    id: 1,
    title: "Empowering Communities Through Service",
    subtitle: "Join us on a mission to create positive change",
    description: "Every action counts. Support education, health, and nutrition programs.",
    image: "/legacy/slider-1.jpg",
    cta: "Learn More"
  },
  {
    id: 2,
    title: "Healthcare for All",
    subtitle: "Mobile health camps reaching underserved communities",
    description: "Blood camps, health awareness, and emergency medical support.",
    image: "/legacy/slider-2.jpg",
    cta: "Support Health"
  },
  {
    id: 3,
    title: "Education Changes Lives",
    subtitle: "Free education programs for underprivileged children",
    description: "Quality tutoring, books, and scholarships for promising students.",
    image: "/legacy/slider-3.jpg",
    cta: "Fund Education"
  }
];

const services = [
  {
    id: "blood-donation",
    title: "Blood Donation Camps",
    description: "Regular blood donation camps organized in partnership with medical centers.",
    icon: "🩸"
  },
  {
    id: "clothes-donation",
    title: "Clothes & Essentials",
    description: "Collecting and distributing clothing and essential items.",
    icon: "👕"
  },
  {
    id: "food-donation",
    title: "Food Donation Drive",
    description: "Weekly nutrition kits distributed to underprivileged families.",
    icon: "🍲"
  },
  {
    id: "free-education",
    title: "Free Education Program",
    description: "Learning centers with qualified tutors and scholarships.",
    icon: "📚"
  }
];

const galleryImages = [
  { id: 1, image: "/legacy/bd1.jpg", alt: "Community outreach" },
  { id: 2, image: "/legacy/bd2.jpg", alt: "Health camp" },
  { id: 3, image: "/legacy/bd3.jpg", alt: "Food distribution" },
  { id: 4, image: "/legacy/bd4.jpg", alt: "Education program" },
  { id: 5, image: "/legacy/image1.jpeg", alt: "Volunteer work" },
  { id: 6, image: "/legacy/patrons.jpg", alt: "Community gathering" }
];

function NgoPage() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="space-y-0">
      {/* Hero Banner Slider */}
      <section id="home" className="relative h-64 overflow-hidden rounded-2xl border border-white/40 shadow-lg sm:h-80 md:h-96 lg:h-screen/2 scroll-mt-28">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBanner ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20" />
            
            {/* Banner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-3 sm:px-6">
              <div className="space-y-2 sm:space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/30 bg-white/15 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-widest text-white/90 backdrop-blur-sm">
                  <span className="text-base sm:text-lg">🌟</span>
                  <span>NGO Initiative</span>
                </div>
                <h1 className="font-serif text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl leading-tight drop-shadow-lg">
                  {banner.title}
                </h1>
                <p className="text-xs sm:text-sm md:text-base font-light text-white/95 drop-shadow">
                  {banner.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-white/85 max-w-xl mx-auto drop-shadow hidden sm:block">
                  {banner.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mt-3 sm:mt-4">
                  <a
                    href="#contact"
                    className="rounded-lg bg-white/20 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-white/30 backdrop-blur-sm border border-white/30 hover:scale-105 active:scale-95"
                  >
                    {banner.cta}
                  </a>
                  <a
                    href="/ngo/volunteer"
                    className="rounded-lg bg-emerald-500/90 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-emerald-600 shadow-md hover:scale-105 active:scale-95"
                  >
                    🤝 Volunteer
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={handlePrevBanner}
          className="absolute left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/40 backdrop-blur-sm group active:scale-90"
          aria-label="Previous banner"
        >
          <svg className="h-5 w-5 sm:h-6 sm:w-6 group-hover:-translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNextBanner}
          className="absolute right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/40 backdrop-blur-sm group active:scale-90"
          aria-label="Next banner"
        >
          <svg className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicator Dots with progress */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 sm:gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`rounded-full transition ${
                index === currentBanner 
                  ? "w-6 sm:w-8 h-2.5 sm:h-3 bg-white shadow-lg" 
                  : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white/60 hover:bg-white/80 active:bg-white"
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>

        {/* Banner counter */}
        <div className="absolute bottom-4 sm:bottom-6 right-3 sm:right-6 rounded-full bg-black/40 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold text-white backdrop-blur-sm border border-white/20">
          {currentBanner + 1}/{banners.length}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="rounded-2xl border border-white/40 bg-gradient-to-br from-white/80 to-emerald-50/40 p-6 shadow-lg md:p-8 scroll-mt-28 mt-8 sm:mt-10">
        <SectionHeading
          eyebrow="About DMS Aarohi NGO"
          title="Building Stronger Communities"
          text="Founded with a heart to serve, DMS Aarohi NGO combines the power of music and culture with social service. We're dedicated to reaching underserved communities and creating transformative opportunities."
        />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { icon: "🎯", title: "Our Mission", desc: "Empower communities through education, healthcare, and cultural engagement." },
            { icon: "💡", title: "Our Vision", desc: "A society where everyone has access to quality education and healthcare." },
            { icon: "❤️", title: "Our Values", desc: "Compassion, transparency, community partnership, and sustainable impact." }
          ].map((item, index) => (
            <div key={index} className="rounded-xl border border-emerald-200/60 bg-white/80 p-5 shadow-sm">
              <p className="text-3xl">{item.icon}</p>
              <h3 className="mt-2 font-serif text-lg text-stone-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            { number: "5+", text: "Years Active" },
            { number: "10K+", text: "Lives Touched" },
            { number: "6", text: "Programs" },
            { number: "200+", text: "Volunteers" }
          ].map((stat, index) => (
            <div key={index} className="rounded-lg border border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-4 text-center shadow-sm">
              <p className="font-serif text-3xl font-bold text-emerald-900">{stat.number}</p>
              <p className="mt-1 text-xs text-stone-700">{stat.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="rounded-2xl border border-amber-100 bg-gradient-to-br from-[#fff5e8] via-white to-[#fff1db] p-6 shadow-lg md:p-8 scroll-mt-28 mt-8 sm:mt-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-800">Initiatives</p>
          <h2 className="mt-2 font-serif text-3xl text-stone-900">Our Service Programs</h2>
          <p className="mt-2 max-w-2xl text-sm text-stone-600">
            We run multiple initiatives to support underprivileged communities
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.id} className="flex gap-4 rounded-xl border border-amber-100/80 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="text-4xl">{service.icon}</div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-stone-900">{service.title}</h3>
                <p className="mt-1 text-sm leading-6 text-stone-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="rounded-2xl border border-white/40 bg-white/50 p-6 shadow-lg md:p-8 scroll-mt-28 mt-8 sm:mt-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-600">Gallery</p>
          <h2 className="mt-2 font-serif text-3xl text-stone-900">Our Impact in Action</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="group relative h-48 overflow-hidden rounded-lg border border-white/40 shadow-sm transition hover:shadow-lg"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />
              <p className="absolute bottom-3 left-3 translate-y-4 text-sm font-semibold text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                {item.alt}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="rounded-2xl border border-white/40 bg-[#fff8ef] p-6 shadow-lg md:p-8 scroll-mt-28 mt-8 sm:mt-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            <SectionHeading
              eyebrow="Contact Us"
              title="Get in Touch"
              text="Share how you'd like to help and we'll reach back quickly."
            />
            <div className="grid gap-3">
              {contactDetails.map(([label, value]) => (
                <div key={label} className="rounded-lg border border-stone-200 bg-white/80 p-4 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-700">{label}</p>
                  <p className="mt-1 text-sm leading-6 text-stone-700">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <NgoContactForm />
        </div>
      </section>

      {/* Volunteer CTA */}
      <section className="rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 text-center shadow-lg md:p-8 mt-8 sm:mt-10 mb-6 sm:mb-8">
        <h3 className="font-serif text-2xl font-bold text-emerald-900 md:text-3xl">
          Become a Volunteer
        </h3>
        <p className="mt-3 text-stone-700">
          Join our community and make a real difference in people's lives
        </p>
        <a
          href="/ngo/volunteer"
          className="mt-5 inline-block rounded-lg bg-emerald-900 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
        >
          Learn More
        </a>
      </section>
    </div>
  );
}

export default NgoPage;
