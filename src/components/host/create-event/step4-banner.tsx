"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";
import type { UseFormReturn } from "react-hook-form";
import type { CreateEventInput } from "@/lib/validations/host";

interface Step4Props {
	form: UseFormReturn<CreateEventInput>;
}

export function Step4Banner({ form }: Step4Props) {
	const { setValue, watch } = form;
	const bannerUrl = watch("bannerImageUrl");
	const [uploading, setUploading] = useState(false);
	const [preview, setPreview] = useState<string | null>(bannerUrl ?? null);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFile = async (file: File) => {
		setPreview(URL.createObjectURL(file));
		setUploading(true);
		try {
			const url = await uploadToCloudinary(file);
			setValue("bannerImageUrl", url);
			setPreview(url);
		} finally {
			setUploading(false);
		}
	};

	const clear = () => {
		setPreview(null);
		setValue("bannerImageUrl", "");
		if (inputRef.current) inputRef.current.value = "";
	};

	return (
		<div className="space-y-4">
			<label className="block text-sm font-semibold mb-2">Event Banner</label>

			{preview ? (
				<div className="relative rounded-2xl overflow-hidden border border-border aspect-video">
					<Image src={preview} alt="Banner" fill className="object-cover" />
					{uploading && (
						<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
							<span className="text-white text-sm font-medium">
								Uploading...
							</span>
						</div>
					)}
					{!uploading && (
						<button
							type="button"
							onClick={clear}
							className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition"
						>
							<X size={14} />
						</button>
					)}
				</div>
			) : (
				<label className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-muted/30 p-12 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all aspect-video">
					<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
						<ImagePlus size={24} />
					</div>
					<div className="text-center">
						<p className="font-medium text-foreground">Upload banner image</p>
						<p className="text-xs text-muted-foreground mt-1">
							PNG, JPG up to 5MB — recommended 1200×630
						</p>
					</div>
					<input
						ref={inputRef}
						type="file"
						accept="image/png,image/jpeg,image/jpg,image/webp"
						className="hidden"
						onChange={(e) => {
							const f = e.target.files?.[0];
							if (f) handleFile(f);
						}}
					/>
				</label>
			)}
		</div>
	);
}
