"use client";

import { useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";

export function useUpload(initialUrl?: string | null) {
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(initialUrl || null);
	const [uploading, setUploading] = useState(false);

	const selectFile = (file: File | null) => {
		if (!file) return;

		const url = URL.createObjectURL(file);
		setFile(file);
		setPreview(url);
	};

	const upload = async () => {
		if (!file) return preview;

		setUploading(true);
		try {
			const url = await uploadToCloudinary(file);
			setPreview(url);
			setFile(null);
			return url;
		} finally {
			setUploading(false);
		}
	};

	return {
		file,
		preview,
		uploading,
		selectFile,
		upload,
	};
}
