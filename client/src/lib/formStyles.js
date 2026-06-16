export function renderInputClassNames(isDark = false) {
  return isDark
    ? "rounded-2xl border border-white/15 bg-white/90 px-4 py-3 text-stone-900 outline-none placeholder:text-stone-500"
    : "rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none placeholder:text-stone-500";
}
