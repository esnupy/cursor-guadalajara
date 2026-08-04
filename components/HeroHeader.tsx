'use client';

import { motion } from 'framer-motion';
import BentoGrid from '@/components/BentoGrid';
import { headerPhotos } from '@/content/header-photos';

export default function HeroHeader() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6, delay: 0.2 }}
			className="h-[calc(100svh-56px)] overflow-hidden border-t border-border"
			style={{
				maskImage: 'linear-gradient(to bottom, black 85%, transparent)',
				WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent)',
			}}
		>
			<BentoGrid photos={headerPhotos} cols={4} rows={4} mobileCols={2} mobileRows={4} />
		</motion.div>
	);
}
