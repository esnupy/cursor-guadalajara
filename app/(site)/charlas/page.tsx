import { notFound } from 'next/navigation';

/**
 * Speaker call is closed. Keep the route so bookmarks 404 instead of showing the CFP.
 */
export default function CharlasPage() {
	notFound();
}
