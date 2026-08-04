'use client';

import { motion } from 'framer-motion';
import { ArrowSquareOutIcon } from '@phosphor-icons/react';
import { upcomingEvents } from '@/content/events';
import { useI18n } from '@/lib/i18n';
import type { CursorEvent } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function UpcomingEvents() {
	const { t } = useI18n();

	if (upcomingEvents.length === 0) {
		return null;
	}

	const renderCta = (event: CursorEvent) => {
		if (event.lumaUrl) {
			return (
				<Button asChild>
					<a
						href={event.lumaUrl}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`${t('home.register')}: ${event.title}`}
					>
						{t('home.register')}
						<ArrowSquareOutIcon weight="regular" className="size-3.5" aria-hidden="true" />
					</a>
				</Button>
			);
		}

		return (
			<Badge variant="outline" className="px-5 py-2.5 text-sm" aria-label={`${event.title}: ${t('home.comingSoon')}`}>
				{t('home.comingSoon')}
			</Badge>
		);
	};

	return (
		<motion.section
			id="upcoming"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{ duration: 0.5 }}
			className="mb-16 scroll-mt-20"
		>
			<p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
				{t('home.upcomingEvents')}
			</p>
			<h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">{t('home.upcomingHeading')}</h2>

			<div className="flex flex-col gap-6">
				{upcomingEvents.map((event, index) => {
					const city = event.location.split(',')[0].trim();

					return (
						<motion.div
							key={event.id}
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-50px' }}
							transition={{ duration: 0.4, delay: index * 0.08 }}
						>
							<Card className="border-l-2 border-l-primary">
								<CardContent className="pt-6">
									<div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
										<span className="relative flex size-2.5">
											<span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
											<span className="relative inline-flex size-2.5 rounded-full bg-primary" />
										</span>
										<span>{event.displayDate}</span>
										<span className="text-muted-foreground/50">&middot;</span>
										<span>{city}</span>
									</div>
									<h3 className="mb-3 text-2xl font-bold text-foreground">{event.title}</h3>
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
