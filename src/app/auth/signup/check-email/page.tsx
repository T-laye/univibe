"use client";

import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { pageRoutes } from "@/lib/routes";

export default function CheckEmailPage() {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
			<div className="w-full max-w-xl bg-card border border-border rounded-3xl p-10 shadow-xl">
				<div className="flex flex-col items-center text-center gap-4">
					<Logo size="lg" />
					<h1 className="text-3xl font-bold text-foreground">Almost there!</h1>
					<p className="text-muted-foreground text-base sm:text-lg max-w-xl">
						We sent a confirmation email to the address you provided. Please
						check your inbox and click the confirmation link to activate your
						Univibe account.
					</p>
					<div className="rounded-2xl bg-primary/10 border border-primary/20 p-5 text-left w-full">
						<p className="text-sm text-muted-foreground">
							Don&apos;t see the email? Check your spam folder or try signing up
							again with the correct address.
						</p>
					</div>
					<Link
						href={pageRoutes.authRoutes.login}
						className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-8 py-3 font-semibold hover:bg-opacity-90 transition"
					>
						Go to login
					</Link>
				</div>
			</div>
		</div>
	);
}
