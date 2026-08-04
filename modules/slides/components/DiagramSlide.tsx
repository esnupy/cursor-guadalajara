'use client';

import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

interface DiagramSlideProps {
	src: string;
	alt: string;
	caption?: string;
}

function isTrustedSvgSrc(src: string): boolean {
	try {
		const url = new URL(src, window.location.origin);
		return url.origin === window.location.origin;
	} catch {
		return false;
	}
}

export default function DiagramSlide({ src, alt, caption }: DiagramSlideProps) {
	const validationError =
		typeof window !== 'undefined' && !isTrustedSvgSrc(src) ? 'Diagram source must be same-origin' : null;
	const [fetchKey, setFetchKey] = useState(src);
	const [svgContent, setSvgContent] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(!validationError);
	const [error, setError] = useState<string | null>(validationError);

	if (src !== fetchKey) {
		setFetchKey(src);
		setSvgContent(null);
		setIsLoading(!validationError);
		setError(validationError);
	}

	useEffect(() => {
		if (validationError) {
			return;
		}

		let isCancelled = false;

		fetch(src)
			.then((res) => {
				if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
				return res.text();
			})
			.then((text) => {
				if (isCancelled) return;
				setSvgContent(text);
				setIsLoading(false);
			})
			.catch((err) => {
				if (isCancelled) return;
				setError(err.message);
				setIsLoading(false);
			});

		return () => {
			isCancelled = true;
		};
	}, [src, validationError]);

	if (isLoading) {
		return <div className="animate-pulse py-12 text-center text-muted-foreground">Loading diagram...</div>;
	}

	if (error) {
		return (
			<div className="rounded border border-destructive/30 bg-destructive/10 p-4 text-center text-destructive">
				<p>Error loading diagram</p>
				<p className="mt-2 text-sm">{error}</p>
			</div>
		);
	}

	if (!svgContent) {
		return <div className="py-12 text-center text-muted-foreground">{alt}</div>;
	}

	const modifiedSvg = svgContent.replace(
		/<svg([^>]*)>/,
		'<svg$1 width="100%" height="auto" style="max-width:100%;display:block;">',
	);

	const sanitizedSvg = DOMPurify.sanitize(modifiedSvg, {
		USE_PROFILES: { svg: true, svgFilters: true },
	});

	return (
		<div className="flex flex-col items-center justify-center space-y-6">
			<div className="w-full max-w-4xl">
				<div
					className="w-full overflow-hidden rounded-md border border-border"
					style={{ minHeight: '300px' }}
					dangerouslySetInnerHTML={{ __html: sanitizedSvg }}
				/>
			</div>
			{caption ? <p className="max-w-3xl text-center text-lg text-muted-foreground">{caption}</p> : null}
		</div>
	);
}
