/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Combobox } from "../../ui/combobox";
import { schools } from "../../../lib/contents";
import { useUpload } from "@/hooks/use-upload";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/services/query-keys";
import { userService } from "@/services/user.service";

export function ProfileSection({ profile }: any) {
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(false);

	const [form, setForm] = useState({
		fullName: profile.fullName,
		phone: profile.phone || "",
		university: profile.university || "",
	});

	const avatar = useUpload(profile.avatarUrl);

	const handleSave = async () => {
		setLoading(true);
		try {
			// 🔥 optimistic update
			queryClient.setQueryData(queryKeys.user.profile, (old: any) => ({
				...old,
				...form,
				avatarUrl: avatar.preview,
			}));

			let avatarUrl = profile.avatarUrl;

			if (avatar.file) {
				avatarUrl = await avatar.upload();
			}

			await userService.updateProfile({
				fullName: form.fullName,
				phone: form.phone,
				university: form.university,
				avatarUrl,
			});

			// console.log(res);

			queryClient.invalidateQueries({
				queryKey: queryKeys.user.profile,
			});
			queryClient.invalidateQueries({
				queryKey: ["user-dashboard"],
			});
			// 🔥 ensure server truth
			window.location.reload();

			toast.success("Profile updated");
		} catch (err: any) {
			toast.error(err.message);
			setLoading(false);
			// rollback
			queryClient.invalidateQueries({
				queryKey: queryKeys.user.profile,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="sm:bg-card sm:border border-border rounded-xl sm:p-6">
			<h3 className="font-semibold mb-4">Profile</h3>

			<div className="space-y-5 text-sm">
				{/* Avatar */}
				<div className="flex items-center gap-4">
					<div className="w-14 h-14 rounded-xl overflow-hidden bg-muted">
						{avatar.preview ? (
							<Image
								src={avatar.preview ?? profile.avatarUrl}
								width={56}
								height={56}
								alt="avatar"
								className="object-cover w-full h-full"
							/>
						) : (
							<div className="flex items-center justify-center h-full">?</div>
						)}
					</div>

					<input
						type="file"
						className="hidden"
						id="avatar"
						onChange={(e) => avatar.selectFile(e.target.files?.[0] || null)}
					/>

					<label
						htmlFor="avatar"
						className="px-3 py-2 border rounded-lg cursor-pointer"
					>
						Choose Image
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

				<Combobox
					options={schools.map((s) => ({
						label: s.name,
						value: s.name,
					}))}
					value={form.university}
					onValueChange={(v) => setForm({ ...form, university: v })}
				/>

				<button
					onClick={handleSave}
					disabled={loading}
					className="px-4 py-2 bg-primary text-white rounded-lg w-full mt-3 hover:opacity-90 disabled:opacity-50"
				>
					{loading ? "Saving..." : "Save"}
				</button>
			</div>
		</div>
	);
}
