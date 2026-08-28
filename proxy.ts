import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
	const nonce = crypto.randomUUID();
	const isDev = process.env.NODE_ENV === 'development';
	const neonAuthOrigin = process.env.NEON_AUTH_BASE_URL ? new URL(process.env.NEON_AUTH_BASE_URL).origin : '';

	const csp = [
		`default-src 'self'`,
		`script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
		`style-src 'self' 'unsafe-inline'`,
		`img-src 'self' https://images.unsplash.com https://images.lumacdn.com https://*.public.blob.vercel-storage.com https://luma.com https://lu.ma data: blob:`,
		`font-src 'self'`,
		`media-src 'self'`,
		`connect-src 'self' https://luma.com https://lu.ma${neonAuthOrigin ? ` ${neonAuthOrigin}` : ''}`,
		`frame-src https://luma.com https://lu.ma https://www.google.com https://maps.google.com https://www.google.com.mx`,
		`frame-ancestors 'none'`,
		`object-src 'none'`,
		`base-uri 'self'`,
		`form-action 'self'`,
		`upgrade-insecure-requests`,
	].join('; ');

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('x-nonce', nonce);
	requestHeaders.set('Content-Security-Policy', csp);

	const response = NextResponse.next({
		request: { headers: requestHeaders },
	});
	response.headers.set('Content-Security-Policy', csp);

	return response;
}

export const config = {
	matcher: [
		{
			source: '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm)$).*)',
			missing: [
				{ type: 'header', key: 'next-router-prefetch' },
				{ type: 'header', key: 'purpose', value: 'prefetch' },
			],
		},
	],
};
