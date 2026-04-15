"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { useAuthSession } from "@/hooks/auth/use-auth-session";
import { useSignIn } from "@/hooks/auth/use-sign-in";
import { pageRoutes } from "@/lib/routes";
import type { SignInPayload } from "@/types/auth";
import { Logo } from "../../../components/shared/logo";
import { signInSchema } from "../../../lib/validations/auth";

export default function LoginPage() {
	const router = useRouter();
	const { user, isHydrating } = useAuthSession();
	const signInMutation = useSignIn();
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<SignInPayload>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	useEffect(() => {
		if (isHydrating || !user) return;

		const destination =
			user.role === "admin"
				? pageRoutes.adminRoutes.dashboard
				: user.role === "host"
					? pageRoutes.hostRoutes.dashboard
					: pageRoutes.userRoutes.dashboard;

		router.replace(destination);
	}, [isHydrating, router, user]);

	const onSubmit = form.handleSubmit(async (values) => {
		try {
			const data = await signInMutation.mutateAsync(values);
			toast.success("Logged in successfully");

			const destination =
				data.user?.role === "admin"
					? pageRoutes.adminRoutes.dashboard
					: data.user?.role === "host"
						? pageRoutes.hostRoutes.dashboard
						: pageRoutes.userRoutes.dashboard;

			// console.log(data.user?.role, destination);
			router.push(destination);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Failed to sign in");
		}
	});

	return (
		<div className="min-h-screen bg-background">
			{/* <Navbar /> */}

			<section className="min-h-screen flex items-center justify-center px-4 py-12">
				<div className="w-full max-w-md">
					<div className="flex flex-col items-center text-center mb-8">
						<Logo size="lg" />
						<h1 className="text-3xl font-bold text-foreground mb-2">
							Welcome Back
						</h1>
						<p className="text-muted-foreground">
							Sign in to your Univibes account
						</p>
					</div>

					<form
						onSubmit={onSubmit}
						className="sm:bg-card sm:border border-border rounded-lg sm:p-8 space-y-6 mb-6"
					>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-foreground mb-2"
							>
								Email Address
							</label>
							<div className="relative">
								<Mail
									className="absolute left-3 top-3 text-muted-foreground"
									size={20}
								/>
								<input
									id="email"
									type="email"
									{...form.register("email")}
									placeholder="you@university.edu"
									className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
								/>
							</div>
							{form.formState.errors.email ? (
								<p className="mt-2 text-sm text-destructive">
									{form.formState.errors.email.message}
								</p>
							) : null}
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-foreground mb-2"
							>
								Password
							</label>
							<div className="relative">
								<Lock
									className="absolute left-3 top-3 text-muted-foreground"
									size={20}
								/>
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									{...form.register("password")}
									placeholder="********"
									className="w-full pl-10 pr-10 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
								/>
								<button
									type="button"
									onClick={() => setShowPassword((visible) => !visible)}
									className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition"
									aria-label="Toggle password visibility"
								>
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
							{form.formState.errors.password ? (
								<p className="mt-2 text-sm text-destructive">
									{form.formState.errors.password.message}
								</p>
							) : null}
						</div>

						<button
							type="submit"
							disabled={signInMutation.isPending}
							className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{signInMutation.isPending ? "Signing in..." : "Sign In"}
						</button>
					</form>

					<div className="text-center text-sm text-muted-foreground">
						Don&apos;t have an account?{" "}
						<Link
							href={pageRoutes.authRoutes.signup}
							className="text-primary hover:text-accent transition font-medium"
						>
							Sign up
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
