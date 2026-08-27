'use client';

import { type FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRightIcon, ArrowUpRightIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { capGiveaway } from '@/content/caps';
import { isAstrazenecaEmail, normalizeCapEmail } from '@/lib/caps/email';

type JoinSuccess = {
	alreadyJoined: boolean;
};

function BoardLink({ className }: { className?: string }) {
	return (
		<Link href={capGiveaway.boardPath} className={className}>
			{capGiveaway.boardLinkLabel}
			<ArrowRightIcon weight="regular" className="size-4" aria-hidden="true" />
		</Link>
	);
}

type ApiResponse =
	{ ok: true; position: number; capLimit: number; alreadyJoined: boolean } | { ok: false; error: string };

export default function CapGiveaway() {
	const [email, setEmail] = useState('');
	const [handle, setHandle] = useState('');
	const [name, setName] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<JoinSuccess | null>(null);

	const showName = useMemo(() => isAstrazenecaEmail(normalizeCapEmail(email)), [email]);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		setSubmitting(true);

		try {
			const response = await fetch('/api/caps', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email,
					handle,
					name: showName ? name : '',
				}),
			});
			const payload = (await response.json()) as ApiResponse;
			if (!payload.ok) {
				setError(payload.error);
				return;
			}
			setSuccess({ alreadyJoined: payload.alreadyJoined });
		} catch {
			setError('No se pudo enviar. Intenta de nuevo.');
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Card>
			<CardContent className="pt-6 text-xl">
				<p className="max-w-3xl leading-relaxed text-muted-foreground">{capGiveaway.pitch}</p>
				<p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{capGiveaway.azNote}</p>
				<div className="mt-6 flex flex-col items-start gap-3">
					<a href={capGiveaway.profileUrl} target="_blank" rel="noopener noreferrer" className="link">
						{capGiveaway.profileLabel}
						<ArrowUpRightIcon weight="regular" className="size-4" aria-hidden="true" />
					</a>
					<BoardLink className="link" />
				</div>

				{success ? (
					<>
						<p className="mt-8 max-w-3xl leading-relaxed" role="status">
							{success.alreadyJoined ? capGiveaway.alreadyJoined : capGiveaway.success}
						</p>
						<BoardLink className="link mt-6" />
					</>
				) : (
					<form className="mt-8 flex max-w-md flex-col gap-5" onSubmit={(event) => void handleSubmit(event)}>
						<div className="flex flex-col gap-2">
							<Label htmlFor="cap-email" className="text-base font-normal">
								{capGiveaway.emailLabel}
							</Label>
							<Input
								id="cap-email"
								type="email"
								autoComplete="email"
								required
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								className="h-11 text-base md:text-base"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="cap-handle" className="text-base font-normal">
								{capGiveaway.handleLabel}
							</Label>
							<Input
								id="cap-handle"
								type="text"
								autoCapitalize="none"
								autoCorrect="off"
								spellCheck={false}
								required
								placeholder={capGiveaway.handlePlaceholder}
								value={handle}
								onChange={(event) => setHandle(event.target.value)}
								className="h-11 font-mono text-base md:text-base"
							/>
						</div>
						{showName ? (
							<div className="flex flex-col gap-2">
								<Label htmlFor="cap-name" className="text-base font-normal">
									{capGiveaway.nameLabel}
								</Label>
								<p className="text-base text-muted-foreground">{capGiveaway.nameHint}</p>
								<Input
									id="cap-name"
									type="text"
									autoComplete="name"
									required
									value={name}
									onChange={(event) => setName(event.target.value)}
									className="h-11 text-base md:text-base"
								/>
							</div>
						) : null}
						{error ? (
							<p className="text-base text-destructive" role="alert">
								{error}
							</p>
						) : null}
						<Button type="submit" size="lg" disabled={submitting} className="self-start">
							{submitting ? capGiveaway.submittingLabel : capGiveaway.submitLabel}
						</Button>
					</form>
				)}
			</CardContent>
		</Card>
	);
}
