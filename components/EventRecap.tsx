'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
	ArrowLeftIcon,
	ArrowUpRightIcon,
	LightbulbIcon,
	LinkIcon,
	MicrophoneIcon,
	QuotesIcon,
} from '@phosphor-icons/react';
import PhotoGallery from '@/components/PhotoGallery';
import { RecapData } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useBrandMotion } from '@/lib/motion';

interface EventRecapProps {
	recap: RecapData;
}

export default function EventRecap({ recap }: EventRecapProps) {
	const { slideUp, transition } = useBrandMotion();

	return (
		<motion.section initial={slideUp.initial} animate={slideUp.animate} transition={transition} className="mb-8">
			<Link href="/#recaps" aria-label="Volver a resúmenes" className="link mb-6">
				<ArrowLeftIcon weight="regular" className="size-4" aria-hidden="true" />
				Volver a resúmenes
			</Link>

			<Card className="text-2xl">
				<CardContent className="pt-8">
					<h2 className="mb-1 tracking-tight">{recap.title}</h2>
					<p className="mb-6 text-muted-foreground">{recap.date}</p>

					{recap.host ? (
						<div className="mb-6 flex items-center gap-2 text-muted-foreground">
							<span>Lugar</span>
							<a href={recap.host.url || '#'} target="_blank" rel="noopener noreferrer" className="link">
								<Image src={recap.host.logo} alt={recap.host.name} width={18} height={18} className="rounded-full" />
								{recap.host.name}
								<ArrowUpRightIcon weight="regular" className="size-4" aria-hidden="true" />
							</a>
						</div>
					) : null}

					{recap.attendees ? <p className="mb-4 text-xl leading-relaxed">{recap.attendees} asistentes</p> : null}
					<div className="space-y-3 leading-relaxed text-muted-foreground text-xl">
						{recap.summary.map((paragraph, index) => (
							<p key={index}>{paragraph}</p>
						))}
					</div>

					{recap.speakers && recap.speakers.length > 0 ? (
						<div className="mt-6 pt-6 text-xl">
							<Separator className="mb-6" />
							<div className="mb-4 flex items-center gap-2">
								<MicrophoneIcon weight="regular" className="size-4 text-muted-foreground" />
								<h3>Ponentes</h3>
							</div>
							<div className="grid gap-3 sm:grid-cols-2">
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
						</div>
					) : null}

					{recap.projects && recap.projects.length > 0 ? (
						<div className="mt-6 pt-6 text-xl">
							<Separator className="mb-6" />
							<div className="mb-4 flex items-center gap-2">
								<LightbulbIcon weight="regular" className="size-4 text-muted-foreground" />
								<h3>Proyectos presentados</h3>
							</div>
							<div className="grid gap-3 sm:grid-cols-2">
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
						</div>
					) : null}

					{recap.highlights && recap.highlights.length > 0 ? (
						<div className="mt-6 pt-6 text-xl">
							<Separator className="mb-6" />
							<div className="mb-4 flex items-center gap-2">
								<QuotesIcon weight="regular" className="size-4 text-muted-foreground" />
								<h3>Comentarios de la comunidad</h3>
							</div>
							<div className="space-y-3">
								{recap.highlights.map((highlight, index) => (
									<blockquote key={index} className="rounded-r-md border-l-2 border-primary/40 bg-muted px-4 py-3">
										<p className="italic text-foreground/90">&ldquo;{highlight.quote}&rdquo;</p>
										{highlight.author ? (
											<p className="mt-1.5 text-muted-foreground/70">&mdash; {highlight.author}</p>
										) : null}
									</blockquote>
								))}
							</div>
						</div>
					) : null}

					{recap.resources && recap.resources.length > 0 ? (
						<div className="mt-6 pt-6">
							<Separator className="mb-6" />
							<div className="mb-4 flex items-center gap-2">
								<LinkIcon weight="regular" className="size-4 text-muted-foreground" />
								<h3>Recursos</h3>
							</div>
							<ul className="space-y-2">
								{recap.resources.map((resource) => (
									<li key={resource.url}>
										<a href={resource.url} target="_blank" rel="noopener noreferrer" className="link">
											{resource.label}
											<ArrowUpRightIcon weight="regular" className="size-4" aria-hidden="true" />
										</a>
									</li>
								))}
							</ul>
						</div>
					) : null}

					<PhotoGallery photos={recap.photos} embedded />

					{recap.photoCredits && recap.photoCredits.length > 0 ? (
						<div className="mt-6 pt-6 text-muted-foreground text-xl">
							<Separator className="mb-6" />
							<span className="mr-1">Créditos de fotos:</span>
							{recap.photoCredits.map((credit, index) => (
								<span key={`${credit.name}-${index}`}>
									{credit.url ? (
										// prose inline exception — no .link / arrow in comma-separated credits
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
						</div>
					) : null}
				</CardContent>
			</Card>
		</motion.section>
	);
}
