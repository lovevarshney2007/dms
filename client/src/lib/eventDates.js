/** Grand finale date for the current featured event (null when dates are TBA for the upcoming season). */
export const GRAND_FINALE_DATE = null;

export function getDaysUntilEvent(eventDate = GRAND_FINALE_DATE) {
  if (!eventDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(eventDate);
  target.setHours(0, 0, 0, 0);

  const diffMs = target.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}
