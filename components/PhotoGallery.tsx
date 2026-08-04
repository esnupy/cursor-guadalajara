'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretLeftIcon, CaretRightIcon, XIcon } from '@phosphor-icons/react';
import { GalleryPhoto } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { EASE_OUT_SPRING, useBrandMotion } from '@/lib/motion';

interface PhotoGalleryProps {
	photos: GalleryPhoto[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const { slideUp, transition, prefersReducedMotion } = useBrandMotion();

	if (photos.length === 0) {
		return null;
	}

	const currentPhoto = photos[currentIndex];
	const motionTransition = { duration: transition.duration || 0.25, ease: EASE_OUT_SPRING };

	return (
		<motion.section
			initial={slideUp.initial}
			whileInView={slideUp.animate}
			viewport={{ once: true, margin: '-50px' }}
			transition={transition}
		>
			<div className="mb-6">
				<h2 className="mb-1 text-2xl tracking-tight">Fotos</h2>
				<p className="text-xl text-muted-foreground">{photos.length} fotos del evento</p>
			</div>

			<div className="grid grid-cols-2 gap-4 md:grid-cols-3">
				{photos.map((photo, index) => (
					<motion.div
						key={`${photo.src}-${index}`}
						initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true, margin: '-50px' }}
						transition={{ ...motionTransition, delay: prefersReducedMotion ? 0 : Math.min(index * 0.02, 0.25) }}
					>
						<button
							type="button"
							onClick={() => {
								setCurrentIndex(index);
								setIsFullscreen(true);
							}}
							aria-label={`Abrir foto ${index + 1}: ${photo.alt}`}
							className={cn(
								'group relative aspect-square w-full cursor-pointer overflow-hidden rounded-card',
								'ring-1 ring-foreground/10 transition-[ring-color,transform] hover:ring-primary/50',
								'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
							)}
						>
							<Image
								src={photo.src}
								alt={photo.alt}
								fill
								className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none"
								sizes="(max-width: 768px) 50vw, 33vw"
							/>
						</button>
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
		</motion.section>
	);
}
