import type { ReactNode } from 'react';
import TalkPageShell from '@/components/talks/TalkPageShell';
import { cursorMeetupGuadalajaraRecap } from '@/content/recaps/cursor-meetup-guadalajara';

export default function MeetupTalksLayout({ children }: { children: ReactNode }) {
	return (
		<TalkPageShell backHref={`/recaps/${cursorMeetupGuadalajaraRecap.slug}`} backLabel="Volver al resumen">
			{children}
		</TalkPageShell>
	);
}
