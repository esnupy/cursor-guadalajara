'use client';

import { skillhellLora } from '@/components/talks/skillhell/font';
import { skillhellSlides } from '@/components/talks/skillhell/slides';
import TalkDeck, { type TalkDeckSlide } from '@/components/talks/TalkDeck';

const slides: TalkDeckSlide[] = skillhellSlides.map((slide) => ({
	id: slide.id,
	...('steps' in slide ? { steps: slide.steps } : {}),
	content: slide.content,
}));

export default function SkillhellDeck() {
	return (
		<TalkDeck label="Presentación Del skillhell al skillhalla" slides={slides} className={skillhellLora.className} />
	);
}
