import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr';
import Navbar from '@/components/Navbar';

type TalkPageShellProps = {
	children: ReactNode;
	backHref: string;
	backLabel: string;
};

export default function TalkPageShell({ children, backHref, backLabel }: TalkPageShellProps) {
	return (
		<main className="min-h-screen bg-background text-foreground">
			<Navbar />
			<div className="flex min-h-[calc(100dvh-3.5rem)] items-center justify-center px-[clamp(1.25rem,4vw,4rem)] py-8">
				<div className="flex w-full max-w-480 flex-col">
					<Link href={backHref} className="link mb-6 self-start" aria-label={backLabel}>
						<ArrowLeftIcon weight="regular" className="size-4" aria-hidden="true" />
						{backLabel}
					</Link>
					{children}
				</div>
			</div>
		</main>
	);
}
