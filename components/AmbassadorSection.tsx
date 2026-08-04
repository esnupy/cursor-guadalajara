'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { GlobeIcon, LinkedinLogoIcon } from '@phosphor-icons/react';
import { siGithub, siX } from 'simple-icons';
import { ambassadors } from '@/content/ambassadors';
import { siteConfig } from '@/content/site.config';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useBrandMotion } from '@/lib/motion';

type BrandIconProps = {
	iconPath: string;
	className?: string;
};

function BrandIcon({ iconPath, className }: BrandIconProps) {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
			<path d={iconPath} fill="currentColor" />
		</svg>
	);
}

type SocialIconProps = {
	kind: 'x' | 'linkedin' | 'github' | 'website';
};

function SocialIcon({ kind }: SocialIconProps) {
	if (kind === 'x') return <BrandIcon iconPath={siX.path} className="size-2.5" />;
	if (kind === 'linkedin') return <LinkedinLogoIcon weight="regular" className="size-4" />;
	if (kind === 'github') return <BrandIcon iconPath={siGithub.path} className="size-3" />;
	return <GlobeIcon weight="regular" className="size-4" />;
}

export default function AmbassadorSection() {
	const { slideUp, transition } = useBrandMotion();

	if (ambassadors.length === 0) {
		return null;
	}

	return (
		<motion.section
			initial={slideUp.initial}
			whileInView={slideUp.animate}
			viewport={{ once: true, margin: '-50px' }}
			transition={transition}
			className="mb-16"
		>
			<h2 className="text-2xl tracking-tight">Conoce al equipo</h2>
			<p className="mb-6 text-2xl text-muted-foreground">
				Embajadores de la comunidad de Cursor en {siteConfig.communityNameLocal}.
			</p>

			<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
				{ambassadors.map((ambassador, index) => {
					const links = [
						{ kind: 'x' as const, href: ambassador.links.x },
						{ kind: 'linkedin' as const, href: ambassador.links.linkedin },
						{ kind: 'github' as const, href: ambassador.links.github },
						{ kind: 'website' as const, href: ambassador.links.website },
					].filter((entry) => Boolean(entry.href));

					return (
						<motion.article
							key={ambassador.name}
							initial={slideUp.initial}
							whileInView={slideUp.animate}
							viewport={{ once: true, margin: '-50px' }}
							transition={{ ...transition, delay: transition.duration ? index * 0.07 : 0 }}
						>
							<Card variant="interactive">
								<CardContent className="pt-6">
									<div className="flex items-center gap-4">
										<div className="relative size-20 overflow-hidden rounded-full border-2 border-border">
											<Image
												src={ambassador.photo}
												alt={ambassador.name}
												fill
												className="object-cover grayscale transition duration-500 group-hover/card:grayscale-0 motion-reduce:grayscale-0"
												sizes="80px"
											/>
										</div>
										<div>
											<p>{ambassador.name}</p>
											{ambassador.role ? <p className="text-muted-foreground">{ambassador.role}</p> : null}
										</div>
									</div>

									{links.length > 0 ? (
										<div className="mt-4 flex items-center gap-2">
											{links.map((link) => (
												<Button key={`${ambassador.name}-${link.kind}`} variant="outline" size="icon-sm" asChild>
													<a
														href={link.href}
														target="_blank"
														rel="noopener noreferrer"
														aria-label={`${ambassador.name} ${link.kind}`}
													>
														<SocialIcon kind={link.kind} />
													</a>
												</Button>
											))}
										</div>
									) : null}
								</CardContent>
							</Card>
						</motion.article>
					);
				})}
			</div>
		</motion.section>
	);
}
