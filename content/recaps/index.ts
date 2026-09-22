import { cafeCursorGuadalajaraRecap } from '@/content/recaps/cafe-cursor-guadalajara';
import { cursorMeetupGuadalajaraRecap } from '@/content/recaps/cursor-meetup-guadalajara';
import { RecapData } from '@/lib/types';

export const recapsBySlug: Record<string, RecapData> = {
	[cafeCursorGuadalajaraRecap.slug]: cafeCursorGuadalajaraRecap,
	[cursorMeetupGuadalajaraRecap.slug]: cursorMeetupGuadalajaraRecap,
};
