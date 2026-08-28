import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import LegalDocument from '@/components/LegalDocument';
import { privacidad } from '@/content/legal';
import { siteConfig } from '@/content/site.config';

export const metadata: Metadata = {
	title: `${privacidad.title} | ${siteConfig.communityName}`,
	description: privacidad.description,
	openGraph: {
		title: privacidad.title,
		description: privacidad.description,
		locale: 'es_MX',
		type: 'website',
		url: privacidad.path,
	},
};

function buildJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: privacidad.title,
		description: privacidad.description,
		dateModified: privacidad.updatedAt,
		url: `${siteConfig.siteUrl}${privacidad.path}`,
		isPartOf: {
			'@type': 'WebSite',
			name: siteConfig.communityName,
			url: siteConfig.siteUrl,
		},
	};
}

export default function PrivacidadPage() {
	return (
		<>
			<JsonLd data={buildJsonLd()} />
			<LegalDocument document={privacidad} />
		</>
	);
}
