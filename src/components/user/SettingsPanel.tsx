"use client";

import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";

export function SettingsPanel({
	profile,
}: {
	profile: {
		fullName: string;
		email: string;
		phone: string | null;
		university: string | null;
		kycStatus: string | null;
		avatarUrl?: string | null;
	};
}) {
	const [form, setForm] = useState({
		fullName: profile.fullName,
		phone: profile.phone || "",
		university: profile.university || "",
	});

	const [avatar, setAvatar] = useState<File | null>(null);
	const [kycFile, setKycFile] = useState<File | null>(null);

	const [passwords, setPasswords] = useState({
		current: "",
		new: "",
	});

	const [loading, setLoading] = useState(false);

	// 🔥 Save profile
	const handleSave = async () => {
		setLoading(true);
		try {
			let avatarUrl = profile.avatarUrl;

			// upload avatar if selected
			if (avatar) {
				avatarUrl = await uploadToCloudinary(avatar);
			}

			await fetch("/api/user/update-profile", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...form,
					avatarUrl,
				}),
			});

			toast.success("Profile updated");
		} catch {
			toast.error("Failed to update");
		} finally {
			setLoading(false);
		}
	};

	// 🔥 Upload KYC
	const handleKycUpload = async () => {
		if (!kycFile) return;

		setLoading(true);
		try {
			const url = await uploadToCloudinary(kycFile);

			await fetch("/api/user/upload-kyc", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					documentUrl: url,
				}),
			});

			toast.success("KYC uploaded");
		} catch {
			toast.error("Upload failed");
		} finally {
			setLoading(false);
		}
	};

	// 🔥 Change password
	const handlePasswordChange = async () => {
		if (!passwords.new) {
			return toast.error("Enter new password");
		}

		setLoading(true);
		try {
			await fetch("/api/user/change-password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(passwords),
			});

			toast.success("Password updated");
			setPasswords({ current: "", new: "" });
		} catch {
			toast.error("Failed to update password");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 max-w-3xl max-sm:pb-20 overflow-x-hidden">
			{/* PROFILE */}
			<div className="sm:bg-card sm:border border-border rounded-xl sm:p-6">
				<h3 className="font-semibold mb-4">Profile</h3>

				<div className="space-y-5 text-sm">
					{/* Avatar */}
					{/* <div className="flex items-center gap-4">
						<div className="w-14 h-14 min-w-14 rounded-xl overflow-hidden bg-muted">
							{profile.avatarUrl ? (
								<Image
									src={profile.avatarUrl}
									width={56}
									height={56}
									alt="avatar"
									className="object-cover w-full h-full"
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center text-muted-foreground">
									?
								</div>
							)}
						</div>

						<input
							type="file"
							onChange={(e) => setAvatar(e.target.files?.[0] || null)}
						/>
					</div> */}

					<div className="flex items-center gap-4">
						<div className="w-14 h-14 rounded-xl overflow-hidden bg-muted">
							{profile.avatarUrl ? (
								<Image
									src={profile.avatarUrl}
									width={56}
									height={56}
									alt="avatar"
									className="object-cover w-full h-full"
								/>
							) : (
								<div className="text-center flex items-center justify-center h-full text-xs">
									No <br /> Image
								</div>
							)}
						</div>

						<label className="cursor-pointer">
							<input
								type="file"
								accept="image/png, image/jpeg, image/jpg"
								className="hidden"
								onChange={(e) => setAvatar(e.target.files?.[0] || null)}
							/>

							<span className="px-3 py-2 border rounded-lg text-sm hover:bg-muted">
								Choose Image
							</span>
						</label>
					</div>

					<p>
						<strong>Email:</strong> {profile.email}
					</p>

					<input
						value={form.fullName}
						onChange={(e) => setForm({ ...form, fullName: e.target.value })}
						className="w-full p-2 bg-input border rounded"
					/>

					<input
						value={form.phone}
						onChange={(e) => setForm({ ...form, phone: e.target.value })}
						className="w-full p-2 bg-input border rounded"
					/>

					<input
						value={form.university}
						onChange={(e) => setForm({ ...form, university: e.target.value })}
						className="w-full p-2 bg-input border rounded"
					/>

					<button
						onClick={handleSave}
						className="px-4 py-2 bg-primary text-white rounded-lg w-full mt-3 hover:opacity-90 disabled:opacity-50"
					>
						{loading ? "Saving..." : "Save Changes"}
					</button>
				</div>
			</div>

			{/* KYC + PASSWORD */}
			<div className="space-y-6 ">
				{/* KYC */}
				<div className="space-y-3">
					<p className="text-xs text-muted-foreground">
						Upload a valid <b>School ID</b> or <b>NIN slip</b>
						<br />
						Allowed: JPG, JPEG, PNG
					</p>

					<label className="block cursor-pointer">
						<input
							type="file"
							accept="image/png, image/jpeg, image/jpg"
							className="hidden"
							onChange={(e) => setKycFile(e.target.files?.[0] || null)}
						/>

						<div className="border border-dashed rounded-lg p-4 text-center hover:bg-muted text-sm">
							{kycFile ? kycFile.name : "Click to select KYC document"}
						</div>
					</label>

					<button
						onClick={handleKycUpload}
						className="px-4 py-2 bg-primary text-white rounded-lg w-full mt-3 hover:opacity-90 disabled:opacity-50"
					>
						Upload KYC
					</button>
				</div>
				{/* <div className="sm:bg-card sm:border border-border rounded-xl sm:p-6">
					<h3 className="font-semibold mb-4">KYC Verification</h3>

					<p className="mb-3 text-sm">
						Status:{" "}
						<span className="text-primary capitalize">{profile.kycStatus}</span>
					</p>

					<input
						type="file"
						onChange={(e) => setKycFile(e.target.files?.[0] || null)}
						className="mb-3 w-full"
					/>

					<button
						onClick={handleKycUpload}
						className="px-4 py-2 bg-primary text-white rounded w-full"
					>
						Upload Document
					</button>
				</div> */}

				{/* PASSWORD */}
				<div className="sm:bg-card sm:border border-border rounded-xl sm:p-6 mt-10">
					<h3 className="font-semibold mb-4">Change Password</h3>

					<div className="space-y-3">
						<input
							type="password"
							placeholder="Current password"
							value={passwords.current}
							onChange={(e) =>
								setPasswords({ ...passwords, current: e.target.value })
							}
							className="w-full p-2 bg-input border rounded"
						/>

						<input
							type="password"
							placeholder="New password"
							value={passwords.new}
							onChange={(e) =>
								setPasswords({ ...passwords, new: e.target.value })
							}
							className="w-full p-2 bg-input border rounded"
						/>

						<button
							onClick={handlePasswordChange}
							className="px-4 py-2 bg-primary text-white rounded-lg w-full mt-3 hover:opacity-90 disabled:opacity-50"
						>
							Update Password
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
