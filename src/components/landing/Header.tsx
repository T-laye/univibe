"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { useAuthSession } from "@/hooks/auth/use-auth-session";
import { useSignOut } from "@/hooks/auth/use-sign-out";
import { pageRoutes } from "@/lib/routes";
import { Logo } from "../shared/logo";

const publicLinks = [
	{ href: pageRoutes.publicRoutes.home, label: "Home" },
	// { href: pageRoutes.publicRoutes.features, label: "Features" },
	// { href: pageRoutes.publicRoutes.how, label: "How it works" },
	{ href: pageRoutes.publicRoutes.events, label: "Events" },
];

const privateLinks = [
	{ href: pageRoutes.userRoutes.dashboard, label: "My Tickets" },
	{ href: pageRoutes.hostRoutes.dashboard, label: "Host" },
];

export default function Header() {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const { user } = useAuthSession();
	const signOutMutation = useSignOut();
	const isLoggedIn = !!user;

	useEffect(() => {
		const onScroll = () => setIsScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	useEffect(() => {
		const onResize = () => {
			if (window.innerWidth >= 768) {
				setIsOpen(false);
			}
		};

		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	const navShellClass = isScrolled
		? "border-border/80 bg-card/96 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.85)]"
		: "border-border/40 bg-card/92";

	return (
		<div className="fixed top-0 inset-x-0 z-50 px-3 pt-3 md:px-4 md:pt-4">
			<nav
				className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-500 animate-slide-down ${navShellClass}`}
			>
				<div className="flex h-16 sm:h-18 items-center justify-between px-4 md:px-6">
					<div className="max-sm:hidden transition-transform duration-300 hover:scale-[1.02]">
						<Logo size="md" href={pageRoutes.publicRoutes.home} />
					</div>
					<div className="sm:hidden transition-transform duration-300 hover:scale-[1.02]">
						<Logo size="sm" href={pageRoutes.publicRoutes.home} />
					</div>

					<div className="hidden md:flex items-center gap-2 rounded-full border border-border/70 bg-background/40 p-1">
						{publicLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="rounded-full px-4 py-2 text-sm text-foreground/80 transition-all duration-300 hover:bg-primary/10 hover:text-primary"
							>
								{link.label}
							</Link>
						))}
						{isLoggedIn &&
							privateLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="rounded-full px-4 py-2 text-sm text-foreground/80 transition-all duration-300 hover:bg-primary/10 hover:text-primary"
								>
									{link.label}
								</Link>
							))}
					</div>

					<div className="hidden md:flex items-center gap-3">
						{isLoggedIn ? (
							<button
								onClick={async () => {
									await signOutMutation.mutateAsync();
									router.push(pageRoutes.publicRoutes.home);
								}}
								className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary "
							>
								<LogOut size={16} />
								Logout
							</button>
						) : (
							<>
								<Link
									href={pageRoutes.authRoutes.login}
									className="rounded-full px-4 py-2 text-sm text-foreground/80 transition-all font-medium border duration-300 hover:text-primary hover:border-primary hover:-translate-y-0.5 hover:bg-primary/10"
								>
									Log in
								</Link>
								<Link
									href={pageRoutes.authRoutes.login}
									className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_16px_40px_-24px_var(--color-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
								>
									Start hosting
								</Link>
							</>
						)}
					</div>

					<button
						onClick={() => setIsOpen((open) => !open)}
						className={`md:hidden inline-flex items-center justify-center rounded-full border p-3 transition-all duration-300 ${
							isOpen
								? "border-primary/50 bg-primary/10 text-primary rotate-90"
								: "border-border/70 bg-background/60 text-foreground"
						}`}
						aria-expanded={isOpen}
						aria-label="Toggle navigation menu"
					>
						{isOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>

				<div
					className={`md:hidden overflow-hidden transition-all duration-500 ${
						isOpen
							? "max-h-128 opacity-100"
							: "pointer-events-none max-h-0 opacity-0"
					}`}
				>
					<div
						className={`mx-3 mb-3 rounded-2xl border border-border/70 bg-background/95 p-3 shadow-[0_18px_60px_-28px_rgba(15,23,42,0.95)] transition-all duration-500 ${
							isOpen ? "translate-y-0 scale-100" : "-translate-y-4 scale-[0.98]"
						}`}
					>
						<div className="space-y-1">
							{publicLinks.map((link, index) => (
								<Link
									key={link.href}
									href={link.href}
									onClick={() => setIsOpen(false)}
									className="block rounded-xl px-4 py-3 text-base text-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary"
									style={{
										transitionDelay: isOpen ? `${index * 60}ms` : "0ms",
									}}
								>
									{link.label}
								</Link>
							))}
							{isLoggedIn &&
								privateLinks.map((link, index) => (
									<Link
										key={link.href}
										href={link.href}
										onClick={() => setIsOpen(false)}
										className="block rounded-xl px-4 py-3 text-base text-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary"
										style={{
											transitionDelay: isOpen
												? `${(index + publicLinks.length) * 60}ms`
												: "0ms",
										}}
									>
										{link.label}
									</Link>
								))}
						</div>

						<div className="mt-4 grid gap-3 border-t border-border/70 pt-4">
							{isLoggedIn ? (
								<button
									onClick={async () => {
										await signOutMutation.mutateAsync();
										setIsOpen(false);
										router.push(pageRoutes.publicRoutes.home);
									}}
									className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
								>
									<LogOut size={18} />
									Logout
								</button>
							) : (
								<>
									<Link
										href={pageRoutes.authRoutes.login}
										onClick={() => setIsOpen(false)}
										className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-3 text-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
									>
										Log in
									</Link>
									<Link
										href={pageRoutes.authRoutes.login}
										onClick={() => setIsOpen(false)}
										className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground shadow-[0_18px_40px_-24px_var(--color-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
									>
										Start hosting
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
}
