'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, MapPinIcon } from '@phosphor-icons/react';
import CapGiveaway from '@/components/CapGiveaway';
import SectionDivider from '@/components/SectionDivider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { capGiveaway } from '@/content/caps';
import { meetupPromo } from '@/content/meetups/meetup-27-08-2026';
import { useBrandMotion } from '@/lib/motion';

function MeetupSection({ title, children }: { title: string; children: ReactNode }) {
	return (
		<section>
			<h2 className="mb-6 text-2xl tracking-tight">{title}</h2>
			{children}
		</section>
	);
}

export default function MeetupPromo() {
	const { slideUp, transition } = useBrandMotion();

	return (
		<motion.article initial={slideUp.initial} animate={slideUp.animate} transition={transition}>
			<Link href="/" aria-label="Volver al inicio" className="link mb-8">
				<ArrowLeftIcon weight="regular" className="size-4" aria-hidden="true" />
				Volver al inicio
			</Link>

			<header className="mb-12">
				<p className="mb-1 text-cursor-accent">{meetupPromo.kicker}</p>
				<div className="mb-1 flex flex-wrap items-center gap-3">
					<h1 className="text-2xl tracking-tight text-balance">{meetupPromo.title}</h1>
					{meetupPromo.soldOut ? (
						<Badge variant="brand" size="sm">
							Cupo lleno
						</Badge>
					) : null}
				</div>
				<p className="mb-4 text-2xl text-muted-foreground">
					{meetupPromo.displayDate}
					<span className="text-muted-foreground/50"> · </span>
					{meetupPromo.timeRange}
				</p>
				<div className="flex items-center gap-1.5 text-muted-foreground">
					<MapPinIcon weight="regular" className="size-4" aria-hidden="true" />
					<a href={meetupPromo.location.mapsUrl} target="_blank" rel="noopener noreferrer" className="link">
						{meetupPromo.location.name}
						<ArrowUpRightIcon weight="regular" className="size-4" aria-hidden="true" />
					</a>
				</div>
				<p className="mt-2">Entrada sólo por {meetupPromo.location.entrance}</p>
			</header>

			<div className="mb-12 flex max-w-3xl flex-col gap-4 text-xl leading-relaxed text-muted-foreground">
				{meetupPromo.summary.map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</div>

			<MeetupSection title={capGiveaway.title}>
				<CapGiveaway />
			</MeetupSection>

			<SectionDivider />

			<MeetupSection title="Sede">
				<Card>
					<CardContent className="pt-6 text-xl">
						<p className="tracking-tight">{meetupPromo.location.name}</p>
						<p className="mt-1 text-muted-foreground">{meetupPromo.location.address}</p>
						<p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{meetupPromo.accessNote}</p>
						<p className="mt-6 max-w-3xl leading-relaxed">{meetupPromo.access.lead}</p>

						<div className="mt-8 grid gap-4 md:grid-cols-[minmax(12rem,16rem)_1fr] md:items-start">
							<figure className="min-w-0">
								<video
									className="mx-auto aspect-9/16 w-full max-w-80 rounded-card bg-muted object-contain ring-1 ring-foreground/10 md:max-w-none"
									controls
									playsInline
									preload="metadata"
									poster={meetupPromo.access.video.poster}
									aria-label={meetupPromo.access.video.title}
								>
									<source src={meetupPromo.access.video.src} type="video/mp4" />
								</video>
								<figcaption className="mt-2 text-muted-foreground text-sm">
									{meetupPromo.access.video.caption}
								</figcaption>
							</figure>
							<iframe
								title={`Mapa de ${meetupPromo.location.name}`}
								src={meetupPromo.location.mapsEmbedUrl}
								className="aspect-4/3 min-h-80 w-full rounded-card border-0 ring-1 ring-foreground/10 md:aspect-auto md:min-h-112"
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								allowFullScreen
							/>
						</div>

						<ol className="mt-8">
							{meetupPromo.access.steps.map((step, index) => (
								<li key={step} className="grid grid-cols-[2rem_1fr] gap-4 border-b border-border py-4 last:border-b-0">
									<span className="font-mono tabular-nums text-muted-foreground">{index + 1}</span>
									<span className="leading-relaxed">{step}</span>
								</li>
							))}
						</ol>

						<p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">{meetupPromo.access.whatsapp.note}</p>
						<div className="mt-6 flex flex-col gap-3">
							<a href={meetupPromo.location.mapsUrl} target="_blank" rel="noopener noreferrer" className="link">
								Abrir en Google Maps
								<ArrowUpRightIcon weight="regular" className="size-4" aria-hidden="true" />
							</a>
							<a href={meetupPromo.lumaUrl} target="_blank" rel="noopener noreferrer" className="link">
								Abrir Luma
								<ArrowUpRightIcon weight="regular" className="size-4" aria-hidden="true" />
							</a>
							<a href={meetupPromo.access.whatsapp.href} target="_blank" rel="noopener noreferrer" className="link">
								{meetupPromo.access.whatsapp.label}
								<ArrowUpRightIcon weight="regular" className="size-4" aria-hidden="true" />
							</a>
						</div>
					</CardContent>
				</Card>
			</MeetupSection>

			<SectionDivider />

			<MeetupSection title="Charlas">
				<div className="flex flex-col gap-4">
					{meetupPromo.speakers.map((speaker, index) => (
						<Card key={speaker.name} className="py-0 text-xl">
							<div className="grid md:grid-cols-[1fr_2fr]">
								<div className="relative aspect-square overflow-hidden md:aspect-auto md:h-full md:min-h-80">
									<Image
										src={speaker.photo}
										alt={`Retrato de ${speaker.name}`}
										fill
										priority={index < 2}
										className="object-cover"
										sizes="(max-width: 768px) 100vw, 40vw"
									/>
								</div>
								<CardContent className="flex flex-col justify-center py-6">
									<p>{speaker.name}</p>
									<p className="text-muted-foreground">{speaker.role}</p>
									<p className="mt-4 tracking-tight">{speaker.talkTitle}</p>
									<p className="mt-1 leading-relaxed text-muted-foreground">{speaker.abstract}</p>
									{'slidesPath' in speaker && speaker.slidesPath ? (
										<Link href={speaker.slidesPath} className="link mt-4">
											Ver slides
											<ArrowRightIcon weight="regular" className="size-4" aria-hidden="true" />
										</Link>
									) : null}
								</CardContent>
							</div>
						</Card>
					))}
				</div>
			</MeetupSection>

			<SectionDivider />

			<MeetupSection title="Agenda">
				<ol>
					{meetupPromo.agenda.map((item) => (
						<li
							key={item.time}
							className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-border py-4 text-xl last:border-b-0"
						>
							<time dateTime={item.time} className="font-mono tabular-nums text-muted-foreground">
								{item.time}
							</time>
							<span>{item.label}</span>
						</li>
					))}
				</ol>
			</MeetupSection>
		</motion.article>
	);
}
