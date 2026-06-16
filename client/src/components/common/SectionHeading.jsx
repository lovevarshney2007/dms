function SectionHeading({ eyebrow, title, text, light = false }) {
  return (
    <div className="space-y-3">
      <p className={`text-xs font-bold uppercase tracking-[0.3em] ${light ? "text-emerald-100" : "text-orange-700"}`}>
        {eyebrow}
      </p>
      <h2 className={`font-serif text-4xl leading-tight md:text-5xl ${light ? "text-white" : "text-stone-900"}`}>
        {title}
      </h2>
      {text ? <p className={`max-w-2xl text-base leading-7 ${light ? "text-stone-200" : "text-stone-600"}`}>{text}</p> : null}
    </div>
  );
}

export default SectionHeading;
