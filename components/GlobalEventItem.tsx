'use client';

import Image from 'next/image';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import type { WorldEventPhoto } from '@/lib/types';

interface GlobalEventItemProps {
	photo: WorldEventPhoto;
	onImageClick: () => void;
}

export default function GlobalEventItem({ photo, onImageClick }: GlobalEventItemProps) {
	return (
		<Card variant="ghost" className="gap-3">
			<button
				type="button"
				onClick={onImageClick}
				aria-label={`Ver foto de ${photo.location}`}
				className="group relative aspect-4/5 w-full cursor-pointer overflow-hidden rounded-card"
			>
				<Image
					src={photo.src}
					alt={photo.alt}
					fill
					className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none"
					sizes="(max-width: 768px) 50vw, 33vw"
				/>
			</button>
			<div className="flex flex-col gap-1 px-0">
				<CardTitle className="font-medium">{photo.location}</CardTitle>
				{photo.date ? <CardDescription className="text-sm leading-relaxed">{photo.date}</CardDescription> : null}
			</div>
		</Card>
	);
}
