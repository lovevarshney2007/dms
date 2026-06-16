function TeamSliderRow({ members, reverse = false }) {
  const repeatedMembers = [...members, ...members];

  return (
    <div className="overflow-hidden">
      <div className={`flex w-max gap-5 ${reverse ? "animate-team-slide-reverse" : "animate-team-slide"}`}>
        {repeatedMembers.map((member, index) => (
          <article
            key={`${member.name}-${index}`}
            className="group w-[220px] shrink-0 overflow-hidden rounded-[1.25rem] border border-stone-200 bg-white shadow-[0_12px_40px_rgba(84,42,24,0.10)] sm:w-[260px] sm:rounded-[1.6rem]"
          >
            <div className="relative overflow-hidden">
              <img
                className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
                src={member.image}
                alt={member.name}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-x-3 bottom-3 rounded-full bg-stone-950/75 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur sm:inset-x-4 sm:bottom-4 sm:px-4 sm:py-2 sm:text-xs">
                DMS Aarohi
              </div>
            </div>
            <div className="space-y-1.5 p-4 sm:p-5">
              <h3 className="font-serif text-lg text-stone-900 sm:text-2xl">{member.name}</h3>
              <p className="text-xs font-medium text-stone-600 sm:text-sm">{member.role}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default TeamSliderRow;
