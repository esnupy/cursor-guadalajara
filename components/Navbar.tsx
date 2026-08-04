'use client';

import { useState, useEffect, useCallback } from 'react';
import { ListIcon, XIcon } from '@phosphor-icons/react';
import ThemeToggle from '@/components/ThemeToggle';
import CursorLockupSwap from '@/components/icons/CursorLockupSwap';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/content/site.config';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
	{ href: '#upcoming', label: 'Próximos eventos' },
	{ href: '#recaps', label: 'Eventos pasados' },
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
				<div className="flex h-14 items-center justify-between px-[clamp(1.25rem,4vw,4rem)]">
					<a href="#" className="flex items-center gap-1.5">
						<CursorLockupSwap size={28} className="h-6 w-auto shrink-0 md:h-7" aria-hidden />
						<span className="text-lg tracking-tight text-foreground md:text-xl">Community</span>
						{siteConfig.communityNameLocal ? (
							<span className="text-lg tracking-tight text-muted-foreground md:text-xl">
								{siteConfig.communityNameLocal}
							</span>
						) : null}
					</a>

					<div className="hidden items-center gap-4 sm:flex">
						{NAV_LINKS.map(({ href, label }) => {
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
									{label}
								</a>
							);
						})}
						<Button asChild size="sm">
							<a href={siteConfig.lumaUrl} target="_blank" rel="noopener noreferrer">
								Únete
							</a>
						</Button>
						<ThemeToggle />
					</div>

					<div className="flex items-center gap-1 sm:hidden">
						<ThemeToggle />
						<Button
							variant="ghost"
							size="icon-sm"
							onClick={() => setMobileOpen(!mobileOpen)}
							aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
						>
							{mobileOpen ? (
								<XIcon weight="regular" className="size-5" />
							) : (
								<ListIcon weight="regular" className="size-5" />
							)}
						</Button>
					</div>
				</div>
			</nav>

			{mobileOpen && (
				<div className="fixed inset-0 top-14 z-30 bg-background/95 backdrop-blur-md sm:hidden">
					<div className="flex flex-col items-start gap-6 px-[clamp(1.25rem,4vw,4rem)] pt-12">
						{NAV_LINKS.map(({ href, label }) => (
							<a
								key={href}
								href={href}
								onClick={closeMobile}
								className="text-lg text-muted-foreground transition-colors hover:text-foreground"
							>
								{label}
							</a>
						))}
						<Button asChild>
							<a href={siteConfig.lumaUrl} target="_blank" rel="noopener noreferrer" onClick={closeMobile}>
								Únete
							</a>
						</Button>
					</div>
				</div>
			)}
		</>
	);
}
