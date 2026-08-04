'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, CalendarIcon, UsersIcon } from '@phosphor-icons/react';
import { pastEvents } from '@/content/events';
import { useI18n } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';

const containerVariants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function PastEvents() {
	const { t, locale } = useI18n();

	if (pastEvents.length === 0) {
		return null;
	}

	return (
		<motion.section
			id="recaps"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{ duration: 0.5 }}
			className="mb-16 scroll-mt-20"
		>
			<p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('home.pastEvents')}</p>
			<h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">{t('home.pastEventsHeading')}</h2>

			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: '-50px' }}
				className="-mx-3 space-y-6 sm:mx-0"
			>
				{pastEvents.map((event) => {
					if (!event.recapPath) return null;

					const displayDate = new Date(`${event.date}T00:00:00`).toLocaleDateString(
						locale === 'en' ? 'en-US' : locale,
						{
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						},
					);

					const hasGallery = event.galleryImages && event.galleryImages.length > 0;

					return (
						<motion.div key={event.id} variants={itemVariants}>
							<Link href={event.recapPath} className="group block">
								<Card className="overflow-hidden rounded-none transition-colors hover:border-primary/50 sm:rounded-xl">
									{event.thumbnail ? (
										<div className="relative">
											<div className={`aspect-[2/1] overflow-hidden ${hasGallery ? 'grid grid-cols-3 gap-1' : ''}`}>
												<div className={`relative ${hasGallery ? 'col-span-2' : ''}`}>
													<Image
														src={event.thumbnail}
														alt={event.title}
														fill
														className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
														sizes="(max-width: 768px) 100vw, 60vw"
													/>
												</div>
												{hasGallery &&
													event.galleryImages!.slice(0, 4).map((img, i) => (
														<div key={i} className="relative">
															<Image
																src={img}
																alt=""
																fill
																className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
																sizes="(max-width: 768px) 33vw, 20vw"
															/>
														</div>
													))}
											</div>
											{event.host ? (
												<div className="absolute top-3 right-3 flex items-center gap-2 rounded-lg bg-black/60 p-2 backdrop-blur-sm">
													<Image
														src={event.host.logo}
														alt={event.host.name}
														width={20}
														height={20}
														className="rounded-full"
													/>
													<span className="text-xs text-white">{event.host.name}</span>
												</div>
											) : null}
										</div>
									) : null}

									<CardContent className="px-5 py-4">
										<h3 className="mb-1.5 text-lg font-medium text-foreground">{event.title}</h3>
										<div className="mb-1.5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
											<div className="flex items-center gap-1.5">
												<CalendarIcon weight="regular" className="size-4" />
												<span>{displayDate}</span>
											</div>
											{event.attendees ? (
												<div className="flex items-center gap-1.5">
													<UsersIcon weight="regular" className="size-4" />
													<span>{t('home.attendees', { count: String(event.attendees) })}</span>
												</div>
											) : null}
										</div>
										<div className="flex items-center gap-2 text-sm text-primary">
											<span>{t('home.viewRecap')}</span>
											<ArrowRightIcon
												weight="regular"
												className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
											/>
										</div>
									</CardContent>
								</Card>
							</Link>
						</motion.div>
					);
				})}
			</motion.div>
		</motion.section>
	);
}
