'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowRightIcon, ArrowUpRightIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { capBoard, capGiveaway } from '@/content/caps';
import { deliverCap, getCapQueue, skipCap } from '@/modules/admin/caps/actions';

const sourceLabel = {
	luma: 'Luma',
	astrazeneca: 'AstraZeneca',
} as const;

const statusLabel = {
	queued: 'En fila',
	delivered: 'Entregada',
	skipped: 'No llegó',
} as const;

export function CapsQueuePanel() {
	const queryClient = useQueryClient();
	const [error, setError] = useState<string | null>(null);

	const queueQuery = useQuery({
		queryKey: ['cap-queue'],
		queryFn: getCapQueue,
	});

	const invalidate = () => queryClient.invalidateQueries({ queryKey: ['cap-queue'] });

	const deliverMutation = useMutation({
		mutationFn: deliverCap,
		onSuccess: async () => {
			setError(null);
			await invalidate();
		},
		onError: (mutationError) => {
			setError(mutationError instanceof Error ? mutationError.message : 'No se pudo entregar');
		},
	});

	const skipMutation = useMutation({
		mutationFn: skipCap,
		onSuccess: async () => {
			setError(null);
			await invalidate();
		},
		onError: (mutationError) => {
			setError(mutationError instanceof Error ? mutationError.message : 'No se pudo saltar');
		},
	});

	const snapshot = queueQuery.data;
	const delivered = snapshot?.delivered ?? 0;
	const capLimit = snapshot?.capLimit ?? 35;
	const capsRemaining = delivered >= capLimit;
	const busyId = deliverMutation.isPending
		? deliverMutation.variables?.id
		: skipMutation.isPending
			? skipMutation.variables?.id
			: null;

	return (
		<div className="space-y-6">
			<div className="flex flex-col items-start gap-2">
				<h1 className="text-2xl font-medium">Gorras</h1>
				<p className="text-sm text-muted-foreground">
					Fila en orden de registro. Entrega en el lobby y salta a quien no esté.
				</p>
				<Link href={capGiveaway.boardPath} className="link text-sm">
					{capBoard.adminLinkLabel}
					<ArrowRightIcon weight="regular" className="size-3.5" aria-hidden="true" />
				</Link>
			</div>

			<p className="text-sm">
				<span className="font-medium tabular-nums">
					{delivered} / {capLimit}
				</span>{' '}
				gorras entregadas
			</p>

			{error ? <p className="text-sm text-destructive">{error}</p> : null}

			{queueQuery.isLoading ? (
				<p className="text-sm text-muted-foreground">Cargando fila…</p>
			) : snapshot?.rows.length === 0 ? (
				<p className="text-sm text-muted-foreground">Nadie se ha apuntado todavía.</p>
			) : (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-12">#</TableHead>
							<TableHead>Nombre</TableHead>
							<TableHead>Correo</TableHead>
							<TableHead>Handle</TableHead>
							<TableHead>Origen</TableHead>
							<TableHead>Estado</TableHead>
							<TableHead className="text-right">Acciones</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{snapshot?.rows.map((row) => (
							<TableRow key={row.id} className={row.status === 'skipped' ? 'opacity-50' : undefined}>
								<TableCell className="font-mono tabular-nums">{row.position}</TableCell>
								<TableCell>{row.name}</TableCell>
								<TableCell className="font-mono text-xs">{row.email}</TableCell>
								<TableCell>
									<a href={row.profileUrl} target="_blank" rel="noopener noreferrer" className="link text-sm">
										@{row.handle}
										<ArrowUpRightIcon weight="regular" className="size-3.5" aria-hidden="true" />
									</a>
								</TableCell>
								<TableCell>{sourceLabel[row.source]}</TableCell>
								<TableCell>{statusLabel[row.status]}</TableCell>
								<TableCell className="text-right">
									{row.status === 'delivered' ? null : (
										<div className="flex justify-end gap-2">
											<Button
												type="button"
												size="sm"
												disabled={capsRemaining || busyId === row.id}
												onClick={() => deliverMutation.mutate({ id: row.id })}
											>
												Entregar gorra
											</Button>
											{row.status === 'queued' ? (
												<Button
													type="button"
													size="sm"
													variant="outline"
													disabled={busyId === row.id}
													onClick={() => skipMutation.mutate({ id: row.id })}
												>
													No llegó
												</Button>
											) : null}
										</div>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</div>
	);
}
