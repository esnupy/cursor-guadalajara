'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowUpRightIcon, MapPinIcon, UsersIcon } from '@phosphor-icons/react';
import PhotoGallery from '@/components/PhotoGallery';
import SectionDivider from '@/components/SectionDivider';
import { RecapData } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { useBrandMotion } from '@/lib/motion';

interface EventRecapProps {
	recap: RecapData;
}

interface RecapSectionProps {
	title: string;
	description?: string;
	children: React.ReactNode;
}

function RecapSection({ title, description, children }: RecapSectionProps) {
	return (
		<section>
			<div className="mb-6">
				<h2 className="mb-1 text-2xl tracking-tight">{title}</h2>
				{description ? <p className="text-xl text-muted-foreground">{description}</p> : null}
			</div>
			{children}
		</section>
	);
}

export default function EventRecap({ recap }: EventRecapProps) {
	const { slideUp, transition } = useBrandMotion();

	return (
		<motion.article initial={slideUp.initial} animate={slideUp.animate} transition={transition}>
			<Link href="/#recaps" aria-label="Volver a resúmenes" className="link mb-8">
				<ArrowLeftIcon weight="regular" className="size-4" aria-hidden="true" />
				Volver a resúmenes
			</Link>

			<header className="mb-8">
				<h1 className="mb-1 text-2xl tracking-tight">{recap.title}</h1>
				<p className="mb-4 text-2xl text-muted-foreground">{recap.date}</p>

				<div className="flex flex-wrap items-center gap-3 text-muted-foreground">
					{recap.attendees ? (
						<div className="flex items-center gap-1.5">
							<UsersIcon weight="regular" className="size-4" aria-hidden="true" />
							<span>{recap.attendees} asistentes</span>
						</div>
					) : null}
					{recap.host ? (
						<div className="flex items-center gap-1.5">
							<MapPinIcon weight="regular" className="size-4" aria-hidden="true" />
							<a href={recap.host.url || '#'} target="_blank" rel="noopener noreferrer" className="link">
								{recap.host.name}
								<ArrowUpRightIcon weight="regular" className="size-4" aria-hidden="true" />
							</a>
						</div>
					) : null}
				</div>
			</header>

			<RecapSection title="Sobre el evento">
				<div className="max-w-3xl space-y-4 text-xl leading-relaxed text-muted-foreground">
					{recap.summary.map((paragraph, index) => (
						<p key={index}>{paragraph}</p>
					))}
				</div>
			</RecapSection>

			{recap.speakers && recap.speakers.length > 0 ? (
				<>
					<SectionDivider />
					<RecapSection title="Ponentes">
						<div className="grid gap-4 sm:grid-cols-2">
							{recap.speakers.map((speaker) => (
								<Card key={speaker.name} size="sm">
									<CardContent className="flex items-start gap-3 pt-6">
										{speaker.photo ? (
											<div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-border">
												<Image src={speaker.photo} alt={speaker.name} fill className="object-cover" sizes="40px" />
											</div>
										) : null}
										<div className="min-w-0">
											{speaker.url ? (
												<a href={speaker.url} target="_blank" rel="noopener noreferrer" className="link">
													{speaker.name}
													<ArrowUpRightIcon weight="regular" className="size-4" aria-hidden="true" />
												</a>
											) : (
												<p>{speaker.name}</p>
											)}
											<p className="mt-0.5 text-muted-foreground">{speaker.topic}</p>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</RecapSection>
				</>
			) : null}

			{recap.projects && recap.projects.length > 0 ? (
				<>
					<SectionDivider />
					<RecapSection title="Proyectos presentados">
						<div className="grid gap-4 sm:grid-cols-2">
							{recap.projects.map((project) => (
								<Card key={project.name} size="sm">
									<CardContent className="pt-6">
										{project.url ? (
											<a href={project.url} target="_blank" rel="noopener noreferrer" className="link">
												{project.name}
												<ArrowUpRightIcon weight="regular" className="size-4" aria-hidden="true" />
											</a>
										) : (
											<p>{project.name}</p>
										)}
										<p className="mt-1 text-muted-foreground">{project.description}</p>
										{project.author ? <p className="mt-1.5 text-muted-foreground/70">por {project.author}</p> : null}
									</CardContent>
								</Card>
							))}
						</div>
					</RecapSection>
				</>
			) : null}

			{recap.highlights && recap.highlights.length > 0 ? (
				<>
					<SectionDivider />
					<RecapSection title="Comentarios de la comunidad">
						<div className="space-y-4">
							{recap.highlights.map((highlight, index) => (
								<blockquote key={index} className="rounded-card border border-border bg-muted/50 px-5 py-4">
									<p className="text-foreground/90">&ldquo;{highlight.quote}&rdquo;</p>
									{highlight.author ? <p className="mt-2 text-muted-foreground">&mdash; {highlight.author}</p> : null}
								</blockquote>
							))}
						</div>
					</RecapSection>
				</>
			) : null}

			{recap.resources && recap.resources.length > 0 ? (
				<>
					<SectionDivider />
					<RecapSection title="Recursos">
						<ul className="space-y-3">
							{recap.resources.map((resource) => (
								<li key={resource.url}>
									<a href={resource.url} target="_blank" rel="noopener noreferrer" className="link">
										{resource.label}
										<ArrowUpRightIcon weight="regular" className="size-4" aria-hidden="true" />
									</a>
								</li>
							))}
						</ul>
					</RecapSection>
				</>
			) : null}

			{recap.photos.length > 0 ? (
				<>
					<SectionDivider />
					<PhotoGallery photos={recap.photos} />
				</>
			) : null}

			{recap.photoCredits && recap.photoCredits.length > 0 ? (
				<p className="mt-12 text-muted-foreground">
					<span className="mr-1">Créditos de fotos:</span>
					{recap.photoCredits.map((credit, index) => (
						<span key={`${credit.name}-${index}`}>
							{credit.url ? (
								<a
									href={credit.url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-cursor-accent hover:underline"
								>
									{credit.name}
								</a>
							) : (
								<span>{credit.name}</span>
							)}
							{index < recap.photoCredits!.length - 1 ? <span>, </span> : <span>.</span>}
						</span>
					))}
				</p>
			) : null}
		</motion.article>
	);
}
