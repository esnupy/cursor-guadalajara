import localFont from 'next/font/local';

export const cursorGothic = localFont({
	src: [
		{
			path: '../app/fonts/cursor-gothic/CursorGothic-Regular.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../app/fonts/cursor-gothic/CursorGothic-Italic.woff2',
			weight: '400',
			style: 'italic',
		},
		{
			path: '../app/fonts/cursor-gothic/CursorGothic-Bold.woff2',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../app/fonts/cursor-gothic/CursorGothic-BoldItalic.woff2',
			weight: '700',
			style: 'italic',
		},
	],
	variable: '--font-cursor-gothic',
	display: 'swap',
});

export const cursorMono = localFont({
	src: [
		{
			path: '../app/fonts/cursor-mono/CursorMono260406-Regular.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../app/fonts/cursor-mono/CursorMono260406-Medium.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../app/fonts/cursor-mono/CursorMono260406-Bold.woff2',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-cursor-mono',
	display: 'swap',
});
