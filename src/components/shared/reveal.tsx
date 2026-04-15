/* eslint-disable react-hooks/refs */
"use client";

import {
	type CSSProperties,
	type ReactNode,
	createElement,
	useEffect,
	useRef,
	useState,
} from "react";

type RevealVariant = "fade" | "up" | "down" | "left" | "right" | "zoom";
type RevealTag = keyof HTMLElementTagNameMap;

interface RevealProps {
	as?: RevealTag;
	children: ReactNode;
	className?: string;
	delay?: number;
	threshold?: number;
	variant?: RevealVariant;
}

export function Reveal({
	as: Component = "div",
	children,
	className = "",
	delay = 0,
	threshold = 0.18,
	variant = "up",
}: RevealProps) {
	const ref = useRef<HTMLElement | null>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;

		if (prefersReducedMotion) {
			setIsVisible(true);
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (!entry?.isIntersecting) return;
				setIsVisible(true);
				observer.unobserve(entry.target);
			},
			{
				threshold,
				rootMargin: "0px 0px -10% 0px",
			}
		);

		observer.observe(element);

		return () => observer.disconnect();
	}, [threshold]);

	const style = {
		transitionDelay: `${delay}ms`,
	} as CSSProperties;

	return createElement(
		Component,
		{
			ref: ref as never,
			className: `reveal reveal-${variant} ${isVisible ? "reveal-visible" : ""} ${className}`.trim(),
			style,
		},
		children
	);
}
