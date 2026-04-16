/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
// import { apiFetch } from "@/lib/api-client";

export function PasswordSection({ loading, setLoading }: any) {
	const [passwords, setPasswords] = useState({ current: "", new: "" });
	const [show, setShow] = useState({ current: false, new: false });

	const toggleShow = (field: "current" | "new") =>
		setShow((prev) => ({ ...prev, [field]: !prev[field] }));

	const handlePasswordChange = async () => {
		if (!passwords.current) return toast.error("Enter current password");
		if (!passwords.new) return toast.error("Enter new password");
		if (passwords.new.length < 6)
			return toast.error("Password must be at least 6 characters");

		setLoading(true);
		try {
			const supabase = getSupabaseBrowserClient();

			// 1. Re-authenticate with current password
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user?.email) throw new Error("Not authenticated");

			const { error: signInError } = await supabase.auth.signInWithPassword({
				email: user.email,
				password: passwords.current,
			});

			if (signInError) throw new Error("Current password is incorrect");

			// 2. Update to new password
			const { error: updateError } = await supabase.auth.updateUser({
				password: passwords.new,
			});

			if (updateError) throw new Error(updateError.message);

			toast.success("Password updated");
			setPasswords({ current: "", new: "" });
		} catch (err: any) {
			toast.error(err.message || "Failed to update password");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="sm:bg-card sm:border border-border rounded-xl sm:p-6 mt-10">
			<h3 className="font-semibold mb-4">Change Password</h3>

			<div className="space-y-3">
				{(["current", "new"] as const).map((field) => (
					<div key={field} className="relative">
						<input
							type={show[field] ? "text" : "password"}
							placeholder={
								field === "current" ? "Current password" : "New password"
							}
							value={passwords[field]}
							onChange={(e) =>
								setPasswords({ ...passwords, [field]: e.target.value })
							}
							className="w-full p-2 pr-10 bg-input border rounded"
						/>
						<button
							type="button"
							onClick={() => toggleShow(field)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
						>
							{show[field] ? <EyeOff size={16} /> : <Eye size={16} />}
						</button>
					</div>
				))}

				<button
					onClick={handlePasswordChange}
					disabled={loading}
					className="px-4 py-2 bg-primary text-white rounded-lg w-full mt-3 hover:opacity-90 disabled:opacity-50"
				>
					{loading ? "Updating..." : "Update Password"}
				</button>
			</div>
		</div>
	);
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState } from "react";
// import { toast } from "sonner";

// export function PasswordSection({ loading, setLoading }: any) {
// 	const [passwords, setPasswords] = useState({
// 		current: "",
// 		new: "",
// 	});

// 	const handlePasswordChange = async () => {
// 		if (!passwords.new) {
// 			return toast.error("Enter new password");
// 		}

// 		setLoading(true);
// 		try {
// 			await fetch("/api/user/change-password", {
// 				method: "POST",
// 				headers: { "Content-Type": "application/json" },
// 				body: JSON.stringify(passwords),
// 			});

// 			toast.success("Password updated");
// 			setPasswords({ current: "", new: "" });
// 		} catch {
// 			toast.error("Failed to update password");
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return (
// 		<div className="sm:bg-card sm:border border-border rounded-xl sm:p-6 mt-10">
// 			<h3 className="font-semibold mb-4">Change Password</h3>

// 			<div className="space-y-3">
// 				<input
// 					type="password"
// 					placeholder="Current password"
// 					value={passwords.current}
// 					onChange={(e) =>
// 						setPasswords({ ...passwords, current: e.target.value })
// 					}
// 					className="w-full p-2 bg-input border rounded"
// 				/>

// 				<input
// 					type="password"
// 					placeholder="New password"
// 					value={passwords.new}
// 					onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
// 					className="w-full p-2 bg-input border rounded"
// 				/>

// 				<button
// 					onClick={handlePasswordChange}
// 					disabled={loading}
// 					className="px-4 py-2 bg-primary text-white rounded-lg w-full mt-3 hover:opacity-90 disabled:opacity-50"
// 				>
// 					Update Password
// 				</button>
// 			</div>
// 		</div>
// 	);
// }
