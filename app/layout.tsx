import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Analytics } from '@vercel/analytics/react';
import { Geist } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { I18nProvider } from '@/lib/i18n';
import { siteConfig } from '@/content/site.config';
import { cn } from '@/lib/utils';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

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
		<html lang={siteConfig.defaultLocale} className={cn('font-sans', geist.variable)} suppressHydrationWarning>
			<body className="antialiased">
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<I18nProvider>{children}</I18nProvider>
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
