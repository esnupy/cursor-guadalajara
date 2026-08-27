'use client';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { capBoard } from '@/content/caps';
import {
	CAP_BOARD_POLL_MS,
	CAP_BOARD_QUERY_KEY,
	fetchCapBoard,
	padBoardSlots,
	type CapBoardEntry,
	type CapBoardSnapshot,
} from '@/lib/caps/board';
import { cn } from '@/lib/utils';

function CapBoardQueryProvider({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

function StatusBadge({ status, size = 'default' }: { status: CapBoardEntry['status']; size?: 'default' | 'sm' }) {
	return (
		<Badge variant={status === 'delivered' ? 'default' : 'outline'} size={size}>
			{capBoard.status[status]}
		</Badge>
	);
}

function BoardHeader({
	delivered,
	capLimit,
	error,
	className,
}: {
	delivered: number;
	capLimit: number;
	error: boolean;
	className?: string;
}) {
	return (
		<header className={cn('flex shrink-0 flex-wrap items-baseline justify-between gap-x-6 gap-y-1', className)}>
			<h1 className="tracking-tight">{capBoard.title}</h1>
			<p className="text-muted-foreground">
				<span className="tabular-nums text-foreground">
					{delivered} / {capLimit}
				</span>{' '}
				{capBoard.deliveredLabel}
			</p>
			{error ? (
				<p className="basis-full text-destructive" role="status">
					{capBoard.loadError}
				</p>
			) : null}
		</header>
	);
}

function TvSlot({ slot, entry }: { slot: number; entry: CapBoardEntry | null }) {
	return (
		<Card size="sm" className="h-full min-h-22 min-w-0 justify-between py-3">
			<CardHeader className="flex flex-row items-start justify-between gap-2 px-3">
				<span
					className={cn('font-mono text-sm tabular-nums', entry ? 'text-muted-foreground' : 'text-muted-foreground/40')}
				>
					{slot}
				</span>
				{entry ? <StatusBadge status={entry.status} /> : null}
			</CardHeader>
			{entry ? (
				<CardContent className="min-w-0 px-3">
					<p className="truncate text-3xl leading-tight tracking-tight">{entry.name}</p>
					<a
						href={`https://cursor.com/@${entry.handle}`}
						target="_blank"
						rel="noopener noreferrer"
						className={cn(
							'truncate font-mono text-2xl leading-tight text-muted-foreground hover:underline',
							entry.status === 'delivered' && 'text-cursor-accent',
						)}
					>
						@{entry.handle}
					</a>
				</CardContent>
			) : null}
		</Card>
	);
}

function CapQueueBoardView({ initialData }: { initialData: CapBoardSnapshot }) {
	const boardQuery = useQuery({
		queryKey: CAP_BOARD_QUERY_KEY,
		queryFn: fetchCapBoard,
		initialData,
		refetchInterval: CAP_BOARD_POLL_MS,
		staleTime: 0,
	});

	const snapshot = boardQuery.data ?? initialData;
	const slots = padBoardSlots(snapshot.entries);
	const remaining = snapshot.capLimit - snapshot.entries.length;
	const pollFailed = boardQuery.isError;

	return (
		<>
			<section className="hidden h-dvh min-h-160 flex-col gap-4 px-[clamp(1.25rem,3vw,3rem)] py-4 lg:flex">
				<BoardHeader
					className="text-[clamp(1.15rem,1.6vw,1.75rem)]"
					delivered={snapshot.delivered}
					capLimit={snapshot.capLimit}
					error={pollFailed}
				/>
				<div className="grid min-h-0 flex-1 grid-cols-5 grid-rows-7 gap-2">
					{slots.map((cell) => (
						<TvSlot key={cell.slot} slot={cell.slot} entry={cell.entry} />
					))}
				</div>
			</section>

			<section className="px-[clamp(1.25rem,4vw,4rem)] py-12 lg:hidden">
				<BoardHeader
					className="text-2xl"
					delivered={snapshot.delivered}
					capLimit={snapshot.capLimit}
					error={pollFailed}
				/>
				<ol className="mt-8 flex flex-col">
					{snapshot.entries.map((entry) => (
						<li key={entry.slot} className="flex items-start justify-between gap-4 border-b border-border py-4">
							<div className="min-w-0">
								<p className="font-mono text-sm text-muted-foreground tabular-nums">{entry.slot}</p>
								<p className="truncate text-2xl tracking-tight">{entry.name}</p>
								<p className="truncate font-mono text-2xl text-muted-foreground">@{entry.handle}</p>
							</div>
							<StatusBadge status={entry.status} size="sm" />
						</li>
					))}
				</ol>
				<p className="mt-6 text-muted-foreground">{capBoard.remaining(remaining)}</p>
			</section>
		</>
	);
}

export function CapQueueBoard({ initialData }: { initialData: CapBoardSnapshot }) {
	return (
		<CapBoardQueryProvider>
			<CapQueueBoardView initialData={initialData} />
		</CapBoardQueryProvider>
	);
}
