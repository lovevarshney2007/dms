import { useEffect, useState } from "react";
import { eventDetails as staticEventDetails } from "../../data/siteContent";
import { getJson } from "../../lib/api";
import JoinUsForm from "../forms/JoinUsForm";
import FormNotice from "../common/FormNotice";
import SectionHeading from "../common/SectionHeading";

function UpcomingEventSection() {
  const [joinUsOpen, setJoinUsOpen] = useState(false);
  const [joinUsStatus, setJoinUsStatus] = useState({ type: "", message: "" });
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getJson("/api/events");
        setEvents(data || []);
      } catch (error) {
        // fallback to static data
      }
    })();
  }, []);

  const cards = events.length
    ? events.map((ev) => ({
        id: ev._id,
        title: ev.title || "Event",
        description: ev.description || "Music event",
        date: ev.eventDate ? ev.eventDate.slice(0, 10) : "Date TBA",
        location: ev.eventLocation || "Location TBA",
        deadline: ev.registrationDeadline ? ev.registrationDeadline.slice(0, 10) : "Deadline TBA",
        type: ev.eventType || "Competition",
        poster: ev.posterImage || "/legacy/current_event.jpg",
        liveLink: ev.liveLink || "",
        rawDate: ev.eventDate,
        rawDeadline: ev.registrationDeadline
      }))
    : staticEventDetails.map(([label, value], idx) => ({
        id: `static-${idx}`,
        title: label,
        description: value,
        date: "Date TBA",
        location: "Location TBA",
        deadline: "Deadline TBA",
        type: "Competition",
        poster: "/legacy/current_event.jpg",
        liveLink: "",
        rawDate: null,
        rawDeadline: null
      }));

  const today = new Date().toISOString().slice(0, 10);
  const sortedCards = [...cards].sort((a, b) => {
    const aLive = a.rawDate && a.rawDate.slice(0, 10) === today;
    const bLive = b.rawDate && b.rawDate.slice(0, 10) === today;
    if (aLive !== bLive) return aLive ? -1 : 1;

    const aOpen = a.rawDeadline ? a.rawDeadline.slice(0, 10) >= today : true;
    const bOpen = b.rawDeadline ? b.rawDeadline.slice(0, 10) >= today : true;
    if (aOpen !== bOpen) return aOpen ? -1 : 1;
    return 0;
  });

  return (
    <section
      id="upcoming-event"
      className="rounded-[2rem] border border-white/40 bg-[linear-gradient(135deg,#101b20_0%,#1d3944_40%,#f4e6cf_40%,#fff8ef_100%)] p-8 shadow-[0_24px_80px_rgba(84,42,24,0.14)] md:p-10"
    >
      <div className="space-y-7">
        <div className="rounded-[1.75rem] border border-white/10 bg-stone-950/65 p-6 backdrop-blur">
          <SectionHeading
            eyebrow="Event"
            title="Live competitions, concerts, and workshops."
            // text="Fresh from the admin panel: latest events with dates, venues, types, and registration deadlines."
            light
          />
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {sortedCards.map((card) => {
              const isLive = card.rawDate && card.rawDate.slice(0, 10) === today;
              const isOpen = card.rawDeadline ? card.rawDeadline.slice(0, 10) >= today : true;
              const statusLabel = isLive ? "Live" : isOpen ? "Open" : "Closed";
              const statusColor = isLive
                ? "bg-red-500 text-white"
                : isOpen
                ? "bg-emerald-600 text-white"
                : "bg-stone-400 text-stone-900";

              return (
                <article
                  key={card.title + card.date + card.location}
                  className="flex h-full flex-col gap-3 rounded-xl border border-white/15 bg-white/10 p-3 text-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] sm:rounded-2xl sm:p-4"
                >
                  <img
                    className="h-32 w-full rounded-lg object-cover sm:h-40"
                    src={card.poster}
                    alt={card.title}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-emerald-100 sm:text-[11px]">
                    <span className="flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${statusColor}`}>{statusLabel}</span>
                      <span>{card.type}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      {isLive ? <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">LIVE</span> : null}
                      {card.liveLink && isLive ? (
                        <a
                          href={card.liveLink}
                          className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Watch
                        </a>
                      ) : null}
                      {card.date}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg leading-tight sm:text-xl">{card.title}</h3>
                  <p className="text-xs text-stone-200 sm:text-sm">{card.description}</p>
                  <div className="text-[11px] text-stone-200/80 sm:text-[13px]">
                    <div className="flex items-center justify-between">
                      <span>Location:</span>
                      <span className="font-semibold text-white/90">{card.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Registration:</span>
                      <span className="font-semibold text-white/90">{card.deadline}</span>
                    </div>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {isOpen ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedEvent(card.title);
                          setJoinUsOpen(true);
                        }}
                        className="w-full rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange-500 sm:w-auto"
                      >
                        Register
                      </button>
                    ) : (
                      <span className="rounded-full border border-white/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                        Closed
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
          {/* <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setJoinUsOpen((current) => !current)}
              className="rounded-full bg-orange-700 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange-600"
            >
              Join Us
            </button>
            <a
              href="mailto:dmsaarohi@gmail.com"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              Event Enquiry
            </a>
          </div> */}
          <FormNotice status={joinUsStatus} />
        </div>
      </div>

      {joinUsOpen ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setJoinUsOpen(false)}
              className="absolute right-3 top-3 rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700 transition hover:bg-stone-200"
            >
              Close
            </button>
            <div className="border-b border-stone-100 px-6 py-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500">Registering for</p>
              <h4 className="text-lg font-semibold text-stone-900">{selectedEvent || "Upcoming Event"}</h4>
            </div>
            <div className="px-6 py-4">
              <FormNotice status={joinUsStatus} />
              <JoinUsForm onClose={() => setJoinUsOpen(false)} onStatusChange={setJoinUsStatus} />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default UpcomingEventSection;
