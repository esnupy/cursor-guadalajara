'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SlideLayoutProps {
	currentSlide: number;
	totalSlides: number;
	children: React.ReactNode;
	storageKey?: string;
}

export default function SlideLayout({
	currentSlide,
	totalSlides,
	children,
	storageKey = 'cursor-ambassador-current-slide',
}: SlideLayoutProps) {
	const router = useRouter();
	const pathname = usePathname();
	const [isNavigating, setIsNavigating] = useState(false);
	const [prevSlide, setPrevSlide] = useState(currentSlide);
	const basePath = pathname.replace(/\/\d+$/, '');

	if (currentSlide !== prevSlide) {
		setPrevSlide(currentSlide);
		setIsNavigating(false);
	}

	const goToSlide = useCallback(
		(slideId: number) => {
			if (slideId < 1 || slideId > totalSlides) return;
			setIsNavigating(true);
			router.push(`${basePath}/${slideId}`);
		},
		[router, basePath, totalSlides],
	);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (isNavigating) return;

			switch (event.key) {
				case 'ArrowLeft':
					event.preventDefault();
					if (currentSlide > 1) goToSlide(currentSlide - 1);
					break;
				case 'ArrowRight':
					event.preventDefault();
					if (currentSlide < totalSlides) goToSlide(currentSlide + 1);
					break;
				case 'Home':
					event.preventDefault();
					goToSlide(1);
					break;
				case 'End':
					event.preventDefault();
					goToSlide(totalSlides);
					break;
				default:
					break;
			}
		},
		[currentSlide, isNavigating, goToSlide, totalSlides],
	);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	useEffect(() => {
		localStorage.setItem(storageKey, String(currentSlide));
	}, [currentSlide, storageKey]);

	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground">
			<main className="flex flex-1 items-start justify-center overflow-y-auto p-6 pt-8 pb-32 md:p-10 md:pb-36">
				<div className="w-full max-w-6xl pb-16">{children}</div>
			</main>

			<div className="fixed right-0 bottom-0 left-0 border-t border-border bg-background/90 p-4 backdrop-blur-sm">
				<div className="mx-auto flex max-w-6xl items-center justify-between">
					<Button
						variant="secondary"
						onClick={() => goToSlide(currentSlide - 1)}
						disabled={currentSlide === 1}
						aria-label="Previous slide"
					>
						<ChevronLeft className="size-5" />
						<span className="hidden md:inline">Previous</span>
					</Button>

					<div className="flex items-center gap-2">
						{Array.from({ length: totalSlides }, (_, i) => i + 1).map((slideId) => (
							<button
								key={slideId}
								type="button"
								onClick={() => goToSlide(slideId)}
								className={cn(
									'h-2 rounded-full transition-all',
									slideId === currentSlide
										? 'w-8 bg-foreground'
										: 'w-2 bg-muted-foreground/40 hover:bg-muted-foreground',
								)}
								aria-label={`Go to slide ${slideId}`}
							/>
						))}
					</div>

					<div className="hidden text-sm text-muted-foreground md:block">
						{currentSlide} / {totalSlides}
					</div>

					<Button
						variant="secondary"
						onClick={() => goToSlide(currentSlide + 1)}
						disabled={currentSlide >= totalSlides}
						aria-label="Next slide"
					>
						<span className="hidden md:inline">Next</span>
						<ChevronRight className="size-5" />
					</Button>
				</div>
			</div>
		</div>
	);
}
