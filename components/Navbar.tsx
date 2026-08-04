'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import LanguageToggle from '@/components/LanguageToggle';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/content/site.config';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
	{ href: '#upcoming', key: 'home.upcomingEvents' },
	{ href: '#recaps', key: 'home.pastEvents' },
] as const;

function useScrollState() {
	const [scrolled, setScrolled] = useState(false);
	const [activeSection, setActiveSection] = useState<string | null>(null);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);

			const sections = ['upcoming', 'recaps'];
			let current: string | null = null;
			for (const id of sections) {
				const el = document.getElementById(id);
				if (el) {
					const rect = el.getBoundingClientRect();
					if (rect.top <= 120 && rect.bottom > 120) {
						current = id;
					}
				}
			}
			setActiveSection(current);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return { scrolled, activeSection };
}

export default function Navbar() {
	const { t } = useI18n();
	const { scrolled, activeSection } = useScrollState();
	const [mobileOpen, setMobileOpen] = useState(false);

	const closeMobile = useCallback(() => setMobileOpen(false), []);

	useEffect(() => {
		const onResize = () => {
			if (window.innerWidth >= 640) setMobileOpen(false);
		};
		window.addEventListener('resize', onResize, { passive: true });
		return () => window.removeEventListener('resize', onResize);
	}, []);

	useEffect(() => {
		document.body.style.overflow = mobileOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [mobileOpen]);

	return (
		<>
			<nav
				className={cn(
					'sticky top-0 z-40 border-b backdrop-blur-md transition-all duration-300',
					scrolled ? 'border-border bg-background/90 shadow-sm' : 'border-transparent bg-background/80',
				)}
			>
				<div className="flex h-14 items-center justify-between px-6 md:px-12 lg:px-16">
					<a href="#" className="flex items-center gap-3">
						<Image src="/cursor-logo.svg" alt="Cursor" width={120} height={32} priority className="h-6 w-auto md:h-8" />
						<span className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
							{siteConfig.communityName}
							{siteConfig.communityNameLocal ? (
								<span className="ml-2 text-xl font-bold tracking-wide text-muted-foreground md:text-2xl">
									{siteConfig.communityNameLocal}
								</span>
							) : null}
						</span>
					</a>

					<div className="hidden items-center gap-4 sm:flex">
						{NAV_LINKS.map(({ href, key }) => {
							const sectionId = href.replace('#', '');
							const isActive = activeSection === sectionId;
							return (
								<a
									key={href}
									href={href}
									className={cn(
										'text-sm transition-colors',
										isActive ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground',
									)}
								>
									{t(key)}
								</a>
							);
						})}
						<Button asChild size="sm">
							<a href={siteConfig.lumaUrl} target="_blank" rel="noopener noreferrer">
								{t('nav.joinUs')}
							</a>
						</Button>
						<div className="flex items-center gap-1">
							<ThemeToggle />
							<LanguageToggle />
						</div>
					</div>

					<div className="flex items-center gap-1 sm:hidden">
						<ThemeToggle />
						<LanguageToggle />
						<Button variant="ghost" size="icon-sm" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
							{mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
						</Button>
					</div>
				</div>
			</nav>

			{mobileOpen && (
				<div className="fixed inset-0 top-14 z-30 bg-background/95 backdrop-blur-md sm:hidden">
					<div className="flex flex-col items-center gap-6 pt-12">
						{NAV_LINKS.map(({ href, key }) => (
							<a
								key={href}
								href={href}
								onClick={closeMobile}
								className="text-lg text-muted-foreground transition-colors hover:text-foreground"
							>
								{t(key)}
							</a>
						))}
						<Button asChild>
							<a
								href={siteConfig.lumaUrl}
								target="_blank"
								rel="noopener noreferrer"
								onClick={closeMobile}
							>
								{t('nav.joinUs')}
							</a>
						</Button>
					</div>
				</div>
			)}
		</>
	);
}
