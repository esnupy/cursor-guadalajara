'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@phosphor-icons/react';
import { featuredResource } from '@/content/featured';
import { Card, CardContent } from '@/components/ui/card';
import { useBrandMotion } from '@/lib/motion';
import Image from 'next/image';

export default function FeaturedSection() {
	const { slideUp, transition } = useBrandMotion();

	return (
		<motion.section
			initial={slideUp.initial}
			animate={slideUp.animate}
			transition={{ ...transition, delay: transition.duration ? 0.2 : 0 }}
			className="mb-16"
		>
			<Card>
				<CardContent className="text-xl md:grid md:grid-cols-2 md:grid-rows-1 flex flex-col gap-6">
					<div className="flex flex-col justify-center">
						<h2 className="mb-1 leading-tight tracking-tight">{featuredResource.title}</h2>
						<p className="mb-6 leading-relaxed text-muted-foreground">{featuredResource.description}</p>

						<Link
							href={featuredResource.href}
							{...(featuredResource.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
							aria-label={featuredResource.ctaLabel || 'Ver slides'}
							className="link"
						>
							{featuredResource.ctaLabel || 'Ver slides'}
							<ArrowRightIcon weight="regular" className="size-4" aria-hidden="true" />
						</Link>
					</div>
					<Image
						width={533}
						height={800}
						src="https://n6j6oimzljzhdeal.public.blob.vercel-storage.com/landing/DSC05014-highres-1785867702029.webp"
						className="aspect-9/16 w-107.5 object-cover rounded-[4px]"
						alt="Comunidad Cursor Guadalajara"
						unoptimized
					/>
				</CardContent>
			</Card>
		</motion.section>
	);
}
