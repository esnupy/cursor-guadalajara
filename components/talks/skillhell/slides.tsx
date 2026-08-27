'use client';

import Image from 'next/image';
import { useState, type ReactNode } from 'react';
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
import CursorLockupSwap from '@/components/icons/CursorLockupSwap';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const display = 'leading-[1.12] tracking-tight text-balance';
const padding = 'p-[clamp(1.25rem,4vw,3.5rem)]';
const bodyFrame = cn(padding, 'flex h-full min-h-0 flex-1 flex-col items-start justify-start');

function Container({ children }: { children: ReactNode }) {
	return (
		<div className={cn(display, 'relative grid grid-cols-2 grid-rows-1 w-full h-full')}>
			{children}
			<CursorLockupSwap size={40} className="absolute bottom-4 right-4" />
		</div>
	);
}

function Lines({ lines }: { lines: readonly string[] }) {
	return (
		<>
			<p className="text-5xl text-foreground">{lines[0]}</p>
			{lines.slice(1).map((line, i) => (
				<p key={`line-${line}-${i}`} className={cn(display, 'mt-8 text-muted-foreground text-4xl')}>
					{line}
				</p>
			))}
		</>
	);
}

function TitleSlide() {
	return (
		<div
			className={cn(padding, 'flex h-full min-h-0 flex-1 flex-col items-start justify-start bg-cover')}
			style={{ backgroundImage: "url('/images/deck/deck-1.webp')" }}
		>
			<CursorLockupSwap size={90} className="mb-6" />
			{skillhellTalk.title.map((item, index) => (
				<h1 key={`title-cover-${index}`} className={cn(display, 'max-w-5xl text-5xl text-foreground')}>
					{item}
				</h1>
			))}
		</div>
	);
}

function MapCardExample({ src, alt, label }: { src: string; alt: string; label: string }) {
	const [failed, setFailed] = useState(false);

	if (!src || failed) {
		return (
			<div className="flex h-full items-center justify-center bg-muted px-6 text-center">
				<p className="text-3xl text-muted-foreground">{label} · ejemplo</p>
			</div>
		);
	}

	return (
		<Image
			src={src}
			alt={alt}
			fill
			className="object-cover object-left"
			sizes="(max-width: 1024px) 100vw, 40vw"
			onError={() => setFailed(true)}
		/>
	);
}

function hasMapExample(
	item: (typeof mapItems)[number],
): item is (typeof mapItems)[number] & { exampleSrc: string; exampleAlt: string } {
	return 'exampleSrc' in item && Boolean(item.exampleSrc);
}

const mapExampleCount = mapItems.filter(hasMapExample).length;

function MapSlide({ step = 0 }: { step?: number }) {
	return (
		<div className={bodyFrame}>
			<p className="mb-16 shrink-0 text-5xl">4 Cualidades de una buena skill</p>
			<div className="grid min-h-0 w-full flex-1 grid-cols-2 grid-rows-2 gap-8 sm:gap-x-10 sm:gap-y-8">
				{mapItems.map((item, index) => {
					const example = hasMapExample(item) ? item : null;
					const examplesBefore = mapItems.slice(0, index).filter(hasMapExample).length;
					const showExample = Boolean(example) && step > examplesBefore;

					return (
						<Card key={item.label} className="relative h-full min-h-0">
							<div
								aria-hidden={showExample}
								className={cn(
									'flex h-full flex-col transition-opacity duration-500 ease-out-spring',
									showExample && 'opacity-0',
								)}
							>
								<CardHeader className="text-4xl">{item.label}</CardHeader>
								<CardContent className="mt-4 text-3xl text-muted-foreground">{item.detail}</CardContent>
							</div>
							{example ? (
								<div
									aria-hidden={!showExample}
									className={cn(
										'absolute inset-0 transition-opacity duration-500 ease-out-spring',
										showExample ? 'opacity-100' : 'pointer-events-none opacity-0',
									)}
								>
									<MapCardExample src={example.exampleSrc} alt={example.exampleAlt} label={item.label} />
								</div>
							) : null}
						</Card>
					);
				})}
			</div>
		</div>
	);
}

function EasingTreeSlide() {
	return (
		<div className={cn(padding, 'grid h-full min-h-0 w-full flex-1 items-start gap-6 lg:grid-cols-2 lg:gap-10')}>
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
		content: (
			<Container>
				<div className={bodyFrame}>
					<Lines
						lines={['Hay demasiadas skills.', 'Las más virales no necesariamente tienen que encajar en tu flujo.']}
					/>
				</div>
			</Container>
		),
	},
	{
		id: 'asunciones',
		content: (
			<Container>
				<div className={bodyFrame}>
					<Lines
						lines={['Assumptions', 'Si hay un hueco, el modelo lo rellena, pero no siempre como tú lo tenías pensado.']}
					/>
				</div>
			</Container>
		),
	},
	{
		id: 'proceso',
		content: (
			<Container>
				<div className={bodyFrame}>
					<div className="h-full w-full">
						<Lines lines={['Qué hace una skill?', 'Una skill no pide el mismo resultado. Pide el mismo proceso.']} />
						<p className="text-muted-foreground text-4xl mt-8 italic">
							&quot;Sirve para que el razonamiento sea el mismo. El mismo árbol. Las mismas preguntas. Tú pones el
							criterio. El modelo camina por ahí.&quot;
						</p>
					</div>
				</div>
			</Container>
		),
	},
	{ id: 'mapa', steps: mapExampleCount, content: (step: number) => <MapSlide step={step} /> },
	{
		id: 'tesis',
		content: (
			<Container>
				<div className={bodyFrame}>
					<Lines
						lines={[
							'Para mí, el Skillhalla fueron los árboles de decisión.',
							'El modelo camina el mismo camino que tú le dictas.',
						]}
					/>
				</div>
				<div
					aria-hidden={true}
					className="w-full h-full bg-cover bg-right"
					style={{ backgroundImage: "url('/images/deck/deck-4.webp')" }}
				/>
			</Container>
		),
	},
	{
		id: 'easing-problema',
		content: (
			<Container>
				<div className={bodyFrame}>
					<Lines
						lines={[
							'Easings. El problema',
							'Con una skill sin dirección, cada elemento sale con una curva distinta.',
							'Nunca sabes cuál.',
						]}
					/>
				</div>
				<div
					className="w-full h-full bg-cover bg-right"
					style={{ backgroundImage: "url('/images/deck/deck-5.webp')" }}
				></div>
			</Container>
		),
	},
	{ id: 'easing-arbol', content: <EasingTreeSlide /> },
	{
		id: 'razonamiento',
		content: (
			<Container>
				<div className={bodyFrame}>
					<Lines lines={['El resultado sigue siendo distinto.', 'El razonamiento ya es tuyo.']} />
				</div>
			</Container>
		),
	},
	{ id: 'cta', content: <CtaSlide /> },
	{ id: 'preguntas', content: <QuestionsSlide /> },
] as const;
