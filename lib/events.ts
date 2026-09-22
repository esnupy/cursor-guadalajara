import type { CursorEvent } from '@/lib/types';

/** Community calendar. Event dates flip at midnight in Guadalajara, not the visitor's timezone. */
export const EVENT_TIME_ZONE = 'America/Mexico_City';

/**
 * Calendar date (YYYY-MM-DD) for an instant in the community timezone.
 */
export const calendarDateInTimeZone = (instant: Date, timeZone = EVENT_TIME_ZONE): string =>
	new Intl.DateTimeFormat('en-CA', {
		timeZone,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).format(instant);

/**
 * An event is upcoming on its calendar date and any later day.
 * Events without a date stay upcoming until one is set.
 */
export const isUpcomingEvent = (event: Pick<CursorEvent, 'date'>, now = new Date()): boolean => {
	if (!event.date) {
		return true;
	}

	return event.date >= calendarDateInTimeZone(now);
};
