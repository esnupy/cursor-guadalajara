import * as React from 'react';
import { IconProps } from '@/types';
import { cn } from '@/lib/utils';

const CursorLogo = ({ size, className, ...props }: IconProps) => (
	<svg
		height={size}
		viewBox="0 0 498 545"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		className={cn('text-foreground', className)}
		{...props}
	>
		<path d="m466.173 136.7-206.466-119.202c-6.63-3.828-14.81-3.828-21.44 0l-206.4561 119.202c-5.574 3.218-9.014 9.17-9.014 15.616v240.37c0 6.446 3.44 12.398 9.014 15.616l206.4661 119.202c6.63 3.828 14.81 3.828 21.44 0l206.466-119.202c5.574-3.218 9.014-9.17 9.014-15.616v-240.372c0-6.446-3.44-12.398-9.014-15.616h-.01zm-12.968 25.25-199.312 345.218c-1.348 2.326-4.904 1.376-4.904-1.318v-226.044c0-4.516-2.414-8.694-6.33-10.962l-195.7561-113.02c-2.326-1.348-1.376-4.904 1.318-4.904h398.6241c5.66 0 9.198 6.136 6.368 11.04h-.01v-.01z" />
	</svg>
);

export default CursorLogo;
