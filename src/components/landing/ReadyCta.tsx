import Link from 'next/link';
import React from 'react'
import { pageRoutes } from '../../lib/routes';
import { Reveal } from '../shared/reveal';

export default function ReadyCta() {
  return (
		<section className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
			<Reveal className="overflow-hidden rounded-4xl border border-border/70 bg-[linear-gradient(135deg,rgba(37,99,235,0.2),rgba(18,18,26,0.92)_55%,rgba(59,130,246,0.16))] p-8 text-center shadow-[0_30px_80px_-42px_rgba(37,99,235,0.65)] md:p-12">
				<p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-100/70">
					Ready when you are
				</p>
				<h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
					Find the next event everyone will talk about tomorrow
				</h2>
				<p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-sky-50/72">
					Start exploring what&apos;s around you or launch your own event with a
					flow that feels fast, modern, and campus-ready.
				</p>
				<div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
					<Link
						href={pageRoutes.publicRoutes.events}
						className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90"
					>
						Start exploring
					</Link>
					<Link
						href={pageRoutes.authRoutes.login}
						className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/8 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/12"
					>
						Start hosting
					</Link>
				</div>
			</Reveal>
		</section>
	);
}
