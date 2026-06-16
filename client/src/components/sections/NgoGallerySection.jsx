import { ngoGallery } from "../../data/siteContent";
import SectionHeading from "../common/SectionHeading";

function NgoGallerySection() {
  return (
    <section className="rounded-[2rem] border border-white/40 bg-[#fff8ef] p-8 shadow-[0_24px_80px_rgba(84,42,24,0.14)] md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Voluntary Work"
          title="Real field activity imagery from the original NGO section."
          text="The NGO page is now dedicated to community support, donation interest, and real service visuals only."
        />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {ngoGallery.map((image) => (
          <img
            key={image}
            className="aspect-square w-full rounded-3xl object-cover"
            src={image}
            alt="DMS Aarohi voluntary work"
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </section>
  );
}

export default NgoGallerySection;
