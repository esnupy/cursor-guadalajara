'use client';

import { motion } from 'framer-motion';
import BentoGrid from '@/components/BentoGrid';
import CursorLockupSwap from '@/components/icons/CursorLockupSwap';
import { headerPhotos } from '@/content/header-photos';
import { siteConfig } from '@/content/site.config';
import { springTransitionSlow, useBrandMotion } from '@/lib/motion';

export default function HeroHeader() {
	const { fadeIn, transition } = useBrandMotion();

	return (
		<motion.div
			{...fadeIn}
			animate={fadeIn.animate}
			transition={{ ...springTransitionSlow, delay: transition.duration ? 0.2 : 0 }}
			className="relative h-[calc(100svh-56px)] overflow-hidden border-t border-border"
			style={{
				maskImage: 'linear-gradient(to bottom, black 85%, transparent)',
				WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent)',
			}}
		>
			<BentoGrid photos={headerPhotos} cols={4} rows={4} mobileCols={2} mobileRows={4} />
		</motion.div>
	);
}
