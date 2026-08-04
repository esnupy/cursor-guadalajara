'use client';

import { useEffect, useLayoutEffect } from 'react';
import { useTheme } from 'next-themes';
import { FAVICON_PATHS } from '@/lib/theme-favicon';

function resolveThemePreference(): 'light' | 'dark' {
	try {
		const stored = localStorage.getItem('theme');
		if (!stored || stored === 'system') {
			return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}
		return stored === 'dark' ? 'dark' : 'light';
	} catch {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
}

function hrefForLink(link: HTMLLinkElement, theme: 'light' | 'dark'): string {
	const icons = FAVICON_PATHS[theme];
	const type = link.getAttribute('type');
	const sizes = link.getAttribute('sizes');
	const href = link.getAttribute('href') ?? '';

	if (type === 'image/svg+xml' || href.endsWith('.svg')) {
		return icons.svg;
	}
	if (sizes === 'any' || href.endsWith('.ico')) {
		return icons.ico;
	}
	return icons.png;
}

function applyFaviconTheme(theme: 'light' | 'dark') {
	document.querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="shortcut icon"]').forEach((link) => {
		link.href = hrefForLink(link, theme);
		link.removeAttribute('media');
	});
}

export function ThemeFavicon() {
	const { resolvedTheme } = useTheme();

	useLayoutEffect(() => {
		applyFaviconTheme(resolveThemePreference());
	}, []);

	useEffect(() => {
		if (resolvedTheme !== 'light' && resolvedTheme !== 'dark') {
			return;
		}
		applyFaviconTheme(resolvedTheme);
	}, [resolvedTheme]);

	useEffect(() => {
		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const onChange = () => {
			if (localStorage.getItem('theme') === 'system' || !localStorage.getItem('theme')) {
				applyFaviconTheme(media.matches ? 'dark' : 'light');
			}
		};
		media.addEventListener('change', onChange);
		return () => media.removeEventListener('change', onChange);
	}, []);

	return null;
}
