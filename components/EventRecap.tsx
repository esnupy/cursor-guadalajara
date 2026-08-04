'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Mic, Lightbulb, MessageSquareQuote, Link as LinkIcon } from 'lucide-react';
import PhotoGallery from '@/components/PhotoGallery';
import { RecapData } from '@/lib/types';
import { useI18n } from '@/lib/i18n';

interface EventRecapProps {
	recap: RecapData;
}

const EventRecap: React.FC<EventRecapProps> = ({ recap }) => {
	const { t } = useI18n();

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="mb-8"
		>
			<Link
				href="/#recaps"
				className="inline-flex items-center gap-2 text-sm text-cursor-text-muted hover:text-cursor-text transition-colors mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cursor-text/40 rounded-sm"
				aria-label={t('recap.backToEvents')}
			>
				<ArrowLeft className="w-4 h-4" aria-hidden="true" />
				{t('recap.backToEvents')}
			</Link>

			<div className="bg-[#1B1913] border border-cursor-border rounded-lg p-8">
				<h2 className="text-xl font-semibold text-cursor-text mb-2">{recap.title}</h2>
				<p className="text-cursor-text-muted text-sm mb-6">{recap.date}</p>

				{recap.host ? (
					<div className="text-cursor-text-muted text-sm mb-6 flex items-center gap-2">
						<span>{t('home.hostedBy')}</span>
						<a
							href={recap.host.url || '#'}
							target="_blank"
							rel="noopener noreferrer"
							className="text-cursor-text hover:underline inline-flex items-center gap-1.5"
						>
							<Image src={recap.host.logo} alt={recap.host.name} width={18} height={18} className="rounded-full" />
							{recap.host.name}
						</a>
					</div>
				) : null}

				{recap.attendees ? (
					<p className="text-cursor-text text-lg leading-relaxed mb-4">
						{t('home.attendees', { count: String(recap.attendees) })}
					</p>
				) : null}
				<div className="text-cursor-text-muted text-sm leading-relaxed space-y-3">
					{recap.summary.map((paragraph, index) => (
						<p key={index}>{paragraph}</p>
					))}
				</div>

				{/* Speakers */}
				{recap.speakers && recap.speakers.length > 0 ? (
					<div className="border-t border-cursor-border mt-6 pt-6">
						<div className="flex items-center gap-2 mb-4">
							<Mic className="w-4 h-4 text-cursor-accent-blue" />
							<h3 className="text-sm font-medium text-cursor-text">{t('recap.speakers')}</h3>
						</div>
						<div className="grid gap-3 sm:grid-cols-2">
							{recap.speakers.map((speaker) => (
								<div
									key={speaker.name}
									className="bg-cursor-bg-dark border border-cursor-border rounded-md p-4 flex items-start gap-3"
								>
									{speaker.photo ? (
										<div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-cursor-border-emphasis">
											<Image src={speaker.photo} alt={speaker.name} fill className="object-cover" sizes="40px" />
										</div>
									) : null}
									<div className="min-w-0">
										{speaker.url ? (
											<a
												href={speaker.url}
												target="_blank"
												rel="noopener noreferrer"
												className="text-cursor-text font-medium text-sm hover:underline"
											>
												{speaker.name}
											</a>
										) : (
											<p className="text-cursor-text font-medium text-sm">{speaker.name}</p>
										)}
										<p className="text-cursor-text-muted text-xs mt-0.5">{speaker.topic}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				) : null}

				{/* Projects */}
				{recap.projects && recap.projects.length > 0 ? (
					<div className="border-t border-cursor-border mt-6 pt-6">
						<div className="flex items-center gap-2 mb-4">
							<Lightbulb className="w-4 h-4 text-cursor-accent-yellow" />
							<h3 className="text-sm font-medium text-cursor-text">{t('recap.projects')}</h3>
						</div>
						<div className="grid gap-3 sm:grid-cols-2">
							{recap.projects.map((project) => (
								<div key={project.name} className="bg-cursor-bg-dark border border-cursor-border rounded-md p-4">
									{project.url ? (
										<a
											href={project.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-cursor-text font-medium text-sm hover:underline"
										>
											{project.name}
										</a>
									) : (
										<p className="text-cursor-text font-medium text-sm">{project.name}</p>
									)}
									<p className="text-cursor-text-muted text-xs mt-1">{project.description}</p>
									{project.author ? (
										<p className="text-cursor-text-faint text-xs mt-1.5">
											{t('recap.by')} {project.author}
										</p>
									) : null}
								</div>
							))}
						</div>
					</div>
				) : null}

				{/* Highlights / Feedback */}
				{recap.highlights && recap.highlights.length > 0 ? (
					<div className="border-t border-cursor-border mt-6 pt-6">
						<div className="flex items-center gap-2 mb-4">
							<MessageSquareQuote className="w-4 h-4 text-cursor-accent-purple" />
							<h3 className="text-sm font-medium text-cursor-text">{t('recap.highlights')}</h3>
						</div>
						<div className="space-y-3">
							{recap.highlights.map((highlight, index) => (
								<blockquote
									key={index}
									className="bg-cursor-bg-dark border-l-2 border-cursor-accent-purple/40 rounded-r-md px-4 py-3"
								>
									<p className="text-cursor-text-secondary text-sm italic">&ldquo;{highlight.quote}&rdquo;</p>
									{highlight.author ? (
										<p className="text-cursor-text-faint text-xs mt-1.5">&mdash; {highlight.author}</p>
									) : null}
								</blockquote>
							))}
						</div>
					</div>
				) : null}

				{/* Resources */}
				{recap.resources && recap.resources.length > 0 ? (
					<div className="border-t border-cursor-border mt-6 pt-6">
						<div className="flex items-center gap-2 mb-4">
							<LinkIcon className="w-4 h-4 text-cursor-accent-green" />
							<h3 className="text-sm font-medium text-cursor-text">{t('recap.resources')}</h3>
						</div>
						<ul className="space-y-2">
							{recap.resources.map((resource) => (
								<li key={resource.url}>
									<a
										href={resource.url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm text-cursor-text hover:underline inline-flex items-center gap-1.5"
									>
										{resource.label}
										<LinkIcon className="w-3 h-3 text-cursor-text-muted" />
									</a>
								</li>
							))}
						</ul>
					</div>
				) : null}

				<PhotoGallery photos={recap.photos} embedded />

				{recap.photoCredits && recap.photoCredits.length > 0 ? (
					<div className="border-t border-cursor-border mt-6 pt-6 text-sm text-cursor-text-muted">
						<span className="mr-1">Photo credits:</span>
						{recap.photoCredits.map((credit, index) => (
							<span key={`${credit.name}-${index}`}>
								{credit.url ? (
									<a
										href={credit.url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-cursor-text hover:underline"
									>
										{credit.name}
									</a>
								) : (
									<span className="text-cursor-text">{credit.name}</span>
								)}
								{index < recap.photoCredits!.length - 1 ? <span>, </span> : <span>.</span>}
							</span>
						))}
					</div>
				) : null}
			</div>
		</motion.section>
	);
};

export default EventRecap;
