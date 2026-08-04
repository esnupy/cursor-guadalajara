'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { partners } from '@/content/partners';

export default function Partners() {
	if (partners.length === 0) {
		return null;
	}

	return (
		<div className="mb-8">
			<h3 className="mb-4 text-sm text-muted-foreground">Socios anfitriones</h3>
			<div className="grid grid-cols-2 gap-3 md:grid-cols-4">
				{partners.map((partner) => (
					<a key={partner.name} href={partner.url} target="_blank" rel="noopener noreferrer" className="group">
						<Card variant="interactive" className="min-h-24">
							<CardContent className="flex flex-col items-start justify-center gap-2 pt-6">
								<div
									className="w-full overflow-hidden rounded-sm px-2 py-2"
									style={{ backgroundColor: partner.logoBg ?? '#ffffff' }}
								>
									<div className={`relative ${partner.logoHeight ?? 'h-10'} w-full`}>
										<Image
											src={partner.logo}
											alt={partner.name}
											fill
											className="object-contain opacity-60 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 motion-reduce:grayscale-0"
											sizes="(max-width: 768px) 45vw, 20vw"
										/>
									</div>
								</div>
								<span className="text-[11px] text-muted-foreground">{partner.name}</span>
							</CardContent>
						</Card>
					</a>
				))}
			</div>
		</div>
	);
}
