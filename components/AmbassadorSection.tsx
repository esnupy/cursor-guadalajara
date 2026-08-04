'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { GlobeIcon, LinkedinLogoIcon } from '@phosphor-icons/react';
import { siGithub, siX } from 'simple-icons';
import { ambassadors } from '@/content/ambassadors';
import { siteConfig } from '@/content/site.config';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type BrandIconProps = {
	iconPath: string;
};

function BrandIcon({ iconPath }: BrandIconProps) {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
			<path d={iconPath} fill="currentColor" />
		</svg>
	);
}

type SocialIconProps = {
	kind: 'x' | 'linkedin' | 'github' | 'website';
};

function SocialIcon({ kind }: SocialIconProps) {
	if (kind === 'x') return <BrandIcon iconPath={siX.path} />;
	if (kind === 'linkedin') return <LinkedinLogoIcon weight="regular" className="size-4" />;
	if (kind === 'github') return <BrandIcon iconPath={siGithub.path} />;
	return <GlobeIcon weight="regular" className="size-4" />;
}

export default function AmbassadorSection() {
	if (ambassadors.length === 0) {
		return null;
	}

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{ duration: 0.5 }}
			className="mb-16"
		>
			<p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
				Embajadores de Cursor {siteConfig.communityName}
			</p>
			<h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">Conoce al equipo</h2>

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
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-50px' }}
							transition={{ duration: 0.3, delay: index * 0.07 }}
						>
							<Card className="group transition-colors hover:border-primary/30">
								<CardContent className="pt-6">
									<div className="flex items-center gap-4">
										<div className="relative size-20 overflow-hidden rounded-full border-2 border-border">
											<Image
												src={ambassador.photo}
												alt={ambassador.name}
												fill
												className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
												sizes="80px"
											/>
										</div>
										<div>
											<p className="font-medium text-foreground">{ambassador.name}</p>
											{ambassador.role ? <p className="text-sm text-muted-foreground">{ambassador.role}</p> : null}
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
