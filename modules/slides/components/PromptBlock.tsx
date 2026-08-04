'use client';

import { useState } from 'react';
import { CheckIcon, CopyIcon, PencilSimpleIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

interface PromptBlockProps {
	prompt: string;
	label?: string;
}

export default function PromptBlock({ prompt, label = 'Try this in Cursor' }: PromptBlockProps) {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(prompt);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2_000);
		} catch (error) {
			console.error('Failed to copy prompt', error);
		}
	};

	return (
		<div className="space-y-3">
			<div className="flex items-center gap-2 text-sm font-medium text-primary">
				<PencilSimpleIcon weight="regular" className="size-4" />
				<span>{label}</span>
			</div>
			<div className="group relative">
				<Button
					variant="secondary"
					size="icon-sm"
					onClick={handleCopy}
					className="absolute top-4 right-4 z-10 opacity-0 transition-opacity group-hover:opacity-100"
					aria-label="Copiar prompt"
				>
					{isCopied ? (
						<CheckIcon weight="regular" className="size-5 text-primary" />
					) : (
						<CopyIcon weight="regular" className="size-5" />
					)}
				</Button>
				<pre className="overflow-x-auto rounded-md border border-border bg-accent/50 p-6">
					<code className="font-mono text-base whitespace-pre-wrap text-foreground/90 md:text-lg">{prompt}</code>
				</pre>
			</div>
		</div>
	);
}
