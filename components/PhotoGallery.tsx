'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretLeftIcon, CaretRightIcon, XIcon } from '@phosphor-icons/react';
import { GalleryPhoto } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EASE_OUT_SPRING, useBrandMotion } from '@/lib/motion';

interface PhotoGalleryProps {
	photos: GalleryPhoto[];
	embedded?: boolean;
}

export default function PhotoGallery({ photos, embedded = false }: PhotoGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const { slideUp, transition, prefersReducedMotion } = useBrandMotion();

	if (photos.length === 0) {
		return null;
	}

	const currentPhoto = photos[currentIndex];
	const motionTransition = { duration: transition.duration || 0.25, ease: EASE_OUT_SPRING };

	const content = (
		<>
			<div className="mb-6 flex items-baseline justify-between gap-4">
				<div>
					<h2 className={embedded ? 'text-2xl tracking-tight' : 'text-2xl tracking-tight'}>Fotos</h2>
					<p className="text-2xl text-muted-foreground">{photos.length} fotos del evento</p>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4 md:grid-cols-3">
				{photos.map((photo, index) => (
					<motion.div
						key={`${photo.src}-${index}`}
						initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ ...motionTransition, delay: prefersReducedMotion ? 0 : Math.min(index * 0.02, 0.25) }}
					>
						<Button
							variant="outline"
							className="relative aspect-square h-auto w-full overflow-hidden p-0 rounded-[4px]"
							onClick={() => {
								setCurrentIndex(index);
								setIsFullscreen(true);
							}}
							aria-label={`Abrir foto ${index + 1}`}
						>
							<Image
								src={photo.src}
								alt={photo.alt}
								fill
								className="object-cover transition-transform duration-300 hover:scale-105 motion-reduce:transform-none"
								sizes="(max-width: 768px) 50vw, 33vw"
							/>
						</Button>
					</motion.div>
				))}
			</div>

			<AnimatePresence>
				{isFullscreen ? (
					<div
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
						onClick={() => setIsFullscreen(false)}
					>
						<motion.div
							initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
							transition={motionTransition}
							className="relative max-h-[90vh] w-full max-w-6xl"
							onClick={(event) => event.stopPropagation()}
						>
							<Button
								variant="secondary"
								size="icon"
								className="absolute top-4 right-4 z-10"
								onClick={() => setIsFullscreen(false)}
								aria-label="Cerrar galería"
							>
								<XIcon weight="regular" className="size-5" />
							</Button>

							<div className="relative mb-4 h-[80vh] w-full">
								<AnimatePresence mode="wait">
									<motion.div
										key={currentIndex}
										initial={prefersReducedMotion ? false : { opacity: 0, x: 40 }}
										animate={{ opacity: 1, x: 0 }}
										exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -40 }}
										transition={motionTransition}
										className="relative size-full"
									>
										<Image src={currentPhoto.src} alt={currentPhoto.alt} fill className="object-contain" sizes="90vw" />
									</motion.div>
								</AnimatePresence>
							</div>

							<Card>
								<CardContent className="py-4 text-left">
									<p className="font-mono text-sm text-muted-foreground">
										{currentIndex + 1} / {photos.length}
									</p>
								</CardContent>
							</Card>

							{photos.length > 1 ? (
								<>
									<Button
										variant="secondary"
										size="icon"
										className="absolute top-1/2 left-4 -translate-y-1/2"
										onClick={() => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)}
										aria-label="Foto anterior"
									>
										<CaretLeftIcon weight="regular" className="size-6" />
									</Button>
									<Button
										variant="secondary"
										size="icon"
										className="absolute top-1/2 right-4 -translate-y-1/2"
										onClick={() => setCurrentIndex((prev) => (prev + 1) % photos.length)}
										aria-label="Foto siguiente"
									>
										<CaretRightIcon weight="regular" className="size-6" />
									</Button>
								</>
							) : null}
						</motion.div>
					</div>
				) : null}
			</AnimatePresence>
		</>
	);

	if (embedded) {
		return <div className="mt-6 border-t border-border pt-6">{content}</div>;
	}

	return (
		<motion.section
			initial={slideUp.initial}
			animate={slideUp.animate}
			transition={{ ...transition, delay: transition.duration ? 0.1 : 0 }}
			className="mb-8"
		>
			<Card>
				<CardContent className="pt-8">{content}</CardContent>
			</Card>
		</motion.section>
	);
}
