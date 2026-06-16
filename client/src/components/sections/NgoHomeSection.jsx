
import { useState, useEffect } from "react";

const banners = [
  {
    id: 1,
    title: "Empowering Communities Through Service",
    subtitle: "Join us on a mission to create positive change",
    image: "/legacy/bd1.jpg",
    cta: "Learn More"
  },
  {
    id: 2,
    title: "Healthcare for All",
    subtitle: "Mobile health camps reaching underserved communities",
    image: "/legacy/bd2.jpg",
    cta: "Donate Now"
  },
  {
    id: 3,
    title: "Education Changes Lives",
    subtitle: "Free education programs for underprivileged children",
    image: "/legacy/image1.jpeg",
    cta: "Support Us"
  },
  {
    id: 4,
    title: "Food & Nutrition",
    subtitle: "Ensuring no one goes hungry in our community",
    image: "/legacy/bd3.jpg",
    cta: "Contribute"
  }
];

function NgoHomeSection() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  return (
    <section className="space-y-6">
      {/* Main Banner Slider */}
      <div className="relative h-64 overflow-hidden rounded-[2rem] border border-white/40 shadow-lg sm:h-80 md:h-96">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
              <h2 className="font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
                {banner.title}
              </h2>
              <p className="mt-3 text-base sm:text-lg md:text-xl">
                {banner.subtitle}
              </p>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/40 backdrop-blur-sm"
          aria-label="Previous banner"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/40 backdrop-blur-sm"
          aria-label="Next banner"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`h-3 rounded-full transition ${
                index === currentBanner
                  ? "w-8 bg-white"
                  : "w-3 bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Quick Stats/Highlights */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {[
          { label: "Years Active", value: "5+" },
          { label: "Lives Touched", value: "10K+" },
          { label: "Active Programs", value: "6" },
          { label: "Volunteers", value: "200+" }
        ].map((stat, index) => (
          <div
            key={index}
            className="rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-white p-5 text-center shadow-sm transitions hover:shadow-md"
          >
            <p className="text-2xl font-bold text-emerald-900 sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-stone-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Welcome Message */}
      <div className="rounded-[2rem] border border-white/40 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 p-8 text-white shadow-lg md:p-10">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h3 className="font-serif text-3xl md:text-4xl">
            Making a Difference Together
          </h3>
          <p className="text-lg leading-relaxed text-emerald-50">
            DMS Aarohi NGO is committed to bringing positive change through education, healthcare,
            nutrition, and community support. Every contribution, no matter the size, helps us reach
            more lives and create lasting impact in underserved communities.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <a
              href="#services"
              className="rounded-full bg-white px-6 py-3 font-semibold text-emerald-900 transition hover:bg-emerald-50"
            >
              Explore Programs
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/40 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20 backdrop-blur-sm"
            >
              Get Involved
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NgoHomeSection;
