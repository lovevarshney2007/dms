/** Grand finale date for the current featured event (local midnight). */
export const GRAND_FINALE_DATE = new Date(2026, 6, 4);

export function getDaysUntilEvent(eventDate = GRAND_FINALE_DATE) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(eventDate);
  target.setHours(0, 0, 0, 0);

  const diffMs = target.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}
