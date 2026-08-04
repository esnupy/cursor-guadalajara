'use client';

import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { upcomingEvents } from '@/content/events';
import type { CursorEvent } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { useBrandMotion } from '@/lib/motion';
export default function UpcomingEvents() {
	const { slideUp, transition } = useBrandMotion();

	if (upcomingEvents.length === 0) {
		return null;
	}

	const renderCta = (event: CursorEvent) => {
		if (event.lumaUrl) {
			return (
				<a
					href={event.lumaUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`Regístrate: ${event.title}`}
					className="link"
				>
					Regístrate
					<ArrowUpRightIcon weight="regular" className="size-3.5" aria-hidden="true" />
				</a>
			);
		}

		return <span className="text-base text-cursor-accent">Próximamente</span>;
	};

	return (
		<motion.section
			id="upcoming"
			initial={slideUp.initial}
			whileInView={slideUp.animate}
			viewport={{ once: true, margin: '-50px' }}
			transition={transition}
			className="mb-16 scroll-mt-20"
		>
			<p className="mb-1 text-2xl text-foreground">Próximos eventos</p>
			<h2 className="mb-6 text-2xl text-muted-foreground tracking-tight">Qué sigue?</h2>

			<div className="flex flex-col gap-6">
				{upcomingEvents.map((event, index) => {
					const city = event.location.split(',')[0].trim();

					return (
						<motion.div
							key={event.id}
							initial={slideUp.initial}
							whileInView={slideUp.animate}
							viewport={{ once: true, margin: '-50px' }}
							transition={{ ...transition, delay: transition.duration ? index * 0.08 : 0 }}
						>
							<Card className="text-xl">
								<CardContent className="pt-6">
									<h3 className="mb-1 tracking-tight">{event.title}</h3>
									<div className="mb-2 flex items-center gap-2 text-muted-foreground">
										<span>{event.displayDate}</span>
										<span className="text-muted-foreground/50">&middot;</span>
										<span>{city}</span>
									</div>
									{renderCta(event)}
								</CardContent>
							</Card>
						</motion.div>
					);
				})}
			</div>
		</motion.section>
	);
}
