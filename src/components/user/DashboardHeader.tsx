"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { pageRoutes } from "@/lib/routes";
import type { AuthUser } from "@/types/auth";

export function DashboardHeader({ user }: { user: AuthUser }) {
	return (
		<section className="bg-linear-to-br from-primary/10 via-background to-background border-b border-border py-10">
			<div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-6 items-start md:items-center pt-16 sm:pt-20">
				{/* Profile */}
				<div className="flex items-center gap-4 w-full">
					<div className="w-14 h-14 sm:min-w-20 sm:w-20 sm:h-20 rounded-2xl bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold shadow-inner">
						{!user?.avatarUrl ? (
							<div>{user?.fullName?.charAt(0).toUpperCase()}</div>
						) : (
							<Image
								src={user.avatarUrl}
								width={100}
								height={100}
								alt="Profile"
								className="w-full h-full object-cover rounded-2xl"
							/>
						)}
					</div>

					<div>
						<h1 className="sm:text-xl md:text-2xl lg:text-3xl font-bold">
							{user.fullName}
						</h1>
						<p className="text-muted-foreground">{user.university}</p>
						<span className="inline-block mt-1 text-xs px-3 py-1 rounded-full bg-primary/10 text-primary capitalize">
							{user.role}
						</span>
					</div>
				</div>

				{/* Actions */}
				<div className="flex gap-3 w-full justify-end">
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
				</div>
			</div>
		</section>
	);
}
