'use client';

import { motion } from 'framer-motion';
import { ArrowSquareOutIcon } from '@phosphor-icons/react';
import CursorLockupSwap from '@/components/icons/CursorLockupSwap';
import { siteConfig } from '@/content/site.config';
import { upcomingEvents } from '@/content/events';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useBrandMotion } from '@/lib/motion';

export default function Footer() {
	const nextEvent = upcomingEvents[0];
	const { fadeIn, transition } = useBrandMotion();

	return (
		<motion.footer
			initial={fadeIn.initial}
			whileInView={fadeIn.animate}
			viewport={{ once: true, margin: '-50px' }}
			transition={transition}
			className="mt-24 pt-8"
		>
			<Separator className="mb-10" />

			<div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3 md:gap-12">
				<div>
					<div className="mb-2 flex items-center gap-2">
						<CursorLockupSwap size={22} className="h-5 w-auto" aria-hidden />
						<span className="text-sm text-muted-foreground">{siteConfig.communityNameLocal}</span>
					</div>
					<p className="text-sm leading-relaxed text-muted-foreground">{siteConfig.footerTagline}</p>
				</div>

				<div className="flex flex-col gap-2.5">
					<a
						href={siteConfig.lumaUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
					>
						Todos los eventos en Luma
						<ArrowSquareOutIcon weight="regular" className="size-3" />
					</a>
					<a
						href={siteConfig.cursorCommunityUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
					>
						Comunidad Cursor
						<ArrowSquareOutIcon weight="regular" className="size-3" />
					</a>
					<a
						href="https://x.com/cursor_ai"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
					>
						Sigue a Cursor en X
						<ArrowSquareOutIcon weight="regular" className="size-3" />
					</a>
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
							<ArrowSquareOutIcon weight="regular" className="size-3.5" aria-hidden="true" />
						</a>
					</Button>
				</div>
			</div>

			<p className="mt-10 pb-6 text-left text-xs text-muted-foreground/70">{siteConfig.footerTagline}</p>
		</motion.footer>
	);
}
