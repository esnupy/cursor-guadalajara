import { describe, expect, test } from 'bun:test';

import { getPastEvents, getUpcomingEvents } from '@/content/events';
import { isUpcomingEvent } from '@/lib/events';

const meetupId = 'cursor-meetup-guadalajara-2026';
const cafeId = 'cafe-cursor-guadalajara-2026-04';

describe('isUpcomingEvent', () => {
	test('stays upcoming through the end of its calendar day in Guadalajara', () => {
		expect(isUpcomingEvent({ date: '2026-08-27' }, new Date('2026-08-27T23:30:00-06:00'))).toBe(true);
	});

	test('is past the next morning in Guadalajara', () => {
		expect(isUpcomingEvent({ date: '2026-08-27' }, new Date('2026-08-28T00:30:00-06:00'))).toBe(false);
	});

	test('uses the Guadalajara date when the instant is still the previous evening in UTC', () => {
		expect(isUpcomingEvent({ date: '2026-08-27' }, new Date('2026-08-28T05:30:00Z'))).toBe(true);
	});

	test('keeps undated events upcoming', () => {
		expect(isUpcomingEvent({}, new Date('2026-09-22T12:00:00-06:00'))).toBe(true);
	});
});

describe('event lists', () => {
	const afterMeetup = new Date('2026-09-22T12:00:00-06:00');

	test('moves a finished event out of upcoming and into past, newest first', () => {
		expect(getUpcomingEvents(afterMeetup).map((event) => event.id)).not.toContain(meetupId);
		expect(getPastEvents(afterMeetup).map((event) => event.id)).toEqual([meetupId, cafeId]);
	});

	test('keeps the meetup upcoming on the day it happens', () => {
		const duringMeetup = new Date('2026-08-27T18:00:00-06:00');

		expect(getUpcomingEvents(duringMeetup).map((event) => event.id)).toContain(meetupId);
		expect(getPastEvents(duringMeetup).map((event) => event.id)).not.toContain(meetupId);
	});
});
