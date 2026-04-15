/* eslint-disable react-hooks/incompatible-library */
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, Mail, User, Zap, Users } from "lucide-react";
import { toast } from "sonner";
import { useSignUp } from "@/hooks/auth/use-sign-up";
import { pageRoutes } from "@/lib/routes";
import { signUpSchema } from "@/lib/validations/auth";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Combobox } from "@/components/ui/combobox";
import { schools } from "@/lib/contents";
import type { SignUpPayload } from "@/types/auth";
import { Logo } from "../../../components/shared/logo";

type SignUpFormValues = SignUpPayload & {
	confirmPassword: string;
};

export default function SignUpPage() {
	const router = useRouter();
	const signUpMutation = useSignUp();
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<SignUpFormValues>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			fullName: "",
			email: "",
			university: "",
			phone: "",
			password: "",
			confirmPassword: "",
			role: "user",
		},
	});

	const onSubmit = form.handleSubmit(async (values) => {
		console.log("onSubmit called - form is valid");
		console.log("Form submitted with values:", values);
		try {
			// console.log("Calling signUpMutation.mutateAsync...");
			await signUpMutation.mutateAsync({
				fullName: values.fullName,
				email: values.email,
				university: values.university,
				phone: values.phone,
				password: values.password,
				role: values.role,
			});
			// console.log("Signup successful:", result);

			toast.success("Account created successfully. You can sign in now.");
			router.push(pageRoutes.authRoutes.login);
		} catch (error) {
			console.error("Signup failed:", error);
			toast.error(
				error instanceof Error ? error.message : "Failed to create account",
			);
		}
	});

	return (
		<div className="min-h-screen bg-background">
			{/* <Navbar /> */}

			<section className="min-h-screen flex items-center justify-center px-4 pt-12 pb-20">
				<div className="w-full max-w-xl">
					<div className="flex flex-col items-center text-center mb-8">
						<Logo size="lg" />
						<h1 className="text-3xl font-bold text-foreground mb-2">
							Join Univibe
						</h1>
						<p className="text-muted-foreground">
							Create your account to discover and join events
						</p>
					</div>

					<form
						onSubmit={onSubmit}
						className="sm:bg-card sm:border border-border rounded-lg sm:p-8 space-y-6 mb-6"
					>
						<div>
							<label
								htmlFor="fullName"
								className="block text-sm font-medium text-foreground mb-2"
							>
								Full Name
							</label>
							<div className="relative">
								<User
									className="absolute left-3 top-3 text-muted-foreground"
									size={20}
								/>
								<input
									id="fullName"
									type="text"
									{...form.register("fullName")}
									placeholder="John Doe"
									className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
								/>
							</div>
							{form.formState.errors.fullName ? (
								<p className="mt-2 text-sm text-destructive">
									{form.formState.errors.fullName.message}
								</p>
							) : null}
						</div>

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
								htmlFor="university"
								className="block text-sm font-medium text-foreground mb-2"
							>
								University
							</label>
							<Combobox
								options={schools.map((school) => ({
									label: school.name,
									value: school.name,
								}))}
								value={form.watch("university") || ""}
								onValueChange={(value) => form.setValue("university", value)}
								placeholder="Select your university"
							/>
							{form.formState.errors.university ? (
								<p className="mt-2 text-sm text-destructive">
									{form.formState.errors.university.message}
								</p>
							) : null}
						</div>

						<div>
							<label
								htmlFor="phone"
								className="block text-sm font-medium text-foreground mb-2"
							>
								Phone Number
							</label>
							<div className="relative">
								<input
									id="phone"
									type="tel"
									{...form.register("phone")}
									placeholder="+1 (555) 123-4567"
									className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
								/>
							</div>
							{form.formState.errors.phone ? (
								<p className="mt-2 text-sm text-destructive">
									{form.formState.errors.phone.message}
								</p>
							) : null}
						</div>

						<div>
							<label className="block text-sm font-medium text-foreground mb-4">
								What would you like to do?
							</label>
							<RadioGroup
								value={form.watch("role") || "user"}
								onValueChange={(value) =>
									form.setValue("role", value as "user" | "host")
								}
							>
								<div className="space-y-3">
									<div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary cursor-pointer transition">
										<RadioGroupItem value="user" id="role-user" />
										<label
											htmlFor="role-user"
											className="flex-1 cursor-pointer"
										>
											<div className="flex items-center gap-2">
												<Users size={18} />
												<div>
													<div className="font-medium text-foreground">
														Discover Events
													</div>
													<div className="text-xs text-muted-foreground">
														Browse and join events on campus
													</div>
												</div>
											</div>
										</label>
									</div>
									<div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary cursor-pointer transition">
										<RadioGroupItem value="host" id="role-host" />
										<label
											htmlFor="role-host"
											className="flex-1 cursor-pointer"
										>
											<div className="flex items-center gap-2">
												<Zap size={18} />
												<div>
													<div className="font-medium text-foreground">
														Host Events
													</div>
													<div className="text-xs text-muted-foreground">
														Create and manage your own events
													</div>
												</div>
											</div>
										</label>
									</div>
								</div>
							</RadioGroup>
							{form.formState.errors.role && (
								<p className="text-sm text-destructive mt-2">
									{form.formState.errors.role.message}
								</p>
							)}
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
									className="w-full pl-10 pr-10 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary z-10"
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

						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium text-foreground mb-2"
							>
								Confirm Password
							</label>
							<input
								id="confirmPassword"
								type={showPassword ? "text" : "password"}
								{...form.register("confirmPassword")}
								placeholder="********"
								className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
							/>
							{form.formState.errors.confirmPassword ? (
								<p className="mt-2 text-sm text-destructive">
									{form.formState.errors.confirmPassword.message}
								</p>
							) : null}
						</div>

						<button
							type="submit"
							disabled={signUpMutation.isPending}
							className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{signUpMutation.isPending ? "Creating Account..." : "Sign Up"}
						</button>
					</form>

					<div className="text-center text-sm text-muted-foreground">
						Already have an account?{" "}
						<Link
							href={pageRoutes.authRoutes.login}
							className="text-primary hover:text-accent transition font-medium"
						>
							Sign in
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
