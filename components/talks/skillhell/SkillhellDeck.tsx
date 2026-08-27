'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { CaretLeftIcon, CaretRightIcon, CornersInIcon, CornersOutIcon } from '@phosphor-icons/react';
import { skillhellLora } from '@/components/talks/skillhell/font';
import { skillhellSlides } from '@/components/talks/skillhell/slides';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const LAST_INDEX = skillhellSlides.length - 1;

type SkillhellSlide = (typeof skillhellSlides)[number];

function getSlideSteps(slide: SkillhellSlide) {
	return 'steps' in slide ? slide.steps : 0;
}

function renderSlideContent(slide: SkillhellSlide, step: number): ReactNode {
	return typeof slide.content === 'function' ? slide.content(step) : slide.content;
}

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
	const [step, setStep] = useState(0);
	const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);
	const [isFakeFullscreen, setIsFakeFullscreen] = useState(false);

	const isFullscreen = isNativeFullscreen || isFakeFullscreen;
	const slide = skillhellSlides[index];
	const lastStep = getSlideSteps(slide);
	const isFirstPosition = index === 0 && step === 0;
	const isLastPosition = index === LAST_INDEX && step >= lastStep;

	const goPrev = useCallback(() => {
		if (step > 0) {
			setStep(step - 1);
			return;
		}

		if (index === 0) {
			return;
		}

		const previousIndex = index - 1;
		setIndex(previousIndex);
		setStep(getSlideSteps(skillhellSlides[previousIndex]));
	}, [index, step]);

	const goNext = useCallback(() => {
		if (step < lastStep) {
			setStep(step + 1);
			return;
		}

		if (index >= LAST_INDEX) {
			return;
		}

		setIndex(index + 1);
		setStep(0);
	}, [index, lastStep, step]);

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
				skillhellLora.className,
				'mx-auto flex w-full max-w-480 flex-col bg-background text-foreground',
				'fullscreen:h-full fullscreen:max-w-none',
				'[&:-webkit-full-screen]:h-full [&:-webkit-full-screen]:max-w-none',
				isFakeFullscreen && 'fixed inset-0 z-50 max-w-none',
			)}
		>
			<div className={cn('flex w-full items-center justify-center', isFullscreen && 'min-h-0 flex-1')}>
				<div
					className={cn(
						'aspect-video w-full max-w-480 overflow-hidden rounded-card border border-border bg-background',
						isFullscreen && 'w-[min(100%,1920px,calc((100dvh-4.5rem)*16/9))]',
					)}
				>
					<div
						key={slide.id}
						role="group"
						aria-roledescription="slide"
						aria-label={`Slide ${index + 1} de ${skillhellSlides.length}`}
						className="flex h-full min-h-0 flex-col overflow-y-auto"
					>
						{renderSlideContent(slide, step)}
					</div>
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
						disabled={isFirstPosition}
						aria-label="Slide anterior"
					>
						<CaretLeftIcon weight="regular" className="size-5" />
					</Button>
					<Button
						type="button"
						variant="outline"
						size="icon-lg"
						onClick={goNext}
						disabled={isLastPosition}
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
