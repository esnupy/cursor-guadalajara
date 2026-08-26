'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CaretLeftIcon, CaretRightIcon, CornersInIcon, CornersOutIcon } from '@phosphor-icons/react';
import { skillhellSlides } from '@/components/talks/skillhell/slides';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const LAST_INDEX = skillhellSlides.length - 1;

type WebkitDocument = Document & {
	webkitFullscreenElement?: Element | null;
	webkitExitFullscreen?: () => void;
};

type WebkitElement = HTMLElement & {
	webkitRequestFullscreen?: () => void;
};

function getFullscreenElement(): Element | null {
	const doc = document as WebkitDocument;
	return document.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
}

function requestElementFullscreen(element: HTMLElement) {
	if (element.requestFullscreen) {
		return element.requestFullscreen();
	}

	const webkitElement = element as WebkitElement;
	if (webkitElement.webkitRequestFullscreen) {
		webkitElement.webkitRequestFullscreen();
		return Promise.resolve();
	}

	return Promise.reject(new Error('Fullscreen API unavailable'));
}

function exitElementFullscreen() {
	const doc = document as WebkitDocument;
	if (document.exitFullscreen && document.fullscreenElement) {
		return document.exitFullscreen();
	}
	if (doc.webkitExitFullscreen && doc.webkitFullscreenElement) {
		doc.webkitExitFullscreen();
		return Promise.resolve();
	}
	return Promise.resolve();
}

function isTypingTarget(target: EventTarget | null) {
	if (!(target instanceof HTMLElement)) {
		return false;
	}

	return (
		target.isContentEditable ||
		target.tagName === 'INPUT' ||
		target.tagName === 'TEXTAREA' ||
		target.tagName === 'SELECT'
	);
}

export default function SkillhellDeck() {
	const stageRef = useRef<HTMLDivElement>(null);
	const [index, setIndex] = useState(0);
	const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);
	const [isFakeFullscreen, setIsFakeFullscreen] = useState(false);

	const isFullscreen = isNativeFullscreen || isFakeFullscreen;
	const slide = skillhellSlides[index];

	const goPrev = useCallback(() => {
		setIndex((current) => Math.max(0, current - 1));
	}, []);

	const goNext = useCallback(() => {
		setIndex((current) => Math.min(LAST_INDEX, current + 1));
	}, []);

	const toggleFullscreen = useCallback(async () => {
		const stage = stageRef.current;
		if (!stage) {
			return;
		}

		if (isFakeFullscreen) {
			setIsFakeFullscreen(false);
			return;
		}

		if (getFullscreenElement() === stage) {
			await exitElementFullscreen();
			return;
		}

		try {
			await requestElementFullscreen(stage);
		} catch {
			setIsFakeFullscreen(true);
		}
	}, [isFakeFullscreen]);

	useEffect(() => {
		const syncFullscreen = () => {
			setIsNativeFullscreen(getFullscreenElement() === stageRef.current);
		};

		document.addEventListener('fullscreenchange', syncFullscreen);
		document.addEventListener('webkitfullscreenchange', syncFullscreen);
		return () => {
			document.removeEventListener('fullscreenchange', syncFullscreen);
			document.removeEventListener('webkitfullscreenchange', syncFullscreen);
		};
	}, []);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.metaKey || event.ctrlKey || event.altKey || isTypingTarget(event.target)) {
				return;
			}

			if (event.key === 'ArrowRight' || event.key === 'PageDown') {
				event.preventDefault();
				goNext();
				return;
			}

			if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
				event.preventDefault();
				goPrev();
				return;
			}

			if (event.key === 'Escape' && isFakeFullscreen) {
				event.preventDefault();
				setIsFakeFullscreen(false);
			}
		};

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [goNext, goPrev, isFakeFullscreen]);

	return (
		<section
			ref={stageRef}
			aria-roledescription="presentación"
			aria-label="Presentación Del skillhell al skillhalla"
			className={cn(
				'flex min-h-[min(70vh,42rem)] flex-col bg-background text-foreground',
				'rounded-card border border-border',
				'fullscreen:h-full fullscreen:min-h-full fullscreen:rounded-none fullscreen:border-0',
				'[&:-webkit-full-screen]:h-full [&:-webkit-full-screen]:min-h-full [&:-webkit-full-screen]:rounded-none [&:-webkit-full-screen]:border-0',
				isFakeFullscreen && 'fixed inset-0 z-50 min-h-0 rounded-none border-0',
			)}
		>
			<div className="flex min-h-0 flex-1 flex-col p-[clamp(1.25rem,4vw,3.5rem)]">
				<div
					key={slide.id}
					role="group"
					aria-roledescription="slide"
					aria-label={`Slide ${index + 1} de ${skillhellSlides.length}`}
					className="flex min-h-0 flex-1 flex-col overflow-y-auto"
				>
					{slide.content}
				</div>
			</div>

			<Separator />

			<div className="flex items-center justify-between gap-3 px-[clamp(1rem,3vw,2rem)] py-3">
				<div className="flex items-center gap-2">
					<Button
						type="button"
						variant="outline"
						size="icon-lg"
						onClick={goPrev}
						disabled={index === 0}
						aria-label="Slide anterior"
					>
						<CaretLeftIcon weight="regular" className="size-5" />
					</Button>
					<Button
						type="button"
						variant="outline"
						size="icon-lg"
						onClick={goNext}
						disabled={index === LAST_INDEX}
						aria-label="Slide siguiente"
					>
						<CaretRightIcon weight="regular" className="size-5" />
					</Button>
					<p className="ml-2 font-mono text-sm tabular-nums text-muted-foreground">
						{index + 1} / {skillhellSlides.length}
					</p>
				</div>

				<Button
					type="button"
					variant="outline"
					size="lg"
					onClick={() => {
						void toggleFullscreen();
					}}
					aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
				>
					{isFullscreen ? (
						<CornersInIcon weight="regular" className="size-4" />
					) : (
						<CornersOutIcon weight="regular" className="size-4" />
					)}
					{isFullscreen ? 'Salir' : 'Pantalla completa'}
				</Button>
			</div>
		</section>
	);
}
