'use client';

import { motion } from 'framer-motion';
import { CameraIcon } from '@phosphor-icons/react';
import { useI18n } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';

export default function PhotoDisclaimer() {
	const { t } = useI18n();

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.4 }}
			className="mb-8"
		>
			<Card>
				<CardContent className="pt-8">
					<div className="mb-4 flex items-center gap-3">
						<CameraIcon weight="regular" className="size-5 text-foreground" />
						<h2 className="text-xl font-semibold text-foreground">{t('photos.title')}</h2>
					</div>

					<div className="space-y-3 text-sm text-muted-foreground">
						<p>{t('photos.description')}</p>
						<Card size="sm">
							<CardContent className="pt-6">
								<p className="mb-2 font-medium text-foreground">{t('photos.preference')}</p>
								<ul className="list-inside list-disc space-y-1 text-sm">
									<li>{t('photos.option1')}</li>
									<li>{t('photos.option2')}</li>
								</ul>
							</CardContent>
						</Card>
						<p className="text-xs">{t('photos.thanks')}</p>
					</div>
				</CardContent>
			</Card>
		</motion.section>
	);
}
