'use client';

import { siteConfig } from '@/content/site.config';
import { useI18n } from '@/lib/i18n';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function LanguageToggle() {
	const { locale, setLocale } = useI18n();

	if (siteConfig.locales.length <= 1) {
		return null;
	}

	return (
		<ToggleGroup
			type="single"
			value={locale}
			onValueChange={(value) => {
				if (value) setLocale(value);
			}}
			variant="outline"
			size="sm"
		>
			{siteConfig.locales.map((localeCode) => (
				<ToggleGroupItem key={localeCode} value={localeCode} aria-label={localeCode}>
					{localeCode.toUpperCase()}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
