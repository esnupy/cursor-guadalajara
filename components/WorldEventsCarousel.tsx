'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretLeftIcon, CaretRightIcon, XIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import { getPhotos } from '@/lib/photos';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function WorldEventsCarousel() {
	const photos = getPhotos();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFullscreen, setIsFullscreen] = useState(false);

	if (photos.length === 0) {
		return null;
	}

	const currentPhoto = photos[currentIndex];

	return (
		<>
			<div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
				{photos.map((photo, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3, delay: index * 0.05 }}
						className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg border border-border"
						onClick={() => {
							setCurrentIndex(index);
							setIsFullscreen(true);
						}}
					>
						<Image
							src={photo.src}
							alt={photo.alt}
							fill
							className="object-cover transition-transform duration-300 group-hover:scale-110"
							sizes="(max-width: 768px) 50vw, 33vw"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
							<div className="absolute right-0 bottom-0 left-0 p-3">
								<p className="text-sm font-medium text-white">{photo.location}</p>
								{photo.date ? <p className="text-xs text-white/80">{photo.date}</p> : null}
							</div>
						</div>
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
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							className="relative max-h-[90vh] w-full max-w-6xl"
							onClick={(event) => event.stopPropagation()}
						>
							<Button
								variant="secondary"
								size="icon"
								className="absolute top-4 right-4 z-10"
								onClick={() => setIsFullscreen(false)}
								aria-label="Close"
							>
								<XIcon weight="regular" className="size-5" />
							</Button>

							<div className="relative mb-4 h-[80vh] w-full">
								<AnimatePresence mode="wait">
									<motion.div
										key={currentIndex}
										initial={{ opacity: 0, x: 100 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -100 }}
										transition={{ duration: 0.3 }}
										className="relative size-full"
									>
										<Image src={currentPhoto.src} alt={currentPhoto.alt} fill className="object-contain" sizes="90vw" />
									</motion.div>
								</AnimatePresence>
							</div>

							<Card>
								<CardContent className="py-4 text-center">
									<p className="mb-1 font-medium text-foreground">{currentPhoto.location}</p>
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
										aria-label="Previous photo"
									>
										<CaretLeftIcon weight="regular" className="size-6" />
									</Button>
									<Button
										variant="secondary"
										size="icon"
										className="absolute top-1/2 right-4 -translate-y-1/2"
										onClick={() => setCurrentIndex((prev) => (prev + 1) % photos.length)}
										aria-label="Next photo"
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
