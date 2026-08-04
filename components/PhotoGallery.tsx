'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GalleryPhoto } from '@/lib/types';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PhotoGalleryProps {
	photos: GalleryPhoto[];
	embedded?: boolean;
}

export default function PhotoGallery({ photos, embedded = false }: PhotoGalleryProps) {
	const { t } = useI18n();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFullscreen, setIsFullscreen] = useState(false);

	if (photos.length === 0) {
		return null;
	}

	const currentPhoto = photos[currentIndex];

	const content = (
		<>
			<div className="mb-6 flex items-baseline justify-between gap-4">
				<div>
					<h2 className={embedded ? 'text-lg font-semibold text-foreground' : 'text-xl font-semibold text-foreground'}>
						{t('recap.galleryTitle')}
					</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						{t('recap.gallerySubtitle', { count: String(photos.length) })}
					</p>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4 md:grid-cols-3">
				{photos.map((photo, index) => (
					<motion.button
						key={`${photo.src}-${index}`}
						type="button"
						initial={{ opacity: 0, scale: 0.98 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.25) }}
						className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted text-left"
						onClick={() => {
							setCurrentIndex(index);
							setIsFullscreen(true);
						}}
						aria-label={t('recap.openPhoto', { index: String(index + 1) })}
					>
						<Image
							src={photo.src}
							alt={photo.alt}
							fill
							className="object-cover transition-transform duration-300 hover:scale-105"
							sizes="(max-width: 768px) 50vw, 33vw"
						/>
					</motion.button>
				))}
			</div>

			<AnimatePresence>
				{isFullscreen ? (
					<div
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
						onClick={() => setIsFullscreen(false)}
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.98 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.98 }}
							transition={{ duration: 0.2 }}
							className="relative max-h-[90vh] w-full max-w-6xl"
							onClick={(event) => event.stopPropagation()}
						>
							<Button
								variant="secondary"
								size="icon"
								className="absolute top-4 right-4 z-10"
								onClick={() => setIsFullscreen(false)}
								aria-label={t('recap.closeGallery')}
							>
								<X className="size-5" />
							</Button>

							<div className="relative mb-4 h-[80vh] w-full">
								<AnimatePresence mode="wait">
									<motion.div
										key={currentIndex}
										initial={{ opacity: 0, x: 40 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -40 }}
										transition={{ duration: 0.2 }}
										className="relative size-full"
									>
										<Image src={currentPhoto.src} alt={currentPhoto.alt} fill className="object-contain" sizes="90vw" />
									</motion.div>
								</AnimatePresence>
							</div>

							<Card>
								<CardContent className="py-4 text-center">
									<p className="font-medium text-foreground">
										{t('recap.photoLabel', { index: String(currentIndex + 1), total: String(photos.length) })}
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
										aria-label={t('recap.prevPhoto')}
									>
										<ChevronLeft className="size-6" />
									</Button>
									<Button
										variant="secondary"
										size="icon"
										className="absolute top-1/2 right-4 -translate-y-1/2"
										onClick={() => setCurrentIndex((prev) => (prev + 1) % photos.length)}
										aria-label={t('recap.nextPhoto')}
									>
										<ChevronRight className="size-6" />
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
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.1 }}
			className="mb-8"
		>
			<Card>
				<CardContent className="pt-8">{content}</CardContent>
			</Card>
		</motion.section>
	);
}
