'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, CalendarIcon, UsersIcon } from '@phosphor-icons/react';
import { pastEvents } from '@/content/events';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useBrandMotion } from '@/lib/motion';

export default function PastEvents() {
	const { slideUp, transition } = useBrandMotion();

	if (pastEvents.length === 0) {
		return null;
	}

	return (
		<motion.section
			id="recaps"
			initial={slideUp.initial}
			whileInView={slideUp.animate}
			viewport={{ once: true, margin: '-50px' }}
			transition={transition}
			className="mb-16 scroll-mt-20"
		>
			<p className="mb-1 text-2xl">Nuestros eventos pasados</p>
			<h2 className="mb-6 text-2xl tracking-tight text-muted-foreground">
				Resúmenes de lo que vivimos junto con la comunidad.
			</h2>

			<div className="-mx-3 space-y-6 sm:mx-0">
				{pastEvents.map((event, index) => {
					if (!event.recapPath) return null;

					const displayDate = new Date(`${event.date}T00:00:00`).toLocaleDateString('es-MX', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					});

					const hasGallery = event.galleryImages && event.galleryImages.length > 0;

					return (
						<motion.div
							key={event.id}
							initial={slideUp.initial}
							whileInView={slideUp.animate}
							viewport={{ once: true, margin: '-50px' }}
							transition={{ ...transition, delay: transition.duration ? index * 0.1 : 0 }}
						>
							<Card variant="interactive" flushOnMobile className="overflow-hidden pt-0 text-xl group">
								{event.thumbnail ? (
									<div className="relative">
										<div className={`aspect-2/1 overflow-hidden ${hasGallery ? 'grid grid-cols-3 gap-1' : ''}`}>
											<div className={`relative ${hasGallery ? 'col-span-2' : ''}`}>
												<Image
													src={event.thumbnail}
													alt={event.title}
													fill
													className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transform-none"
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
															className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transform-none"
															sizes="(max-width: 768px) 33vw, 20vw"
														/>
													</div>
												))}
										</div>
										{event.host ? (
											<Badge
												variant="secondary"
												className="absolute top-3 right-3 gap-2 bg-black/60 px-2 py-1.5 text-white backdrop-blur-sm"
											>
												<Image
													src={event.host.logo}
													alt={event.host.name}
													width={20}
													height={20}
													className="rounded-full"
												/>
												{event.host.name}
											</Badge>
										) : null}
									</div>
								) : null}

								<CardContent className="px-5 py-4">
									<h3 className="mb-1.5">{event.title}</h3>
									<div className="mb-1.5 flex flex-wrap items-center gap-3 text-muted-foreground">
										<div className="flex items-center gap-1.5">
											<CalendarIcon weight="regular" className="size-4" />
											<span>{displayDate}</span>
										</div>
										{event.attendees ? (
											<div className="flex items-center gap-1.5">
												<UsersIcon weight="regular" className="size-4" />
												<span>{event.attendees} asistentes</span>
											</div>
										) : null}
									</div>
									<div className="flex items-center gap-2 text-muted-foreground">
										<Link href={event.recapPath} className="link">
											Ver resumen
											<ArrowRightIcon
												weight="regular"
												className="size-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
											/>
										</Link>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					);
				})}
			</div>
		</motion.section>
	);
}
