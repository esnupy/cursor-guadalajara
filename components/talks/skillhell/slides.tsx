'use client';

import Image from 'next/image';
import { ArrowUpRightIcon } from '@phosphor-icons/react';
import {
	easingDemoGifAlt,
	easingDemoGifSrc,
	easingTree,
	mapItems,
	skillhellSpeaker,
	skillhellTalk,
} from '@/content/talks/skillhell';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const display = 'text-[clamp(1.75rem,4.2vw,3.25rem)] leading-[1.12] tracking-tight text-balance';
const bodyFrame = 'flex h-full min-h-0 flex-1 flex-col items-start justify-start';

function Lines({ lines }: { lines: readonly [string, string] }) {
	return (
		<div className={bodyFrame}>
			<p className={cn(display, 'text-foreground')}>{lines[0]}</p>
			<p className={cn(display, 'mt-[0.35em] text-muted-foreground')}>{lines[1]}</p>
		</div>
	);
}

function TitleSlide() {
	return (
		<div className="flex h-full min-h-0 flex-1 flex-col items-center justify-center text-center">
			<h1 className={cn(display, 'max-w-5xl text-foreground')}>{skillhellTalk.title}</h1>
			<p className={cn(display, 'mt-[0.35em] text-muted-foreground')}>{skillhellTalk.event}</p>
			<p className={cn(display, 'text-muted-foreground')}>{skillhellTalk.date}</p>
		</div>
	);
}

function MapSlide() {
	return (
		<div className={bodyFrame}>
			<ul className="grid w-full gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8">
				{mapItems.map((item) => (
					<li key={item.label}>
						<p className={cn(display, 'text-foreground')}>{item.label}</p>
						<p className={cn(display, 'mt-[0.2em] text-muted-foreground')}>{item.detail}</p>
					</li>
				))}
			</ul>
		</div>
	);
}

function EasingTreeSlide() {
	return (
		<div className="grid h-full min-h-0 w-full flex-1 items-start gap-6 lg:grid-cols-2 lg:gap-10">
			<pre className="overflow-x-auto font-mono text-xl leading-relaxed whitespace-pre text-foreground">
				{easingTree}
			</pre>
			{easingDemoGifSrc ? (
				<div className="relative aspect-video overflow-hidden rounded-card border border-border">
					<Image
						src={easingDemoGifSrc}
						alt={easingDemoGifAlt}
						fill
						unoptimized
						className="object-cover"
						sizes="(max-width: 1024px) 100vw, 40vw"
					/>
				</div>
			) : (
				<div className="flex aspect-video items-center justify-center rounded-card bg-muted px-6 text-center">
					<p className="text-muted-foreground">GIF · demo de easing</p>
				</div>
			)}
		</div>
	);
}

function QuestionsSlide() {
	const speaker = skillhellSpeaker;
	const links = [
		{ href: speaker.links.linkedin, label: 'LinkedIn' },
		{ href: speaker.links.x, label: 'X' },
		{ href: speaker.links.github, label: 'GitHub' },
		{ href: speaker.links.website, label: 'juanda.dev' },
	].filter((link): link is { href: string; label: string } => Boolean(link.href));

	return (
		<div className={bodyFrame}>
			<p className={cn(display, 'mb-8 text-foreground')}>Preguntas</p>
			<div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
				<div className="relative size-28 shrink-0 overflow-hidden rounded-full border border-border sm:size-36">
					<Image src={speaker.photo} alt={speaker.name} fill className="object-cover" sizes="144px" />
				</div>
				<div>
					<p className={cn(display, 'text-foreground')}>{speaker.name}</p>
					{speaker.role ? <p className={cn(display, 'text-muted-foreground')}>{speaker.role}</p> : null}
					{links.length > 0 ? (
						<ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
							{links.map((link) => (
								<li key={link.label}>
									<a href={link.href} target="_blank" rel="noopener noreferrer" className="link">
										{link.label}
										<ArrowUpRightIcon weight="regular" className="size-4" aria-hidden="true" />
									</a>
								</li>
							))}
						</ul>
					) : null}
				</div>
			</div>
		</div>
	);
}

function CtaSlide() {
	return (
		<div className={bodyFrame}>
			<Badge variant="brand" className="mb-4">
				Esta semana
			</Badge>
			<p className={cn(display, 'text-foreground')}>Una cosa que Cursor te asume mal.</p>
			<p className={cn(display, 'mt-[0.35em] text-muted-foreground')}>Escríbele el árbol.</p>
		</div>
	);
}

export const skillhellSlides = [
	{ id: 'titulo', content: <TitleSlide /> },
	{
		id: 'skillhell',
		content: <Lines lines={['Hay demasiadas skills.', 'La más viral no tiene que encajar en tu flujo.']} />,
	},
	{
		id: 'asunciones',
		content: <Lines lines={['Si hay un hueco, el modelo lo rellena.', 'No con lo que querías.']} />,
	},
	{
		id: 'proceso',
		content: <Lines lines={['Una skill no pide el mismo resultado.', 'Pide el mismo proceso.']} />,
	},
	{ id: 'mapa', content: <MapSlide /> },
	{
		id: 'tesis',
		content: <Lines lines={['Skillhalla es un árbol de decisión.', 'El modelo camina el mismo camino.']} />,
	},
	{
		id: 'easing-problema',
		content: <Lines lines={['Sin skill, cada diálogo sale con una curva distinta.', 'Nunca sabes cuál.']} />,
	},
	{ id: 'easing-arbol', content: <EasingTreeSlide /> },
	{
		id: 'razonamiento',
		content: <Lines lines={['El resultado sigue siendo distinto.', 'El razonamiento ya es tuyo.']} />,
	},
	{ id: 'cta', content: <CtaSlide /> },
	{ id: 'preguntas', content: <QuestionsSlide /> },
] as const;
