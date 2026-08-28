'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRightIcon, ListIcon, XIcon } from '@phosphor-icons/react';
import CursorLockupSwap from '@/components/icons/CursorLockupSwap';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/content/site.config';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
	{ href: '/#upcoming', label: 'Próximos eventos', sectionId: 'upcoming' },
	{ href: '/#recaps', label: 'Eventos pasados', sectionId: 'recaps' },
] as const;

/**
 * Tracks header elevation and the in-view home section for nav highlighting.
 */
const useScrollState = () => {
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
};

/**
 * Site navigation.
 */
export default function Navbar() {
	const { scrolled, activeSection } = useScrollState();
	const pathname = usePathname();
	const [mobileOpen, setMobileOpen] = useState(false);

	const closeMobile = useCallback(() => setMobileOpen(false), []);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 640) setMobileOpen(false);
		};
		window.addEventListener('resize', handleResize, { passive: true });
		return () => window.removeEventListener('resize', handleResize);
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
					'z-40 border-b backdrop-blur-md transition-all duration-300',
					'sticky top-0',
					scrolled ? 'border-border bg-background/90 shadow-sm' : 'border-transparent bg-background/80',
				)}
			>
				<div className="mx-auto flex h-14 w-full max-w-325 items-center justify-between px-[clamp(1.25rem,4vw,4rem)]">
					<Link href="/" className="flex items-center gap-1.5" aria-label={`${siteConfig.communityName} — inicio`}>
						<CursorLockupSwap size={28} className="h-6 w-auto shrink-0 md:h-7" aria-hidden />
						<span className="text-lg tracking-tight text-foreground md:text-xl">Community</span>
						{siteConfig.communityNameLocal ? (
							<span className="text-lg tracking-tight text-muted-foreground md:text-xl">
								{siteConfig.communityNameLocal}
							</span>
						) : null}
					</Link>

					<div className="hidden items-center gap-4 sm:flex">
						{NAV_LINKS.map((link) => {
							const isActive = pathname === '/' && activeSection === link.sectionId;
							return (
								<Link
									key={link.href}
									href={link.href}
									className={cn(
										'text-sm transition-colors',
										isActive ? 'font-medium text-foreground' : 'text-foreground hover:text-muted-foreground',
									)}
								>
									{link.label}
								</Link>
							);
						})}
						<Button asChild size="sm">
							<a href={siteConfig.lumaUrl} target="_blank" rel="noopener noreferrer">
								Únete <ArrowUpRightIcon size={20} />
							</a>
						</Button>
					</div>

					<div className="flex items-center sm:hidden">
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
					<div className="mx-auto flex w-full max-w-325 flex-col items-start gap-6 px-[clamp(1.25rem,4vw,4rem)] pt-12">
						{NAV_LINKS.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								onClick={closeMobile}
								className="text-lg text-muted-foreground transition-colors hover:text-foreground"
							>
								{link.label}
							</Link>
						))}
						<Button asChild>
							<a href={siteConfig.lumaUrl} target="_blank" rel="noopener noreferrer" onClick={closeMobile}>
								Únete <ArrowUpRightIcon size={28} />
							</a>
						</Button>
					</div>
				</div>
			)}
		</>
	);
}
