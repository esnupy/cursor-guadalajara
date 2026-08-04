import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Analytics } from '@vercel/analytics/react';
import { ThemeFavicon } from '@/components/ThemeFavicon';
import { ThemeProvider } from '@/components/theme-provider';
import { siteConfig } from '@/content/site.config';
import { cursorGothic, cursorMono } from '@/lib/fonts';
import { cn } from '@/lib/utils';
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
		card: 'summary_large_image',
		title: siteConfig.siteTitle,
		description: siteConfig.siteDescription,
	},
	icons: {
		icon: [
			{
				url: '/favicons/favicon-light.svg',
				type: 'image/svg+xml',
				media: '(prefers-color-scheme: light)',
			},
			{
				url: '/favicons/favicon.svg',
				type: 'image/svg+xml',
				media: '(prefers-color-scheme: dark)',
			},
			{
				url: '/favicons/favicon-light.ico',
				sizes: 'any',
				media: '(prefers-color-scheme: light)',
			},
			{
				url: '/favicons/favicon.ico',
				sizes: 'any',
				media: '(prefers-color-scheme: dark)',
			},
		],
		apple: '/favicons/apple-touch-icon.png',
	},
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	// Force dynamic rendering so Next.js can apply the CSP nonce from proxy.ts
	// to scripts. Without this, pages are prerendered with nonce=undefined and
	// strict-dynamic CSP blocks all client JS (Framer Motion stays at opacity: 0).
	await headers();

	return (
		<html lang="es-MX" className={cn('font-sans', cursorGothic.variable, cursorMono.variable)} suppressHydrationWarning>
			<body className="antialiased">
				{/* External self-hosted script: allowed by script-src 'self' without a CSP nonce. */}
				<script async src="/theme-favicon.bootstrap.js" />
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<ThemeFavicon />
					{children}
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
