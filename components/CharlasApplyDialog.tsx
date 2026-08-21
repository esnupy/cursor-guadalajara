'use client';

import { useState, useSyncExternalStore } from 'react';
import { ArrowUpRightIcon, CheckIcon, CopyIcon } from '@phosphor-icons/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { buildAgentPrompt, charlasCall } from '@/content/charlas';
import { siteConfig } from '@/content/site.config';

const subscribe = () => () => undefined;
const getClientOrigin = () => window.location.origin;
const getServerOrigin = () => siteConfig.siteUrl;

type CharlasApplyDialogProps = {
	open: boolean;
};

/**
 * Guides speakers to apply from Cursor Agent instead of a web form.
 */
export default function CharlasApplyDialog({ open }: CharlasApplyDialogProps) {
	const origin = useSyncExternalStore(subscribe, getClientOrigin, getServerOrigin);
	const [copied, setCopied] = useState(false);

	if (!open) {
		return <p className="text-cursor-accent">{charlasCall.closedLabel}</p>;
	}

	const prompt = buildAgentPrompt(origin);
	const instructionsHref = `${origin}/charlas.md`;
	const skillHref = `${origin}/charlas/SKILL.md`;

	const handleCopyPrompt = async () => {
		try {
			await navigator.clipboard.writeText(prompt);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 2000);
		} catch {
			setCopied(false);
		}
	};

	return (
		<Dialog>
			<div className="flex flex-wrap items-center gap-3">
				<DialogTrigger asChild>
					<Button type="button" aria-haspopup="dialog">
						{charlasCall.ctaLabel}
					</Button>
				</DialogTrigger>
				<Badge variant="brand">{charlasCall.agentsOnlyLabel}</Badge>
			</div>
			<DialogContent
				showCloseButton
				className="top-4 flex max-h-[calc(100dvh-2rem)] min-w-0 translate-y-0 flex-col overflow-hidden sm:top-1/2 sm:max-w-lg sm:-translate-y-1/2"
			>
				<DialogHeader className="shrink-0">
					<DialogTitle>Postúlate desde Cursor</DialogTitle>
					<DialogDescription>
						Copia el prompt, pégalo en Agent y deja que te entreviste. No envía nada hasta que tú confirmes.
					</DialogDescription>
				</DialogHeader>
				<div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain">
					<div className="relative min-w-0">
						<pre className="max-w-full rounded-card bg-muted p-3 pr-12 font-mono text-xs leading-relaxed break-words whitespace-pre-wrap [overflow-wrap:anywhere] text-foreground">
							{prompt}
						</pre>
						<Button
							type="button"
							variant="ghost"
							size="icon-sm"
							className="absolute top-2 right-2 bg-muted"
							onClick={() => {
								void handleCopyPrompt();
							}}
							aria-label={copied ? 'Prompt copiado' : 'Copiar prompt'}
						>
							{copied ? (
								<CheckIcon weight="regular" className="size-4" aria-hidden="true" />
							) : (
								<CopyIcon weight="regular" className="size-4" aria-hidden="true" />
							)}
						</Button>
					</div>
					<p className="text-sm text-muted-foreground">
						El agente debe leer las instrucciones en{' '}
						<a href={instructionsHref} target="_blank" rel="noopener noreferrer" className="link inline-flex">
							/charlas.md
							<ArrowUpRightIcon weight="regular" className="size-3.5" aria-hidden="true" />
						</a>
					</p>
					<div className="rounded-card bg-muted/50 p-3 text-sm text-muted-foreground">
						<p className="mb-1 text-foreground">Opcional: guardar como skill</p>
						<ol className="list-decimal space-y-1 pl-4">
							<li>
								Crea la carpeta <span className="font-mono text-xs break-all">{charlasCall.skillDir}</span>
							</li>
							<li>
								Guarda{' '}
								<a href={skillHref} target="_blank" rel="noopener noreferrer" className="link inline-flex">
									SKILL.md
									<ArrowUpRightIcon weight="regular" className="size-3.5" aria-hidden="true" />
								</a>{' '}
								ahí
							</li>
							<li>
								En un chat nuevo, escribe <span className="font-mono text-xs">/{charlasCall.skillName}</span>
							</li>
						</ol>
					</div>
				</div>
				<DialogFooter>
					<Button
						type="button"
						className="w-full sm:w-auto"
						onClick={() => {
							void handleCopyPrompt();
						}}
						aria-label={copied ? 'Prompt copiado' : 'Copiar prompt'}
					>
						{copied ? (
							<CheckIcon weight="regular" className="size-4" aria-hidden="true" />
						) : (
							<CopyIcon weight="regular" className="size-4" aria-hidden="true" />
						)}
						{copied ? 'Copiado' : 'Copiar prompt'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
