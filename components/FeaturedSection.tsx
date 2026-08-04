'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@phosphor-icons/react';
import { featuredResource } from '@/content/featured';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useBrandMotion } from '@/lib/motion';

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
				<CardContent className="pt-6">
					<Badge variant="brand" className="mb-4">
						Destacado
					</Badge>

					<h2 className="mb-1 text-3xl leading-tight tracking-tight md:text-4xl">{featuredResource.title}</h2>
					<p className="mb-6 leading-relaxed text-muted-foreground">{featuredResource.description}</p>

					<Button asChild variant="secondary">
						<Link
							href={featuredResource.href}
							{...(featuredResource.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
							aria-label={featuredResource.ctaLabel || 'Ver slides'}
						>
							{featuredResource.ctaLabel || 'Ver slides'}
							<ArrowRightIcon weight="regular" className="size-4" aria-hidden="true" />
						</Link>
					</Button>
				</CardContent>
			</Card>
		</motion.section>
	);
}
