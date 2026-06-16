import SectionHeading from "../common/SectionHeading";

function PresidentSection() {
  return (
    <section className="rounded-[2rem] border border-white/40 bg-[#fff8ef] p-8 shadow-[0_24px_80px_rgba(84,42,24,0.14)] md:p-10">
      <div className="grid items-center gap-7 md:grid-cols-[0.9fr_1.1fr]">
        <img
          className="w-full rounded-[1.75rem] object-cover"
          src="/legacy/pp.jpg"
          alt="Pankaj Mathur"
          loading="lazy"
          decoding="async"
        />
        <div>
          <SectionHeading
            eyebrow="President Speaks"
            title="Pankaj Mathur on growth, music appreciation, and opportunity."
            text="The president message in the legacy website describes DMS Aarohi as one of the finest musical societies in Delhi-NCR, devoted to old classical music, concerts, recitals, and building appreciation for Indian music among the musically inclined."
          />
          <p className="mt-4 text-base leading-7 text-stone-600">
            It also positions the talent hunt as a platform for singers who may not otherwise get an opportunity to
            showcase themselves.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PresidentSection;
