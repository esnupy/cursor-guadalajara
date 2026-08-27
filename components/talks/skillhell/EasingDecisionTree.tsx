'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CheckIcon, CopyIcon, HandPointingIcon, MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import CursorLockupSwap from '@/components/icons/CursorLockupSwap';
import EasingCurve from '@/components/talks/skillhell/EasingCurve';
import { Button } from '@/components/ui/button';
import { easingTree } from '@/content/talks/skillhell';
import { cn } from '@/lib/utils';

const display = 'leading-[1.12] tracking-tight text-balance';
const bodyFrame = 'p-[clamp(1.25rem,4vw,3.5rem)] flex h-full min-h-0 flex-1 flex-col items-start justify-start';

const TREE_LINES = easingTree.split('\n');

const EASE_OUT = [0.17, 0.84, 0.44, 1] as const;
const EASE_IN_OUT = [0.77, 0, 0.18, 1] as const;

const START_DELAY_MS = 500;
const LOOP_GAP_MS = 1400;
const FADE_S = 0.35;

type ExampleId = 0 | 1 | 2 | 3 | 4;

type Phase = {
	highlight: readonly number[];
	example: ExampleId | null;
	ms: number;
};

const PHASES: readonly Phase[] = [
	{ highlight: [0], example: null, ms: 700 },
	{ highlight: [0, 1], example: 0, ms: 2400 },
	{ highlight: [2, 3], example: 0, ms: 800 },
	{ highlight: [3, 4], example: 1, ms: 2400 },
	{ highlight: [5], example: 1, ms: 700 },
	{ highlight: [5, 6], example: 2, ms: 2600 },
	{ highlight: [7], example: 2, ms: 700 },
	{ highlight: [7, 8], example: 3, ms: 2400 },
	{ highlight: [9], example: 4, ms: 3200 },
];

function DemoFrame({ children, className }: { children: ReactNode; className?: string }) {
	return (
		<div
			className={cn(
				'flex flex-col items-center justify-center rounded-card border border-border bg-background p-10 shadow-sm text-foreground',
				className,
			)}
		>
			{children}
		</div>
	);
}

function EnterExample({ reduceMotion }: { reduceMotion: boolean }) {
	return (
		<DemoFrame className="w-[28rem] overflow-hidden p-0">
			<div className="relative h-72 w-full overflow-hidden">
				<p className="absolute top-4 left-5 font-mono text-sm text-muted-foreground">viewport</p>
				<motion.div
					className="absolute inset-x-8 bottom-8 rounded-card bg-card p-7 ring-1 ring-foreground/10"
					initial={reduceMotion ? false : { y: 110, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: EASE_OUT }}
				>
					<p className="text-3xl">Entra</p>
					<p className="mt-2 font-mono text-sm text-muted-foreground">ease-out</p>
				</motion.div>
			</div>
		</DemoFrame>
	);
}

function MorphExample({ reduceMotion }: { reduceMotion: boolean }) {
	const [selected, setSelected] = useState<'claro' | 'oscuro'>('claro');

	useEffect(() => {
		const id = window.setTimeout(() => setSelected('oscuro'), reduceMotion ? 0 : 480);
		return () => window.clearTimeout(id);
	}, [reduceMotion]);

	return (
		<DemoFrame className="gap-5">
			<div className="relative flex rounded-full bg-card p-1.5 ring-1 ring-foreground/10">
				<motion.div
					aria-hidden
					className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full bg-background shadow-sm"
					initial={false}
					animate={{ left: selected === 'claro' ? 6 : 'calc(50%)' }}
					transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease: EASE_IN_OUT }}
				/>
				<button
					type="button"
					className="relative z-10 flex h-14 w-40 items-center justify-center gap-2.5 rounded-full text-lg"
					onClick={() => setSelected('claro')}
					aria-pressed={selected === 'claro'}
				>
					<SunIcon weight="regular" className="size-5" aria-hidden />
					Claro
				</button>
				<button
					type="button"
					className="relative z-10 flex h-14 w-40 items-center justify-center gap-2.5 rounded-full text-lg"
					onClick={() => setSelected('oscuro')}
					aria-pressed={selected === 'oscuro'}
				>
					<MoonIcon weight="regular" className="size-5" aria-hidden />
					Oscuro
				</button>
			</div>
			<p className="font-mono text-sm text-muted-foreground">ease-in-out</p>
		</DemoFrame>
	);
}

function HoverExample({ reduceMotion }: { reduceMotion: boolean }) {
	const [hovered, setHovered] = useState(reduceMotion);

	return (
		<DemoFrame className="gap-5 px-12 py-12">
			<div className="relative">
				<Button
					type="button"
					variant="secondary"
					size="lg"
					tabIndex={-1}
					className={cn(
						'pointer-events-none h-14 px-8 text-xl transition-colors duration-200 ease hover:bg-primary',
						hovered && 'bg-cursor-accent text-white hover:bg-cursor-accent',
					)}
				>
					Acción
				</Button>
				<motion.div
					aria-hidden
					className="pointer-events-none absolute top-1/2 left-1/2"
					initial={reduceMotion ? { x: 14, y: 4, opacity: 1 } : { x: 72, y: 48, opacity: 0 }}
					animate={{ x: 14, y: 4, opacity: 1 }}
					transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: 'easeOut' }}
					onAnimationComplete={() => setHovered(true)}
				>
					<HandPointingIcon weight="duotone" className="size-11 text-foreground" />
				</motion.div>
			</div>
			<p className="font-mono text-sm text-muted-foreground">ease</p>
		</DemoFrame>
	);
}

function LinearExample({ reduceMotion }: { reduceMotion: boolean }) {
	return (
		<DemoFrame className="w-[28rem] gap-5">
			<div className="h-3.5 w-full overflow-hidden rounded-full bg-muted">
				<motion.div
					className="h-full origin-left rounded-full bg-foreground"
					initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
					animate={{ scaleX: 1 }}
					transition={reduceMotion ? { duration: 0 } : { duration: 1.45, ease: 'linear' }}
				/>
			</div>
			<p className="font-mono text-sm text-muted-foreground">linear</p>
		</DemoFrame>
	);
}

function DefaultCurveExample() {
	return <EasingCurve className="w-[28rem] p-7 [&_p]:text-sm" target={EASE_OUT} animatePanel={false} />;
}

function ExampleView({ id, reduceMotion }: { id: ExampleId; reduceMotion: boolean }) {
	switch (id) {
		case 0:
			return <EnterExample reduceMotion={reduceMotion} />;
		case 1:
			return <MorphExample reduceMotion={reduceMotion} />;
		case 2:
			return <HoverExample reduceMotion={reduceMotion} />;
		case 3:
			return <LinearExample reduceMotion={reduceMotion} />;
		case 4:
			return <DefaultCurveExample />;
	}
}

export default function EasingDecisionTree() {
	const prefersReducedMotion = useReducedMotion();
	const reduceMotion = Boolean(prefersReducedMotion);
	const [phaseIndex, setPhaseIndex] = useState(-1);
	const [copied, setCopied] = useState(false);
	const copiedResetRef = useRef<number | null>(null);

	useEffect(() => {
		let cancelled = false;
		const timers: number[] = [];

		const sleep = (ms: number) =>
			new Promise<void>((resolve) => {
				timers.push(window.setTimeout(resolve, reduceMotion ? Math.min(ms, 80) : ms));
			});

		const play = async () => {
			await sleep(START_DELAY_MS);
			let firstLoop = true;
			while (!cancelled) {
				const start = firstLoop ? 0 : 1;
				firstLoop = false;
				for (let i = start; i < PHASES.length; i++) {
					if (cancelled) return;
					setPhaseIndex(i);
					await sleep(PHASES[i].ms);
				}
				await sleep(LOOP_GAP_MS);
			}
		};

		void play();

		return () => {
			cancelled = true;
			timers.forEach((id) => window.clearTimeout(id));
		};
	}, [reduceMotion]);

	useEffect(() => {
		return () => {
			if (copiedResetRef.current !== null) {
				window.clearTimeout(copiedResetRef.current);
			}
		};
	}, []);

	const copyTree = async () => {
		try {
			await navigator.clipboard.writeText(easingTree);
			setCopied(true);
			if (copiedResetRef.current !== null) {
				window.clearTimeout(copiedResetRef.current);
			}
			copiedResetRef.current = window.setTimeout(() => setCopied(false), 2000);
		} catch {
			setCopied(false);
		}
	};

	const phase = phaseIndex >= 0 ? PHASES[phaseIndex] : undefined;
	const highlighted = new Set(phase?.highlight ?? []);
	const example = phase?.example ?? null;
	const liveLine = phase ? TREE_LINES[phase.highlight[phase.highlight.length - 1]] : '';

	return (
		<div className={cn(display, 'relative grid h-full w-full grid-cols-2 grid-rows-1')}>
			<div className={bodyFrame}>
				<pre className="overflow-x-auto font-mono text-[clamp(1.05rem,1.7vw,1.65rem)] leading-relaxed whitespace-pre text-foreground">
					{TREE_LINES.map((line, index) => (
						<span
							key={`${index}-${line}`}
							className={cn(
								'block rounded-sm px-1 -mx-1 transition-colors duration-300',
								highlighted.has(index) ? 'bg-cursor-accent/10 text-cursor-accent' : 'text-foreground',
							)}
						>
							{line}
						</span>
					))}
				</pre>
				<Button
					type="button"
					variant="outline"
					size="lg"
					className="mt-6"
					onClick={() => {
						void copyTree();
					}}
					aria-label={copied ? 'Árbol copiado' : 'Copiar el markdown del árbol de decisión'}
				>
					{copied ? (
						<CheckIcon weight="regular" className="size-4" aria-hidden="true" />
					) : (
						<CopyIcon weight="regular" className="size-4" aria-hidden="true" />
					)}
					{copied ? 'Copiado' : 'Copiar markdown'}
				</Button>
				<p className="sr-only" aria-live="polite">
					{copied ? 'Markdown del árbol copiado al portapapeles.' : liveLine}
				</p>
			</div>

			<div
				className="relative flex h-full w-full items-center justify-center bg-cover bg-center"
				style={{ backgroundImage: "url('/images/deck/deck-6.webp')" }}
			>
				<AnimatePresence mode="wait">
					{example !== null ? (
						<motion.div
							key={example}
							initial={reduceMotion ? false : { opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={reduceMotion ? undefined : { opacity: 0 }}
							transition={{ duration: reduceMotion ? 0 : FADE_S }}
							className="theme-light absolute inset-0 flex items-center justify-center p-8 font-sans"
						>
							<ExampleView id={example} reduceMotion={reduceMotion} />
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>

			<CursorLockupSwap size={40} className="absolute bottom-4 right-4" />
		</div>
	);
}
