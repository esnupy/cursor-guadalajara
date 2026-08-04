'use client';

import { motion } from 'framer-motion';
import WorldEventsCarousel from '@/components/WorldEventsCarousel';
import { Card, CardContent } from '@/components/ui/card';
import { useBrandMotion } from '@/lib/motion';

export default function GlobalEvents() {
	const { slideUp, transition } = useBrandMotion();

	return (
		<motion.section
			initial={slideUp.initial}
			whileInView={slideUp.animate}
			viewport={{ once: true, margin: '-50px' }}
			transition={transition}
			className="mb-16"
		>
			<Card>
				<CardContent className="pt-6 text-xl">
					<h2 className="mb-1 tracking-tight">Café Cursor alrededor del mundo</h2>
					<p className="mb-6 text-muted-foreground">
						Usuarios de Cursor construyen juntos en todo el mundo. Aunque vivimos en distintas zonas horarias, somos una
						sola comunidad.
					</p>
					<WorldEventsCarousel />
				</CardContent>
			</Card>
		</motion.section>
	);
}
