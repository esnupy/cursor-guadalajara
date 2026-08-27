'use client';

import {
	animate,
	motion,
	useMotionTemplate,
	useMotionValue,
	useMotionValueEvent,
	useReducedMotion,
	useTransform,
	type MotionValue,
} from 'framer-motion';
import { useCallback, useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { cn } from '@/lib/utils';

/** Brand ease-out spring: cubic-bezier(0.25, 1, 0.5, 1) */
const TARGET: readonly [number, number, number, number] = [0.25, 1, 0.5, 1];
/** Linear-ish start so the enter spring has somewhere to travel */
const FROM: readonly [number, number, number, number] = [0.42, 0.42, 0.58, 0.58];

const VIEW = 100;
const PAD = 12;
const GRAPH = VIEW - PAD * 2;
const HANDLE_R = 3.2;
const END_R = 2.2;
const HIT_R = 7;

type Point = { x: number; y: number };

function toSvg(x: number, y: number): Point {
	return {
		x: PAD + x * GRAPH,
		y: PAD + (1 - y) * GRAPH,
	};
}

function fromSvg(sx: number, sy: number): Point {
	return {
		x: (sx - PAD) / GRAPH,
		y: 1 - (sy - PAD) / GRAPH,
	};
}

function clamp(n: number, min: number, max: number) {
	return Math.min(max, Math.max(min, n));
}

function formatCubic(values: readonly [number, number, number, number]) {
	return `cubic-bezier(${values.map((v) => v.toFixed(2)).join(', ')})`;
}

type HandleId = 'p1' | 'p2';

function useAnimatedPoint(initialX: number, initialY: number) {
	const x = useMotionValue(initialX);
	const y = useMotionValue(initialY);
	const svgX = useTransform(x, (v) => toSvg(v, 0).x);
	const svgY = useTransform(y, (v) => toSvg(0, v).y);
	return { x, y, svgX, svgY };
}

function Handle({
	id,
	cx,
	cy,
	active,
	onPointerDown,
}: {
	id: HandleId;
	cx: MotionValue<number>;
	cy: MotionValue<number>;
	active: boolean;
	onPointerDown: (id: HandleId, event: ReactPointerEvent<SVGCircleElement>) => void;
}) {
	return (
		<>
			<motion.circle
				cx={cx}
				cy={cy}
				r={HIT_R}
				fill="transparent"
				className="cursor-grab touch-none active:cursor-grabbing"
				onPointerDown={(event) => onPointerDown(id, event)}
				aria-hidden
			/>
			<motion.circle
				cx={cx}
				cy={cy}
				r={HANDLE_R}
				className={cn(
					'pointer-events-none fill-background stroke-[1.5]',
					active ? 'stroke-cursor-accent' : 'stroke-foreground',
				)}
				style={{ filter: active ? 'drop-shadow(0 0 1.5px var(--cursor-accent))' : undefined }}
			/>
		</>
	);
}

export default function EasingCurve({ className }: { className?: string }) {
	const prefersReducedMotion = useReducedMotion();
	const svgRef = useRef<SVGSVGElement>(null);
	const labelRef = useRef<HTMLParagraphElement>(null);
	const dragRef = useRef<HandleId | null>(null);
	const gradientId = useId();

	const p1 = useAnimatedPoint(FROM[0], FROM[1]);
	const p2 = useAnimatedPoint(FROM[2], FROM[3]);

	const [activeHandle, setActiveHandle] = useState<HandleId | null>(null);

	const syncLabel = useCallback(() => {
		const next = formatCubic([p1.x.get(), p1.y.get(), p2.x.get(), p2.y.get()]);
		if (labelRef.current) {
			labelRef.current.textContent = next;
		}
		svgRef.current?.setAttribute('aria-label', `Editor de curva de easing. ${next}. Arrastra los puntos de control.`);
	}, [p1.x, p1.y, p2.x, p2.y]);

	useMotionValueEvent(p1.x, 'change', syncLabel);
	useMotionValueEvent(p1.y, 'change', syncLabel);
	useMotionValueEvent(p2.x, 'change', syncLabel);
	useMotionValueEvent(p2.y, 'change', syncLabel);

	const curvePath = useMotionTemplate`M ${PAD} ${PAD + GRAPH} C ${p1.svgX} ${p1.svgY}, ${p2.svgX} ${p2.svgY}, ${PAD + GRAPH} ${PAD}`;
	const handleLine1 = useMotionTemplate`M ${PAD} ${PAD + GRAPH} L ${p1.svgX} ${p1.svgY}`;
	const handleLine2 = useMotionTemplate`M ${PAD + GRAPH} ${PAD} L ${p2.svgX} ${p2.svgY}`;

	useEffect(() => {
		syncLabel();

		if (prefersReducedMotion) {
			p1.x.jump(TARGET[0]);
			p1.y.jump(TARGET[1]);
			p2.x.jump(TARGET[2]);
			p2.y.jump(TARGET[3]);
			syncLabel();
			return;
		}

		const spring = { type: 'spring' as const, stiffness: 120, damping: 18, mass: 0.85 };
		const springSoft = { type: 'spring' as const, stiffness: 90, damping: 16, mass: 1 };

		const controls = [
			animate(p1.x, TARGET[0], { ...spring, delay: 0.12 }),
			animate(p1.y, TARGET[1], { ...springSoft, delay: 0.18 }),
			animate(p2.x, TARGET[2], { ...spring, delay: 0.22 }),
			animate(p2.y, TARGET[3], { ...springSoft, delay: 0.28 }),
		];

		return () => {
			controls.forEach((c) => c.stop());
		};
	}, [p1.x, p1.y, p2.x, p2.y, prefersReducedMotion, syncLabel]);

	const clientToUnit = useCallback((clientX: number, clientY: number): Point | null => {
		const svg = svgRef.current;
		if (!svg) return null;
		const rect = svg.getBoundingClientRect();
		if (rect.width === 0 || rect.height === 0) return null;
		const sx = ((clientX - rect.left) / rect.width) * VIEW;
		const sy = ((clientY - rect.top) / rect.height) * VIEW;
		return fromSvg(sx, sy);
	}, []);

	const onPointerDown = useCallback(
		(id: HandleId, event: ReactPointerEvent<SVGCircleElement>) => {
			event.preventDefault();
			event.stopPropagation();
			dragRef.current = id;
			setActiveHandle(id);
			event.currentTarget.setPointerCapture(event.pointerId);

			const unit = clientToUnit(event.clientX, event.clientY);
			if (!unit) return;
			const point = id === 'p1' ? p1 : p2;
			point.x.set(clamp(unit.x, 0, 1));
			point.y.set(clamp(unit.y, -0.35, 1.35));
		},
		[clientToUnit, p1, p2],
	);

	const onPointerMove = useCallback(
		(event: ReactPointerEvent<SVGSVGElement>) => {
			const id = dragRef.current;
			if (!id) return;
			const unit = clientToUnit(event.clientX, event.clientY);
			if (!unit) return;
			const point = id === 'p1' ? p1 : p2;
			point.x.set(clamp(unit.x, 0, 1));
			point.y.set(clamp(unit.y, -0.35, 1.35));
		},
		[clientToUnit, p1, p2],
	);

	const endDrag = useCallback((event: ReactPointerEvent<SVGSVGElement>) => {
		if (dragRef.current === null) return;
		dragRef.current = null;
		setActiveHandle(null);
		try {
			event.currentTarget.releasePointerCapture(event.pointerId);
		} catch {
			/* already released */
		}
	}, []);

	const end = toSvg(1, 1);
	const start = toSvg(0, 0);

	return (
		<motion.div
			className={cn(
				'flex w-[min(72%,22rem)] flex-col items-center gap-3',
				'rounded-card border border-border bg-background p-5 shadow-sm',
				className,
			)}
			initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94, y: 12 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 160, damping: 22, mass: 0.9 }}
		>
			<svg
				ref={svgRef}
				viewBox={`0 0 ${VIEW} ${VIEW}`}
				className="aspect-square w-full touch-none select-none"
				role="img"
				aria-label={`Editor de curva de easing. ${formatCubic(FROM)}. Arrastra los puntos de control.`}
				onPointerMove={onPointerMove}
				onPointerUp={endDrag}
				onPointerCancel={endDrag}
			>
				<defs>
					<linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.35" />
						<stop offset="100%" stopColor="var(--cursor-accent)" stopOpacity="0.95" />
					</linearGradient>
				</defs>

				<rect
					x={PAD}
					y={PAD}
					width={GRAPH}
					height={GRAPH}
					className="fill-muted/40 stroke-border"
					strokeWidth={0.6}
					rx={1.2}
				/>

				{[0.25, 0.5, 0.75].map((t) => {
					const { x, y } = toSvg(t, t);
					return (
						<g key={t} className="stroke-border/70" strokeWidth={0.35}>
							<line x1={x} y1={PAD} x2={x} y2={PAD + GRAPH} />
							<line x1={PAD} y1={y} x2={PAD + GRAPH} y2={y} />
						</g>
					);
				})}

				<line
					x1={start.x}
					y1={start.y}
					x2={end.x}
					y2={end.y}
					className="stroke-muted-foreground/40"
					strokeWidth={0.45}
					strokeDasharray="1.6 1.4"
				/>

				<motion.path d={handleLine1} className="stroke-foreground/35" strokeWidth={0.7} fill="none" />
				<motion.path d={handleLine2} className="stroke-foreground/35" strokeWidth={0.7} fill="none" />

				<motion.path d={curvePath} fill="none" stroke={`url(#${gradientId})`} strokeWidth={1.8} strokeLinecap="round" />

				<circle cx={start.x} cy={start.y} r={END_R} className="fill-foreground" />
				<circle cx={end.x} cy={end.y} r={END_R} className="fill-foreground" />

				<Handle id="p1" cx={p1.svgX} cy={p1.svgY} active={activeHandle === 'p1'} onPointerDown={onPointerDown} />
				<Handle id="p2" cx={p2.svgX} cy={p2.svgY} active={activeHandle === 'p2'} onPointerDown={onPointerDown} />
			</svg>

			<p
				ref={labelRef}
				className="font-mono text-[0.7rem] tracking-tight text-muted-foreground tabular-nums sm:text-xs"
			>
				{formatCubic(FROM)}
			</p>
		</motion.div>
	);
}
