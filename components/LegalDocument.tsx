import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';
import Navbar from '@/components/Navbar';
import type { LegalDocument as LegalDocumentData, LegalInline } from '@/lib/types';

function LegalLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
	if (external) {
		return (
			<a href={href} target="_blank" rel="noopener noreferrer" className="link-inline">
				{label}
				<ArrowUpRightIcon weight="regular" className="size-4" aria-hidden="true" />
			</a>
		);
	}

	return (
		<Link href={href} className="link-inline">
			{label}
			<ArrowRightIcon weight="regular" className="size-4" aria-hidden="true" />
		</Link>
	);
}

function renderInline(node: LegalInline, key: number) {
	if (node.type === 'text') {
		return <span key={key}>{node.text}</span>;
	}

	return <LegalLink key={key} href={node.href} label={node.label} external={node.external} />;
}

export default function LegalDocument({ document }: { document: LegalDocumentData }) {
	return (
		<main className="min-h-screen bg-background text-foreground">
			<Navbar />
			<div className="mx-auto max-w-5xl px-[clamp(1.25rem,4vw,4rem)] py-12">
				<article>
					<Link href="/" aria-label="Volver al inicio" className="link mb-8">
						<ArrowLeftIcon weight="regular" className="size-4" aria-hidden="true" />
						Volver al inicio
					</Link>

					<header className="mb-12">
						<h1 className="mb-1 text-2xl tracking-tight">{document.title}</h1>
						<p className="text-muted-foreground">Actualizado el {document.updatedLabel}</p>
					</header>

					<div className="max-w-3xl space-y-10">
						{document.sections.map((section) => (
							<section key={section.title}>
								<h2 className="mb-3 text-foreground">{section.title}</h2>
								<div className="space-y-4 leading-relaxed text-muted-foreground">
									{section.blocks.map((block, blockIndex) => (
										<p key={blockIndex}>{block.map(renderInline)}</p>
									))}
								</div>
							</section>
						))}
					</div>
				</article>
			</div>
		</main>
	);
}
