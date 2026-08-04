import Footer from '@/components/Footer';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{children}
			<div className="mx-auto max-w-5xl">
				<Footer />
			</div>
		</>
	);
}
