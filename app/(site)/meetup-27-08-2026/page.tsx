import { permanentRedirect } from 'next/navigation';

import { cursorMeetupGuadalajaraRecap } from '@/content/recaps/cursor-meetup-guadalajara';

export default function MeetupPromoPage() {
	permanentRedirect(`/recaps/${cursorMeetupGuadalajaraRecap.slug}`);
}
