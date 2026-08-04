import React from 'react';
import { siteConfig } from '@/content/site.config';

type LumaCalendarProps = {
	className?: string;
	height?: number;
};

const LumaCalendar: React.FC<LumaCalendarProps> = ({ className, height = 450 }) => {
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
			className={className}
			style={{
				border: '1px solid #bfcbda88',
				borderRadius: '4px',
				display: 'block',
			}}
		/>
	);
};

export default LumaCalendar;
