'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import TalkDeck, { type TalkDeckSlide } from '@/components/talks/TalkDeck';

export type VideoInset = {
	left: string;
	top: string;
	width: string;
	height: string;
};

export type AssetSlide =
	| {
			id: string;
			type: 'image';
			src: string;
			alt: string;
	  }
	| {
			id: string;
			type: 'video';
			src: string;
			alt: string;
			poster?: string;
	  }
	| {
			id: string;
			type: 'composite';
			image: string;
			video: string;
			alt: string;
			inset: VideoInset;
	  };

type AssetDeckProps = {
	label: string;
	slides: readonly AssetSlide[];
};

function SlideImage({ src, alt }: { src: string; alt: string }) {
	return (
		<div className="relative h-full w-full bg-background">
			<Image src={src} alt={alt} fill className="object-contain" sizes="(max-width: 1920px) 100vw, 1920px" priority />
		</div>
	);
}

function SlideVideo({ src, poster, alt }: { src: string; poster?: string; alt: string }) {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) {
			return;
		}

		video.currentTime = 0;
		void video.play().catch(() => {
			/* Autoplay may be blocked; controls remain available. */
		});

		return () => {
			video.pause();
		};
	}, [src]);

	return (
		<div className="relative flex h-full w-full items-center justify-center bg-black">
			<video
				ref={videoRef}
				src={src}
				poster={poster}
				controls
				playsInline
				autoPlay
				muted
				loop
				aria-label={alt}
				className="h-full w-full object-contain"
			/>
		</div>
	);
}

function CompositeSlide({
	image,
	video,
	alt,
	inset,
}: {
	image: string;
	video: string;
	alt: string;
	inset: VideoInset;
}) {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const element = videoRef.current;
		if (!element) {
			return;
		}

		element.currentTime = 0;
		void element.play().catch(() => {
			/* Autoplay may be blocked; controls remain available. */
		});

		return () => {
			element.pause();
		};
	}, [video]);

	return (
		<div className="relative h-full w-full bg-black">
			<Image src={image} alt={alt} fill className="object-contain" sizes="(max-width: 1920px) 100vw, 1920px" priority />
			<div
				className="absolute overflow-hidden rounded-card"
				style={{
					left: inset.left,
					top: inset.top,
					width: inset.width,
					height: inset.height,
				}}
			>
				<video
					ref={videoRef}
					src={video}
					controls
					playsInline
					autoPlay
					muted
					loop
					aria-label={alt}
					className="h-full w-full object-cover"
				/>
			</div>
		</div>
	);
}

function toTalkSlides(slides: readonly AssetSlide[]): TalkDeckSlide[] {
	return slides.map((slide) => {
		if (slide.type === 'image') {
			return {
				id: slide.id,
				content: <SlideImage src={slide.src} alt={slide.alt} />,
			};
		}

		if (slide.type === 'video') {
			return {
				id: slide.id,
				content: <SlideVideo src={slide.src} poster={slide.poster} alt={slide.alt} />,
			};
		}

		return {
			id: slide.id,
			content: <CompositeSlide image={slide.image} video={slide.video} alt={slide.alt} inset={slide.inset} />,
		};
	});
}

export default function AssetDeck({ label, slides }: AssetDeckProps) {
	return <TalkDeck label={label} slides={toTalkSlides(slides)} />;
}
