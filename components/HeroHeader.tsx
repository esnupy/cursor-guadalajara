'use client';

import { motion } from 'framer-motion';
import BentoGrid from '@/components/BentoGrid';
import { headerPhotos } from '@/content/header-photos';
import { springTransitionSlow, useBrandMotion } from '@/lib/motion';

export default function HeroHeader() {
	const { fadeIn, transition } = useBrandMotion();

	return (
		<motion.div
			{...fadeIn}
			animate={fadeIn.animate}
			transition={{ ...springTransitionSlow, delay: transition.duration ? 0.2 : 0 }}
			className="relative h-[min(800px,calc(100svh-56px))] overflow-hidden border-t border-border"
			style={{
				maskImage: 'linear-gradient(to bottom, black 85%, transparent)',
				WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent)',
			}}
		>
			<div className="mx-auto h-full w-full max-w-325 px-[clamp(1.25rem,4vw,4rem)]">
				<BentoGrid photos={headerPhotos} cols={4} rows={4} mobileCols={2} mobileRows={4} />
			</div>
		</motion.div>
	);
}
