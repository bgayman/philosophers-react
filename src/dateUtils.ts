import { format, parse, isSameDay, addDays, subDays } from 'date-fns';

interface DateEvent {
  id: string;
  philosopherId: string;
  name: string;
  username: string;
  thumbnailUrl?: string;
  date: Date;
  type: 'birth' | 'death';
}

export const parsePhilosopherDate = (dateStr: string | null | undefined): Date | null => {
  if (!dateStr) return null;
  try {
    return parse(dateStr, 'd MMMM y', new Date());
  } catch {
    return null;
  }
};

export const isSameDayOfYear = (date1: Date, date2: Date): boolean => {
  return date1.getMonth() === date2.getMonth() && 
         date1.getDate() === date2.getDate();
};

export const categorizeEvents = (events: DateEvent[]) => {
  const today = new Date();
  const upcoming: DateEvent[] = [];
  const past: DateEvent[] = [];
  const current: DateEvent[] = [];

  events.forEach(event => {
    if (isSameDayOfYear(event.date, today)) {
      current.push(event);
    } else {
      // Check if the event falls within the next 7 days
      const nextWeek = Array.from({ length: 7 }, (_, i) => addDays(today, i + 1));
      const lastWeek = Array.from({ length: 7 }, (_, i) => subDays(today, i + 1));

      const isUpcoming = nextWeek.some(date => isSameDayOfYear(date, event.date));
      const isPast = lastWeek.some(date => isSameDayOfYear(date, event.date));

      if (isUpcoming) {
        upcoming.push(event);
      } else if (isPast) {
        past.push(event);
      }
    }
  });

  return { current, upcoming, past };
};

export const formatEventDate = (date: Date): string => {
  return format(date, 'd MMMM');
};