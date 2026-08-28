import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import LegalDocument from '@/components/LegalDocument';
import { terminos } from '@/content/legal';
import { siteConfig } from '@/content/site.config';

export const metadata: Metadata = {
	title: `${terminos.title} | ${siteConfig.communityName}`,
	description: terminos.description,
	openGraph: {
		title: terminos.title,
		description: terminos.description,
		locale: 'es_MX',
		type: 'website',
		url: terminos.path,
	},
};

function buildJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: terminos.title,
		description: terminos.description,
		dateModified: terminos.updatedAt,
		url: `${siteConfig.siteUrl}${terminos.path}`,
		isPartOf: {
			'@type': 'WebSite',
			name: siteConfig.communityName,
			url: siteConfig.siteUrl,
		},
	};
}

export default function TerminosPage() {
	return (
		<>
			<JsonLd data={buildJsonLd()} />
			<LegalDocument document={terminos} />
		</>
	);
}
