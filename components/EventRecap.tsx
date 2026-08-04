'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Mic, Lightbulb, MessageSquareQuote, Link as LinkIcon } from 'lucide-react';
import PhotoGallery from '@/components/PhotoGallery';
import { RecapData } from '@/lib/types';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface EventRecapProps {
	recap: RecapData;
}

export default function EventRecap({ recap }: EventRecapProps) {
	const { t } = useI18n();

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="mb-8"
		>
			<Button variant="link" asChild className="mb-6 h-auto p-0 text-muted-foreground">
				<Link href="/#recaps" aria-label={t('recap.backToEvents')}>
					<ArrowLeft className="size-4" aria-hidden="true" />
					{t('recap.backToEvents')}
				</Link>
			</Button>

			<Card>
				<CardContent className="pt-8">
					<h2 className="mb-2 text-xl font-semibold text-foreground">{recap.title}</h2>
					<p className="mb-6 text-sm text-muted-foreground">{recap.date}</p>

					{recap.host ? (
						<div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
							<span>{t('home.hostedBy')}</span>
							<a
								href={recap.host.url || '#'}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1.5 text-foreground hover:underline"
							>
								<Image src={recap.host.logo} alt={recap.host.name} width={18} height={18} className="rounded-full" />
								{recap.host.name}
							</a>
						</div>
					) : null}

					{recap.attendees ? (
						<p className="mb-4 text-lg leading-relaxed text-foreground">
							{t('home.attendees', { count: String(recap.attendees) })}
						</p>
					) : null}
					<div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
						{recap.summary.map((paragraph, index) => (
							<p key={index}>{paragraph}</p>
						))}
					</div>

					{recap.speakers && recap.speakers.length > 0 ? (
						<div className="mt-6 pt-6">
							<Separator className="mb-6" />
							<div className="mb-4 flex items-center gap-2">
								<Mic className="size-4 text-primary" />
								<h3 className="text-sm font-medium text-foreground">{t('recap.speakers')}</h3>
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
													<a
														href={speaker.url}
														target="_blank"
														rel="noopener noreferrer"
														className="text-sm font-medium text-foreground hover:underline"
													>
														{speaker.name}
													</a>
												) : (
													<p className="text-sm font-medium text-foreground">{speaker.name}</p>
												)}
												<p className="mt-0.5 text-xs text-muted-foreground">{speaker.topic}</p>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</div>
					) : null}

					{recap.projects && recap.projects.length > 0 ? (
						<div className="mt-6 pt-6">
							<Separator className="mb-6" />
							<div className="mb-4 flex items-center gap-2">
								<Lightbulb className="size-4 text-primary" />
								<h3 className="text-sm font-medium text-foreground">{t('recap.projects')}</h3>
							</div>
							<div className="grid gap-3 sm:grid-cols-2">
								{recap.projects.map((project) => (
									<Card key={project.name} size="sm">
										<CardContent className="pt-6">
											{project.url ? (
												<a
													href={project.url}
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm font-medium text-foreground hover:underline"
												>
													{project.name}
												</a>
											) : (
												<p className="text-sm font-medium text-foreground">{project.name}</p>
											)}
											<p className="mt-1 text-xs text-muted-foreground">{project.description}</p>
											{project.author ? (
												<p className="mt-1.5 text-xs text-muted-foreground/70">
													{t('recap.by')} {project.author}
												</p>
											) : null}
										</CardContent>
									</Card>
								))}
							</div>
						</div>
					) : null}

					{recap.highlights && recap.highlights.length > 0 ? (
						<div className="mt-6 pt-6">
							<Separator className="mb-6" />
							<div className="mb-4 flex items-center gap-2">
								<MessageSquareQuote className="size-4 text-primary" />
								<h3 className="text-sm font-medium text-foreground">{t('recap.highlights')}</h3>
							</div>
							<div className="space-y-3">
								{recap.highlights.map((highlight, index) => (
									<blockquote key={index} className="rounded-r-md border-l-2 border-primary/40 bg-muted px-4 py-3">
										<p className="text-sm italic text-foreground/90">&ldquo;{highlight.quote}&rdquo;</p>
										{highlight.author ? (
											<p className="mt-1.5 text-xs text-muted-foreground/70">&mdash; {highlight.author}</p>
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
								<LinkIcon className="size-4 text-primary" />
								<h3 className="text-sm font-medium text-foreground">{t('recap.resources')}</h3>
							</div>
							<ul className="space-y-2">
								{recap.resources.map((resource) => (
									<li key={resource.url}>
										<a
											href={resource.url}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1.5 text-sm text-foreground hover:underline"
										>
											{resource.label}
											<LinkIcon className="size-3 text-muted-foreground" />
										</a>
									</li>
								))}
							</ul>
						</div>
					) : null}

					<PhotoGallery photos={recap.photos} embedded />

					{recap.photoCredits && recap.photoCredits.length > 0 ? (
						<div className="mt-6 pt-6 text-sm text-muted-foreground">
							<Separator className="mb-6" />
							<span className="mr-1">Photo credits:</span>
							{recap.photoCredits.map((credit, index) => (
								<span key={`${credit.name}-${index}`}>
									{credit.url ? (
										<a
											href={credit.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-foreground hover:underline"
										>
											{credit.name}
										</a>
									) : (
										<span className="text-foreground">{credit.name}</span>
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
