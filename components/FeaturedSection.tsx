'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@phosphor-icons/react';
import { featuredResource } from '@/content/featured';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function FeaturedSection() {
	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			className="mb-16"
		>
			<Card>
				<CardContent className="pt-6">
					<p className="mb-4 text-xs uppercase tracking-wider text-muted-foreground">Destacado</p>

					<h2 className="mb-1 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
						{featuredResource.title}
					</h2>
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
