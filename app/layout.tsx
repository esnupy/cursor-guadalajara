import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Analytics } from '@vercel/analytics/react';
import { I18nProvider } from '@/lib/i18n';
import { siteConfig } from '@/content/site.config';
import './globals.css';

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.siteUrl),
	title: siteConfig.siteTitle,
	description: siteConfig.siteDescription,
	applicationName: siteConfig.siteTitle,
	openGraph: {
		title: siteConfig.siteTitle,
		description: siteConfig.siteDescription,
		url: siteConfig.siteUrl,
		siteName: siteConfig.siteTitle,
		locale: 'es_MX',
		type: 'website',
	},
	twitter: {
		card: 'summary',
		title: siteConfig.siteTitle,
		description: siteConfig.siteDescription,
	},
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	// Force dynamic rendering so Next.js can apply the CSP nonce from proxy.ts
	// to scripts. Without this, pages are prerendered with nonce=undefined and
	// strict-dynamic CSP blocks all client JS (Framer Motion stays at opacity: 0).
	await headers();

	return (
		<html lang={siteConfig.defaultLocale}>
			<body className="antialiased">
				<I18nProvider>{children}</I18nProvider>
				<Analytics />
			</body>
		</html>
	);
}
