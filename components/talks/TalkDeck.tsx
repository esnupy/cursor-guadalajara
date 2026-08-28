'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { CaretLeftIcon, CaretRightIcon, CornersInIcon, CornersOutIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export type TalkDeckSlide = {
	id: string;
	steps?: number;
	content: ReactNode | ((step: number) => ReactNode);
};

const SLIDE_HASH = /^#slide-(\d+)$/;

function parseSlideHash(hash: string, slideCount: number) {
	const match = SLIDE_HASH.exec(hash);
	if (!match) {
		return null;
	}

	const slideNumber = Number.parseInt(match[1], 10);
	if (slideNumber < 1) {
		return null;
	}

	return Math.min(slideNumber, slideCount) - 1;
}

function slideHash(index: number) {
	return `#slide-${index + 1}`;
}

const slideHashListeners = new Set<() => void>();

function subscribeSlideHash(onStoreChange: () => void) {
	const onHashChange = () => onStoreChange();
	slideHashListeners.add(onStoreChange);
	window.addEventListener('hashchange', onHashChange);
	return () => {
		slideHashListeners.delete(onStoreChange);
		window.removeEventListener('hashchange', onHashChange);
	};
}

function replaceSlideHash(index: number) {
	const nextHash = slideHash(index);
	if (window.location.hash === nextHash) {
		return false;
	}

	const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;
	window.history.replaceState(null, '', nextUrl);
	return true;
}

function setSlideIndex(index: number) {
	if (!replaceSlideHash(index)) {
		return;
	}

	for (const listener of slideHashListeners) {
		listener();
	}
}

function getSlideSteps(slide: TalkDeckSlide) {
	return slide.steps ?? 0;
}

function renderSlideContent(slide: TalkDeckSlide, step: number): ReactNode {
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
		target.tagName === 'SELECT' ||
		target.tagName === 'VIDEO' ||
		target.closest('video') !== null
	);
}

type TalkDeckProps = {
	label: string;
	slides: readonly TalkDeckSlide[];
	className?: string;
};

export default function TalkDeck({ label, slides, className }: TalkDeckProps) {
	const stageRef = useRef<HTMLDivElement>(null);
	const lastIndex = slides.length - 1;
	const slideCount = slides.length;

	const getSlideIndexFromLocation = useCallback(() => {
		return parseSlideHash(window.location.hash, slideCount) ?? 0;
	}, [slideCount]);

	const index = useSyncExternalStore(subscribeSlideHash, getSlideIndexFromLocation, () => 0);
	const [step, setStep] = useState(0);
	const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);
	const [isFakeFullscreen, setIsFakeFullscreen] = useState(false);

	const isFullscreen = isNativeFullscreen || isFakeFullscreen;
	const slide = slides[index] ?? slides[0];
	const lastStep = getSlideSteps(slide);
	const isFirstPosition = index === 0 && step === 0;
	const isLastPosition = index === lastIndex && step >= lastStep;

	const goPrev = useCallback(() => {
		if (step > 0) {
			setStep(step - 1);
			return;
		}

		if (index === 0) {
			return;
		}

		const previousIndex = index - 1;
		setSlideIndex(previousIndex);
		setStep(getSlideSteps(slides[previousIndex]));
	}, [index, slides, step]);

	const goNext = useCallback(() => {
		if (step < lastStep) {
			setStep(step + 1);
			return;
		}

		if (index >= lastIndex) {
			return;
		}

		setSlideIndex(index + 1);
		setStep(0);
	}, [index, lastIndex, lastStep, step]);

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
		// Re-read the hash after hydration — getServerSnapshot always returns 0.
		for (const listener of slideHashListeners) {
			listener();
		}
	}, []);

	useEffect(() => {
		if (parseSlideHash(window.location.hash, slides.length) === null) {
			replaceSlideHash(index);
		}
	}, [index, slides.length]);

	useEffect(() => {
		const onHashChange = () => {
			setStep(0);
		};

		window.addEventListener('hashchange', onHashChange);
		return () => window.removeEventListener('hashchange', onHashChange);
	}, []);

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

			if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
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
			aria-label={label}
			className={cn(
				'mx-auto flex w-full max-w-480 flex-col bg-background text-foreground',
				'fullscreen:h-full fullscreen:max-w-none',
				'[&:-webkit-full-screen]:h-full [&:-webkit-full-screen]:max-w-none',
				isFakeFullscreen && 'fixed inset-0 z-50 max-w-none',
				className,
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
						aria-label={`Slide ${index + 1} de ${slides.length}`}
						className="flex h-full min-h-0 flex-col overflow-hidden"
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
						{index + 1} / {slides.length}
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
