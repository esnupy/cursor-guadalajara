'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretLeftIcon, CaretRightIcon, XIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import { getPhotos } from '@/lib/photos';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EASE_OUT_SPRING, useBrandMotion } from '@/lib/motion';

export default function WorldEventsCarousel() {
	const photos = getPhotos();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const { prefersReducedMotion } = useBrandMotion();

	if (photos.length === 0) {
		return null;
	}

	const currentPhoto = photos[currentIndex];
	const motionTransition = { duration: prefersReducedMotion ? 0 : 0.3, ease: EASE_OUT_SPRING };

	return (
		<>
			<div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
				{photos.map((photo, index) => (
					<motion.div
						key={index}
						initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ ...motionTransition, delay: prefersReducedMotion ? 0 : index * 0.05 }}
					>
						<Button
							variant="outline"
							className="group relative aspect-square h-auto w-full overflow-hidden p-0 rounded-card"
							onClick={() => {
								setCurrentIndex(index);
								setIsFullscreen(true);
							}}
							aria-label={`Ver foto de ${photo.location}`}
						>
							<Image
								src={photo.src}
								alt={photo.alt}
								fill
								className="object-cover transition-transform duration-300 group-hover:scale-110 motion-reduce:transform-none"
								sizes="(max-width: 768px) 50vw, 33vw"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent">
								<div className="absolute right-0 bottom-0 left-0 p-3 text-left text-base">
									<p className="text-white">{photo.location}</p>
									{photo.date ? <p className="text-white/80">{photo.date}</p> : null}
								</div>
							</div>
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
							initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
							transition={motionTransition}
							className="relative max-h-[90vh] w-full max-w-6xl"
							onClick={(event) => event.stopPropagation()}
						>
							<Button
								variant="secondary"
								size="icon"
								className="absolute top-4 right-4 z-10"
								onClick={() => setIsFullscreen(false)}
								aria-label="Cerrar"
							>
								<XIcon weight="regular" className="size-5" />
							</Button>

							<div className="relative mb-4 h-[80vh] w-full">
								<AnimatePresence mode="wait">
									<motion.div
										key={currentIndex}
										initial={prefersReducedMotion ? false : { opacity: 0, x: 100 }}
										animate={{ opacity: 1, x: 0 }}
										exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -100 }}
										transition={motionTransition}
										className="relative size-full"
									>
										<Image src={currentPhoto.src} alt={currentPhoto.alt} fill className="object-contain" sizes="90vw" />
									</motion.div>
								</AnimatePresence>
							</div>

							<Card>
								<CardContent className="py-4 text-left">
									<p className="mb-1">{currentPhoto.location}</p>
									<p className="text-sm text-muted-foreground">{currentPhoto.date}</p>
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
}
