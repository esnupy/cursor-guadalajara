'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretLeftIcon, CaretRightIcon, XIcon } from '@phosphor-icons/react';
import GlobalEventItem from '@/components/GlobalEventItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { globalEventsSection } from '@/content/world-events';
import { getPhotos } from '@/lib/photos';
import { EASE_OUT_SPRING, useBrandMotion } from '@/lib/motion';

export default function GlobalEvents() {
	const photos = getPhotos();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const { slideUp, transition, prefersReducedMotion } = useBrandMotion();

	if (photos.length === 0) {
		return null;
	}

	const motionTransition = { duration: prefersReducedMotion ? 0 : 0.3, ease: EASE_OUT_SPRING };
	const currentPhoto = photos[currentIndex];

	return (
		<motion.section
			initial={slideUp.initial}
			whileInView={slideUp.animate}
			viewport={{ once: true, margin: '-50px' }}
			transition={transition}
			className="px-5 py-12 md:py-17"
		>
			<h2 className="mb-1 text-2xl tracking-tight">{globalEventsSection.title}</h2>
			<p className="mb-6 max-w-2xl text-2xl text-muted-foreground">{globalEventsSection.description}</p>

			<div className="grid grid-cols-2 gap-6 md:grid-cols-3">
				{photos.map((photo, index) => (
					<motion.div
						key={`${photo.location}-${photo.src}`}
						initial={slideUp.initial}
						whileInView={slideUp.animate}
						viewport={{ once: true, margin: '-50px' }}
						transition={{ ...transition, delay: transition.duration ? index * 0.08 : 0 }}
					>
						<GlobalEventItem
							photo={photo}
							onImageClick={() => {
								setCurrentIndex(index);
								setIsFullscreen(true);
							}}
						/>
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
									{currentPhoto.date ? <p className="text-sm text-muted-foreground">{currentPhoto.date}</p> : null}
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
