'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon, ArrowSquareOutIcon } from '@phosphor-icons/react';
import CursorLockupSwap from '@/components/icons/CursorLockupSwap';
import { siteConfig } from '@/content/site.config';
import { upcomingEvents } from '@/content/events';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useBrandMotion } from '@/lib/motion';
import Link from 'next/link';

export default function Footer() {
	const nextEvent = upcomingEvents[0];
	const { fadeIn, transition } = useBrandMotion();

	return (
		<motion.footer
			initial={fadeIn.initial}
			whileInView={fadeIn.animate}
			viewport={{ once: true, margin: '-50px' }}
			transition={transition}
			className="mt-24 pt-8 text-sm"
		>
			<Separator className="mb-10" />

			<div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3 md:gap-12">
				<div>
					<div className="mb-2 flex items-center gap-1.5">
						<CursorLockupSwap size={22} className="h-5 w-auto" aria-hidden />
						<span>Community</span>
						<span className="text-muted-foreground">{siteConfig.communityNameLocal}</span>
					</div>
					<p className="leading-relaxed text-muted-foreground">{siteConfig.footerTagline}</p>
				</div>

				<div className="flex flex-col gap-2.5">
					<Link
						href={siteConfig.lumaUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 transition-colors hover:text-muted-foreground"
					>
						Todos los eventos en Luma
					</Link>
					<Link
						href={siteConfig.cursorCommunityUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 transition-colors hover:text-muted-foreground"
					>
						Comunidad Cursor
					</Link>
					<Link
						href="https://x.com/cursor_ai"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 transition-colors hover:text-muted-foreground"
					>
						Sigue a Cursor en X
					</Link>
				</div>

				<div>
					<Button asChild>
						<a
							href={nextEvent?.lumaUrl || siteConfig.lumaUrl}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Únete al próximo evento"
						>
							Únete al próximo evento
							<ArrowRightIcon weight="regular" className="size-3.5" aria-hidden="true" />
						</a>
					</Button>
				</div>
			</div>
		</motion.footer>
	);
}
