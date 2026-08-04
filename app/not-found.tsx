import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/content/site.config';
import { Button } from '@/components/ui/button';

export default function NotFound() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-foreground">
			<Image src="/cursor-logo.svg" alt="Cursor" width={120} height={32} className="mb-12 h-8 w-auto opacity-40" />
			<h1 className="mb-4 text-6xl font-bold tracking-tight text-muted-foreground/50 md:text-8xl">404</h1>
			<p className="mb-8 text-lg text-muted-foreground">Esta página no existe.</p>
			<Button asChild>
				<Link href="/">Volver a {siteConfig.communityName}</Link>
			</Button>
		</main>
	);
}
