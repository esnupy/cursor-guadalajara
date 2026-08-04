'use client';

import { useState } from 'react';
import { CheckIcon, CopyIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
	code: string;
}

export default function CodeBlock({ code }: CodeBlockProps) {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2_000);
		} catch (error) {
			console.error('Failed to copy code', error);
		}
	};

	return (
		<div className="group relative">
			<Button
				variant="secondary"
				size="icon-sm"
				onClick={handleCopy}
				className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100"
				aria-label="Copy code"
			>
				{isCopied ? (
					<CheckIcon weight="regular" className="size-5 text-primary" />
				) : (
					<CopyIcon weight="regular" className="size-5" />
				)}
			</Button>
			<pre className="overflow-x-auto rounded-md border border-border bg-muted p-6">
				<code className="font-mono text-base whitespace-pre-wrap text-foreground/90 md:text-lg">{code}</code>
			</pre>
		</div>
	);
}
