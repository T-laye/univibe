/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Calendar, Plus, QrCode } from "lucide-react";
import { useRequireRole } from "@/hooks/auth/use-require-role";
import { useUserDashboard } from "@/hooks/user/use-user-dashboard";
import { pageRoutes } from "@/lib/routes";
import Header from "../../components/landing/Header";
import { useUserStore } from "../../stores/user-store";
import { Loading } from "../../components/shared/loading";
import { toast } from "sonner";
import Image from "next/image";
import type { UserDashboardData } from "@/types/user";

export default function DashboardPage() {
	const { user, isAuthorized, isHydrating } = useRequireRole(["user", "host"]);
	const { activeTab, setActiveTab } = useUserStore();
	const dashboardQuery = useUserDashboard(isAuthorized && !isHydrating);

	if (isHydrating || !isAuthorized || !user) {
		return <Loading />;
	}

	const dashboard = dashboardQuery.data;

	console.log(user);

	return (
		<div className="min-h-screen bg-background">
			<Header />

			{/* 🔥 HEADER */}
			<section className="bg-linear-to-br from-primary/10 via-background to-background border-b border-border py-10">
				<div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-6 items-start md:items-center  pt-16 sm:pt-20">
					{/* Profile */}
					<div className="flex items-center gap-4 w-full">
						<div className="w-14 h-14 sm:min-w-20 sm:w-20 sm:h-20 rounded-2xl bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold shadow-inner">
							{!user?.avatarUrl ? (
								<div>{user?.fullName?.charAt(0).toUpperCase() || ""}</div>
							) : (
								<Image
									src={user?.avatarUrl}
									// src="/logos/logo.svg"
									width={100}
									height={100}
									alt="Profile"
									className="w-full h-full object-cover rounded-2xl"
								/>
							)}
						</div>

						<div>
							<h1 className="sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
								{user.fullName}
							</h1>
							<p className="max-sm:text-sm text-muted-foreground">
								{user.university}
							</p>
							<span className="inline-block mt-1 text-xs px-3 py-1 rounded-full bg-primary/10 text-primary capitalize">
								{user.role}
							</span>
						</div>
					</div>

					{/* Actions */}
					<div className="flex gap-3 w-full justify-end ">
						{user?.kycStatus !== "pending" ? (
							<Link
								href={pageRoutes.hostRoutes.dashboard}
								className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl shadow hover:scale-[1.02] transition max-md:w-full justify-center"
							>
								<Plus size={18} />
								Host Event
							</Link>
						) : (
							<button
								onClick={() =>
									toast.info("Can Only Host Events When KYC is Approved")
								}
								className="flex items-center gap-2 px-5 py-2.5 bg-[#27272e] text-primary-foreground rounded-xl shadow hover:scale-[1.02] transition max-md:w-full justify-center"
							>
								<Plus size={18} />
								Host Event
							</button>
						)}

						{/* <button className="p-2.5 rounded-xl border border-border hover:bg-muted transition">
							<Settings size={20} />
						</button> */}
					</div>
				</div>
			</section>

			{/* 🔥 CONTENT */}
			<section className="max-w-7xl mx-auto px-4 py-10">
				{/* Tabs */}
				<div className="flex gap-2 mb-10 bg-muted p-1 rounded-xl w-fit">
					{[
						{ key: "registered", label: "Registered" },
						{ key: "favorites", label: "Favorites" },
						{ key: "settings", label: "Settings" },
					].map((tab) => (
						<button
							key={tab.key}
							onClick={() =>
								setActiveTab(tab.key as "registered" | "favorites" | "settings")
							}
							className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
								activeTab === tab.key
									? "bg-background shadow text-foreground"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>

				{/* STATES */}
				{dashboardQuery.isLoading && (
					<div className="text-muted-foreground text-center mt-16">
						Loading dashboard...
					</div>
				)}
				{dashboardQuery.isError && (
					<div className="text-destructive text-center mt-10">
						Something went wrong.
					</div>
				)}

				{!dashboard && !dashboardQuery.isLoading && !dashboardQuery.isError && (
					<div className="text-muted-foreground text-center mt-10">
						No data available.
					</div>
				)}

				{/* 🔥 REGISTERED EVENTS */}
				{dashboard && activeTab === "registered" && (
					<div>
						<h2 className="text-2xl font-bold mb-6">Your Events</h2>

						{dashboard.registrations.length === 0 ? (
							<div className="p-10 border border-border rounded-xl text-center text-muted-foreground bg-card">
								You haven’t registered for any events yet.
							</div>
						) : (
							<div className="grid gap-6">
								{dashboard.registrations.map(
									(event: UserDashboardData["registrations"][0]) => (
										<div
											key={event.id}
											className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition"
										>
											<div className="flex flex-col md:flex-row justify-between gap-6">
												{/* Info */}
												<div>
													<h3 className="text-lg font-semibold mb-2">
														{event.title}
													</h3>

													<div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
														<span className="flex items-center gap-1">
															<Calendar size={16} />
															{event.date} • {event.time}
														</span>

														<span className="px-2 py-1 bg-primary/10 text-primary rounded-full capitalize">
															{event.status}
														</span>

														<span>{event.ticketTier}</span>
													</div>
												</div>

												{/* Action */}
												<button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition">
													<QrCode size={18} />
													View QR
												</button>
											</div>
										</div>
									),
								)}
							</div>
						)}
					</div>
				)}

				{/* 🔥 FAVORITES */}
				{dashboard && activeTab === "favorites" && (
					<div>
						<h2 className="text-2xl font-bold mb-6">Favorites</h2>

						{dashboard.favorites.length === 0 ? (
							<div className="p-10 border border-border rounded-xl text-center text-muted-foreground bg-card">
								No saved events yet.
							</div>
						) : (
							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
								{dashboard.favorites.map(
									(event: UserDashboardData["favorites"][0]) => (
										<div
											key={event.id}
											className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition"
										>
											{event.image && (
												<img
													src={event.image}
													alt={event.title}
													className="w-full h-40 object-cover"
												/>
											)}

											<div className="p-4">
												<h3 className="font-semibold mb-1">{event.title}</h3>
												<p className="text-sm text-muted-foreground mb-3">
													{event.date}
												</p>

												<Link
													href={pageRoutes.publicRoutes.eventDetails(event.id)}
													className="text-primary text-sm font-medium hover:underline"
												>
													View details →
												</Link>
											</div>
										</div>
									),
								)}
							</div>
						)}
					</div>
				)}

				{/* 🔥 SETTINGS */}
				{dashboard && activeTab === "settings" && (
					<div>
						<h2 className="text-2xl font-bold mb-6">Settings</h2>

						<div className="grid md:grid-cols-2 gap-6 max-w-3xl">
							<div className="bg-card border border-border rounded-xl p-6">
								<h3 className="font-semibold mb-4">Profile</h3>

								<div className="space-y-3 text-sm">
									<p>
										<strong>Name:</strong> {dashboard.profile.fullName}
									</p>
									<p>
										<strong>Email:</strong> {dashboard.profile.email}
									</p>
								</div>
							</div>

							<div className="bg-card border border-border rounded-xl p-6">
								<h3 className="font-semibold mb-4">Account</h3>

								<div className="space-y-3 text-sm">
									<p>
										KYC:{" "}
										<span className="text-primary capitalize">
											{dashboard.profile.kycStatus}
										</span>
									</p>
									<p>University: {dashboard.profile.university}</p>
									<p>Role: {dashboard.profile.role}</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</section>
		</div>
	);
}
