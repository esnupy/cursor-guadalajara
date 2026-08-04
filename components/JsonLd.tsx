import React from 'react';

interface JsonLdProps {
	data: Record<string, unknown> | Record<string, unknown>[];
}

function serializeJsonLd(data: Record<string, unknown> | Record<string, unknown>[]): string {
	return JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
}

const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
	return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
};

export default JsonLd;
