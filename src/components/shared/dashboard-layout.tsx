"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, Menu, Settings, X } from "lucide-react";
import { pageRoutes } from "@/lib/routes";
import { Logo } from "./logo";
import Image from "next/image";

interface SidebarItem {
	id: string;
	label: string;
	icon: React.ReactNode;
	active?: boolean;
	onClick?: () => void;
}

interface DashboardLayoutProps {
	title: string;
	subtitle?: string;
	userName: string;
	userEmail: string;
	userPic: string;
	roleLabel?: string;
	sidebarItems: SidebarItem[];
	actions?: React.ReactNode;
	children: React.ReactNode;
	onLogout?: () => void | Promise<void>;
}

export function DashboardLayout({
	title,
	subtitle,
	userName,
	userPic,
	roleLabel = "Workspace",
	sidebarItems,
	actions,
	children,
	onLogout,
}: DashboardLayoutProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const initials = userName
		?.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);

	// console.log(userPic);

	return (
		<div className="h-screen bg-background text-foreground">
			<div className="grid h-screen md:grid-cols-[16rem_minmax(0,1fr)]">
				{/* Sidebar */}
				<aside
					className={`fixed inset-y-0 left-0 z-50 w-52 sm:w-[16rem] border-r border-border/60 bg-card/95 backdrop-blur-sm transition-transform duration-300 md:static md:translate-x-0 flex flex-col ${
						sidebarOpen ? "translate-x-0" : "-translate-x-full"
					}`}
				>
					{/* Logo */}
					<div className="px-6 py-5 border-b border-border/60 flex justify-center shrink-0">
						<Logo size="lg" />
					</div>

					{/* Nav items */}
					<nav className="flex-1 overflow-y-auto p-3 space-y-2">
						{sidebarItems.map((item) => (
							<button
								key={item.id}
								onClick={() => {
									item.onClick?.();
									setSidebarOpen(false);
								}}
								className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-all duration-200 ${
									item.active
										? "bg-primary text-primary-foreground font-medium shadow-[0_4px_24px_-6px_var(--color-primary)]"
										: "text-muted-foreground hover:bg-muted hover:text-foreground"
								}`}
							>
								<span className="shrink-0 opacity-90">{item.icon}</span>
								<span>{item.label}</span>
							</button>
						))}
					</nav>

					{/* Bottom actions */}
					<div className="shrink-0 border-t border-border/60 p-3 space-y-3">
						<Link href={pageRoutes.userRoutes.dashboard}>
							<div className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground max-sm:hidden">
								<Settings size={16} />
								Account settings
							</div>
							<div className="sm:hidden flex items-center gap-2.5 rounded-xl border border-border/70 bg-card px-2 py-1">
								<div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-primary/10">
									{userPic ? (
										<Image
											src={userPic}
											height={50}
											width={50}
											alt={userName}
											className="object-cover"
										/>
									) : (
										<span className="flex h-full w-full items-center justify-center text-xs font-semibold text-primary">
											{initials}
										</span>
									)}
								</div>
								<div className="leading-tight">
									<p className="text-sm font-medium text-foreground">
										{userName.split(" ")[0]}
									</p>
									<p className="mt-1 text-[11px] text-muted-foreground">
										User Profile
									</p>
								</div>
							</div>
						</Link>
						<button
							onClick={onLogout}
							className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm text-destructive/80 transition-all duration-200 hover:bg-destructive/8 hover:text-destructive"
						>
							<LogOut size={16} />
							Log out
						</button>
					</div>
				</aside>

				{/* Main content */}
				<div className="flex min-h-screen flex-col overflow-hidden">
					{/* Header */}
					<header className="sticky top-0 z-30 border-b border-border/60 bg-background/95 backdrop-blur-sm shrink-0">
						<div className="flex items-center justify-between gap-4 px-4 py-3.5 md:px-7">
							{/* Left: hamburger + title */}
							<div className="flex items-center gap-3 min-w-0 max-md:justify-between max-md:w-full ">
								<div className="md:hidden">
									<Logo />
								</div>

								<div className="min-w-0 max-md:hidden">
									<p className="text-[10px] font-semibold uppercase tracking-widest text-primary/60">
										{roleLabel}
									</p>
									<h1 className="text-xl font-semibold tracking-tight leading-tight truncate">
										{title}
									</h1>
									{subtitle && (
										<p className="mt-0.5 text-xs text-muted-foreground leading-relaxed line-clamp-1">
											{subtitle}
										</p>
									)}
								</div>
							</div>

							{/* Right: actions + avatar */}
							<div className="flex items-center gap-2.5 shrink-0">
								<div className="max-md:hidden">{actions}</div>

								{/* Avatar chip */}
								<div className="hidden sm:flex items-center gap-2.5 rounded-xl border border-border/70 bg-card px-3 py-2">
									<div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-primary/10">
										{userPic ? (
											<Image
												src={userPic}
												fill
												alt={userName}
												className="object-cover"
											/>
										) : (
											<span className="flex h-full w-full items-center justify-center text-xs font-semibold text-primary">
												{initials}
											</span>
										)}
									</div>
									<div className="leading-tight">
										<p className="text-sm font-medium text-foreground">
											{userName.split(" ")[0]}
										</p>
										<p className="text-[11px] text-muted-foreground">
											{roleLabel}
										</p>
									</div>
								</div>
								<button
									onClick={() => setSidebarOpen((o) => !o)}
									className="inline-flex shrink-0 items-center justify-center rounded-xl border border-border bg-card p-3 text-muted-foreground transition hover:border-primary/30 hover:text-primary md:hidden"
									aria-label="Toggle navigation"
								>
									{sidebarOpen ? <X size={18} /> : <Menu size={18} />}
								</button>
							</div>
						</div>
					</header>

					{/* Page content */}
					<main className="flex-1 px-4 pt-6 md:px-7 md:pt-7 overflow-y-auto pb-20">
						{children}
					</main>
				</div>
			</div>

			{/* Overlay */}
			{sidebarOpen && (
				<button
					className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[1px] md:hidden"
					onClick={() => setSidebarOpen(false)}
					aria-label="Close navigation"
				/>
			)}
		</div>
	);
}
