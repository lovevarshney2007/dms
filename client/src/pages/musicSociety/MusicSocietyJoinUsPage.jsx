import { useState } from "react";
import JoinUsForm from "../../components/forms/JoinUsForm";
import SectionHeading from "../../components/common/SectionHeading";
import FormNotice from "../../components/common/FormNotice";

function MusicSocietyJoinUsPage() {
  const [status, setStatus] = useState({ type: "", message: "" });

  return (
    <div className="space-y-7">
      <section className="rounded-[2rem] border border-white/40 bg-[#fff8ef] p-8 shadow-[0_24px_80px_rgba(84,42,24,0.14)] md:p-10">
        <div className="grid gap-7 md:grid-cols-[1.05fr_0.95fr]">
          <SectionHeading
            eyebrow="Music Society"
            title="Join Us"
            text="Submit your interest to participate in upcoming events: singer, volunteer, sponsor, coordinator, or audience registration."
          />
          <div className="overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white/80 p-3 shadow-2xl">
            <img
              className="w-full rounded-[1.25rem] object-cover"
              src="/legacy/Joinus.jpg"
              alt="Join us poster"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <div className="mt-6">
          <FormNotice status={status} />
          <JoinUsForm showClose={false} onClose={() => {}} onStatusChange={setStatus} />
        </div>
      </section>
    </div>
  );
}

export default MusicSocietyJoinUsPage;
