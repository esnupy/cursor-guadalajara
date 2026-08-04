'use client';

import { motion } from 'framer-motion';
import WorldEventsCarousel from '@/components/WorldEventsCarousel';
import { Card, CardContent } from '@/components/ui/card';

export default function GlobalEvents() {
	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{ duration: 0.5 }}
			className="mb-16"
		>
			<Card>
				<CardContent className="pt-6">
					<h2 className="mb-2 text-xl font-semibold text-foreground md:text-2xl">Cafe Cursor alrededor del mundo</h2>
					<p className="mb-6 text-sm text-muted-foreground md:text-base">
						Usuarios de Cursor construyen juntos en todo el mundo. Aunque vivimos en distintas zonas horarias, somos una
						sola comunidad.
					</p>
					<WorldEventsCarousel />
				</CardContent>
			</Card>
		</motion.section>
	);
}
