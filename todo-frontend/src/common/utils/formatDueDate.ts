/**
 * Formats a due date to be easy to follow
 * eg, 40 minutes, 2 hours, tomorrow, 2 days, etc
 */
export const formatDueDate = (isoDate: string): string => {
  const now = new Date();
  const dueDate = new Date(isoDate);
  const diffMs = dueDate.getTime() - now.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Past due
  if (diffMs < 0) {
    const absMinutes = Math.abs(diffMinutes);
    const absHours = Math.abs(diffHours);
    const absDays = Math.abs(diffDays);

    // Less than 1 hour ago
    if (absMinutes < 60) {
      if (absMinutes <= 1) return 'due 1 minute ago';
      return `due ${absMinutes} minutes ago`;
    }

    // Less than 24 hours ago
    if (absHours < 24) {
      if (absHours === 1) return 'due 1 hour ago';
      return `due ${absHours} hours ago`;
    }

    // Days ago
    if (absDays < 7) {
      if (absDays === 1) return 'due 1 day ago';
      return `due ${absDays} days ago`;
    }

    return formatShortDate(dueDate);
  }

  // Less than 1 hour
  if (diffMinutes < 60) {
    if (diffMinutes <= 1) return 'in 1 minute';
    return `in ${diffMinutes} minutes`;
  }

  // Less than 24 hours
  if (diffHours < 24) {
    if (diffHours === 1) return 'in 1 hour';
    return `in ${diffHours} hours`;
  }

  // Tomorrow (next calendar day)
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (isSameDay(dueDate, tomorrow)) {
    return 'tomorrow';
  }

  // Within next week
  if (diffDays < 7) {
    if (diffDays === 1) return 'in 1 day';
    return `in ${diffDays} days`;
  }

  // Further out - show short date
  return formatShortDate(dueDate);
};

/**
 * Check if two dates are on the same calendar day
 */
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Format date as short date string (e.g., "Dec 25" or "Dec 25, 2025" if different year)
 */
const formatShortDate = (date: Date): string => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };

  // Include year if it's different from current year
  if (date.getFullYear() !== now.getFullYear()) {
    options.year = 'numeric';
  }

  return date.toLocaleDateString('en-US', options);
};
