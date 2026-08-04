'use client';

import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';

export default function MatchmakingSection() {
	const { t } = useI18n();

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.3 }}
			className="mb-8"
		>
			<Card>
				<CardContent className="pt-8">
					<div className="mb-6 flex items-center gap-3">
						<Users className="size-5 text-foreground" />
						<h2 className="text-xl font-semibold text-foreground">{t('matchmaking.title')}</h2>
					</div>

					<div className="space-y-6 text-muted-foreground">
						<Card size="sm">
							<CardContent className="pt-6">
								<h3 className="mb-3 text-base font-medium text-foreground">{t('matchmaking.howItWorks')}</h3>
								<ol className="list-inside list-decimal space-y-2 text-sm">
									<li>{t('matchmaking.step1', { numberCard: t('matchmaking.numberCard') })}</li>
									<li>{t('matchmaking.step2', { sameNumber: t('matchmaking.sameNumber') })}</li>
									<li>{t('matchmaking.step3')}</li>
								</ol>
							</CardContent>
						</Card>

						<Card size="sm">
							<CardContent className="pt-6">
								<h3 className="mb-3 text-base font-medium text-foreground">{t('matchmaking.iceBreakers')}</h3>
								<ul className="space-y-2 text-sm">
									<li className="flex items-start gap-2">
										<span className="text-foreground">•</span>
										<span>{t('matchmaking.question1')}</span>
									</li>
									<li className="flex items-start gap-2">
										<span className="text-foreground">•</span>
										<span>{t('matchmaking.question2')}</span>
									</li>
									<li className="flex items-start gap-2">
										<span className="text-foreground">•</span>
										<span>{t('matchmaking.question3')}</span>
									</li>
								</ul>
							</CardContent>
						</Card>
					</div>
				</CardContent>
			</Card>
		</motion.section>
	);
}
