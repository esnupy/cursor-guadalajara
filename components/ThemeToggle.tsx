'use client';

import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();

	return (
		<Button
			variant="ghost"
			size="icon-sm"
			className="relative"
			onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
			aria-label="Cambiar tema"
		>
			<SunIcon
				weight="regular"
				className="size-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0"
			/>
			<MoonIcon
				weight="regular"
				className="absolute size-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100"
			/>
		</Button>
	);
}
