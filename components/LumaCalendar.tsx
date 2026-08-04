import { siteConfig } from '@/content/site.config';
import { Card, CardContent } from '@/components/ui/card';
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
		<Card className={cn('mb-16 overflow-hidden', className)}>
			<CardContent className="p-0">
				<iframe
					src={siteConfig.lumaCalendarEmbedUrl}
					width="100%"
					height={height}
					allowFullScreen
					aria-hidden="false"
					tabIndex={0}
					title={`${siteConfig.communityName} — calendario de próximos eventos`}
					className="block w-full border-0"
				/>
			</CardContent>
		</Card>
	);
}
