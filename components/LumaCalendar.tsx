import { siteConfig } from '@/content/site.config';
import { cn } from '@/lib/utils';

type LumaCalendarProps = {
	className?: string;
	height?: number;
};

export default function LumaCalendar({ className, height = 450 }: LumaCalendarProps) {
	if (!siteConfig.lumaCalendarEmbedUrl) {
		return null;
	}

	return (
		<iframe
			src={siteConfig.lumaCalendarEmbedUrl}
			width="100%"
			height={height}
			allowFullScreen
			aria-hidden="false"
			tabIndex={0}
			title={`${siteConfig.communityName} — upcoming events calendar`}
			className={cn('block rounded-md border border-border', className)}
		/>
	);
}
