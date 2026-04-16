/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/services/query-keys";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export function KycSection({ profile, loading, setLoading }: any) {
	const queryClient = useQueryClient();
	const [kycFile, setKycFile] = useState<File | null>(null);
	const [kycPreview, setKycPreview] = useState<string | null>(
		profile?.kycDocumentUrl || null,
	);

	const handleFileChange = (file: File | null) => {
		if (!file) return;
		setKycFile(file);
		setKycPreview(URL.createObjectURL(file));
	};

	const handleUpload = async () => {
		if (!kycFile) {
			toast.error("Select a file first");
			return;
		}

		setLoading(true);

		try {
			const supabase = getSupabaseBrowserClient();
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (!session?.access_token) throw new Error("Not authenticated");

			const formData = new FormData();
			formData.append("file", kycFile);

			const res = await fetch("/api/user/kyc", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${session.access_token}`,
				},
				body: formData,
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.error);

			toast.success("KYC uploaded");
			setKycPreview(data.documentUrl);

			await queryClient.invalidateQueries({
				queryKey: queryKeys.user.profile,
			});
		} catch (err: any) {
			toast.error(err.message || "Upload failed");
		} finally {
			setLoading(false);
		}
	};

	// console.log("kyc", profile);

	return (
		<div className="sm:bg-card sm:border border-border rounded-xl sm:p-6">
			<h3 className="font-semibold mb-4">KYC Verification</h3>

			<p className="text-sm mb-2">
				Status:{" "}
				<span
					className={`${profile?.kycStatus === "pending" ? "text-primary" : "text-green-600"} capitalize`}
				>
					{profile?.kycStatus || ""}
				</span>
			</p>

			{!profile?.kycDocumentUrl && (
				<label className="block cursor-pointer">
					<input
						type="file"
						accept="image/png, image/jpeg, image/jpg, application/pdf"
						className="hidden"
						onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
					/>
					<div className="border border-dashed rounded-lg p-4 text-center text-sm hover:bg-muted">
						{kycFile ? kycFile.name : "Click to upload KYC document"}
					</div>
				</label>
			)}

			{(kycPreview || profile?.kycDocumentUrl) && (
				<div className="mt-3">
					<Image
						src={kycPreview || profile?.kycDocumentUrl}
						alt="KYC Preview"
						width={300}
						height={200}
						loading="eager"
						className="rounded-lg"
					/>
				</div>
			)}

			{!profile?.kycDocumentUrl && (
				<button
					onClick={handleUpload}
					disabled={loading}
					className="px-4 py-2 bg-primary text-white rounded-lg w-full mt-3 disabled:opacity-50"
				>
					{loading ? "Uploading..." : "Upload Document"}
				</button>
			)}
		</div>
	);
}
