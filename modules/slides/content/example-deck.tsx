import CodeBlock from '@/modules/slides/components/CodeBlock';
import PromptBlock from '@/modules/slides/components/PromptBlock';
import { Slide } from '@/modules/slides/types';

export const exampleDeck: Slide[] = [
	{
		id: 1,
		title: 'Seminar slides starter',
		content: (
			<div className="space-y-6">
				<h1 className="text-4xl tracking-tight md:text-5xl">Seminar slides for the event (template)</h1>
				<p className="text-lg text-muted-foreground">
					This optional slide engine can be enabled by any ambassador community.
				</p>
			</div>
		),
	},
	{
		id: 2,
		title: 'Prompt pattern',
		content: (
			<PromptBlock prompt="Build a reusable event card component from this mockup and wire it to the events config file." />
		),
	},
	{
		id: 3,
		title: 'Code pattern',
		content: (
			<CodeBlock
				code={`export const events = [
  {
    id: 'event-1',
    title: 'Cafe Cursor YourCity',
    date: '2026-03-21',
    location: 'Your City, Your Country',
    status: 'upcoming',
  },
]`}
			/>
		),
	},
];

export const totalExampleSlides = exampleDeck.length;
