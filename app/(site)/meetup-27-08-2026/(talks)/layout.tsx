import type { ReactNode } from 'react';
import TalkPageShell from '@/components/talks/TalkPageShell';
import { meetupPromo } from '@/content/meetups/meetup-27-08-2026';

export default function MeetupTalksLayout({ children }: { children: ReactNode }) {
	return (
		<TalkPageShell backHref={meetupPromo.path} backLabel="Volver al meetup">
			{children}
		</TalkPageShell>
	);
}
