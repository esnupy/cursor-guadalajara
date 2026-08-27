/**
 * Parses RFC4180-ish CSV (quoted fields, doubled quotes, BOM).
 */
export const parseCsv = (content: string): Record<string, string>[] => {
	const text = content.replace(/^\uFEFF/, '');
	const rows: string[][] = [];
	let row: string[] = [];
	let field = '';
	let inQuotes = false;

	for (let index = 0; index < text.length; index += 1) {
		const char = text[index];
		if (inQuotes) {
			if (char === '"') {
				if (text[index + 1] === '"') {
					field += '"';
					index += 1;
				} else {
					inQuotes = false;
				}
			} else {
				field += char;
			}
			continue;
		}

		if (char === '"') {
			inQuotes = true;
			continue;
		}
		if (char === ',') {
			row.push(field);
			field = '';
			continue;
		}
		if (char === '\n') {
			row.push(field);
			rows.push(row);
			row = [];
			field = '';
			continue;
		}
		if (char === '\r') {
			continue;
		}
		field += char;
	}

	if (field.length > 0 || row.length > 0) {
		row.push(field);
		rows.push(row);
	}

	const nonEmpty = rows.filter((entry) => entry.some((cell) => cell.trim().length > 0));
	const header = nonEmpty[0];
	if (!header) {
		return [];
	}

	return nonEmpty.slice(1).map((cells) => {
		const record: Record<string, string> = {};
		header.forEach((key, keyIndex) => {
			record[key.trim()] = (cells[keyIndex] ?? '').trim();
		});
		return record;
	});
};
