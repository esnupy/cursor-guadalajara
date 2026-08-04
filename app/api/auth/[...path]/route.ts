import type { NextRequest } from 'next/server';

import { getAuth } from '@/lib/auth/server';

type RouteContext = { params: Promise<{ path: string[] }> };

function getHandlers() {
	return getAuth().handler();
}

export async function GET(request: NextRequest, context: RouteContext) {
	const { GET: handler } = getHandlers();
	return handler(request, context);
}

export async function POST(request: NextRequest, context: RouteContext) {
	const { POST: handler } = getHandlers();
	return handler(request, context);
}
