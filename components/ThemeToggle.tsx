'use client';

import { DesktopIcon, MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const THEMES = [
	{ value: 'system', label: 'Preferencia del sistema', icon: DesktopIcon },
	{ value: 'light', label: 'Tema claro', icon: SunIcon },
	{ value: 'dark', label: 'Tema oscuro', icon: MoonIcon },
] as const;

function subscribe() {
	return () => {};
}

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const mounted = useSyncExternalStore(
		subscribe,
		() => true,
		() => false,
	);

	if (!mounted) {
		return <div className="h-9 w-31 rounded-full bg-muted" aria-hidden />;
	}

	const activeTheme = theme ?? 'system';

	return (
		<ToggleGroup
			type="single"
			value={activeTheme}
			onValueChange={(value) => value && setTheme(value)}
			spacing={0}
			size="sm"
			aria-label="Tema"
		>
			{THEMES.map(({ value, label, icon: Icon }) => (
				<ToggleGroupItem key={value} value={value} aria-label={label}>
					<Icon weight="regular" className="size-4" />
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
