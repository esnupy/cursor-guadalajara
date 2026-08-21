'use client';

import Link from 'next/link';
import { ArrowLeftIcon, ArrowUpRightIcon } from '@phosphor-icons/react';
import CharlasApplyDialog from '@/components/CharlasApplyDialog';
import { Card, CardContent } from '@/components/ui/card';
import { charlasCall, getCharlasEvent } from '@/content/charlas';
import { siteConfig } from '@/content/site.config';

/**
 * Public speaker-call landing for the Guadalajara meetup.
 */
export default function CharlasLanding() {
	const event = getCharlasEvent();

	return (
		<div className="px-[clamp(1.25rem,4vw,4rem)] py-12">
			<Link href="/" aria-label="Volver al inicio" className="link mb-8">
				<ArrowLeftIcon weight="regular" className="size-4" aria-hidden="true" />
				Volver al inicio
			</Link>
			<p className="mb-1 text-cursor-accent">{charlasCall.kicker}</p>
			<h1 className="mb-1 text-2xl tracking-tight">{charlasCall.title}</h1>
			<p className="mb-2 text-2xl text-muted-foreground">
				{event.displayDate}
				<span className="text-muted-foreground/50"> · </span>
				{event.location}
			</p>
			<div className="mt-8 mb-12">
				<CharlasApplyDialog open={charlasCall.open} />
			</div>
			<p className="mb-12 max-w-3xl text-xl leading-relaxed text-muted-foreground">{charlasCall.intro}</p>
			<div className="grid gap-4 md:grid-cols-3">
				{charlasCall.highlights.map((highlight) => (
					<Card key={highlight.title}>
						<CardContent>
							<h2 className="mb-1 tracking-tight">{highlight.title}</h2>
							<p className="leading-relaxed text-muted-foreground">{highlight.body}</p>
						</CardContent>
					</Card>
				))}
			</div>
			<p className="mt-12 max-w-3xl text-muted-foreground">
				Si no puedes postularte desde Cursor, escríbenos por WhatsApp.{' '}
				<a
					href={charlasCall.fallbackContact.href}
					target="_blank"
					rel="noopener noreferrer"
					className="link inline-flex"
				>
					{charlasCall.fallbackContact.label}
					<ArrowUpRightIcon weight="regular" className="size-3.5" aria-hidden="true" />
				</a>
			</p>
			{event.lumaUrl ? (
				<p className="mt-4 max-w-3xl text-muted-foreground">
					¿Solo quieres ir? El registro de asistencia está en Luma.{' '}
					<a href={event.lumaUrl} target="_blank" rel="noopener noreferrer" className="link inline-flex">
						Regístrate en {siteConfig.communityName}
						<ArrowUpRightIcon weight="regular" className="size-3.5" aria-hidden="true" />
					</a>
				</p>
			) : null}
		</div>
	);
}
