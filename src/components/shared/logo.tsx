"use client";

import Link from "next/link";
// import { Sparkles } from "lucide-react";
import Image from "next/image";

interface LogoProps {
	size?: "sm" | "md" | "lg";
	href?: string;
	showText?: boolean;
}

export function Logo({ size = "md", href = "/" }: LogoProps) {
	const sizeClasses = {
		sm: "w-12 h-12",
		md: "w-16 h-16",
		lg: "w-20 h-20",
	};

	// const textSizeClasses = {
	// 	sm: "text-lg",
	// 	md: "text-xl",
	// 	lg: "text-2xl",
	// };

	const content = (
		<div className="flex items-center gap-2">
			{/* Logo Icon - Replace with your own image */}
			<div
				className={`${sizeClasses[size]} flex items-center justify-center shrink-0`}
			>
				{/* Option 1: Using Lucide Icon (default) */}
				{/* <Sparkles className="text-white" size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} /> */}

				{/* Option 2: Replace with Image - uncomment and use: */}
				<Image
					height={100}
					width={100}
					loading="eager"
					src="/logos/logo.svg"
					alt="Univibes"
					className="w-full h-full object-contain"
				/>
			</div>

			{/* Logo Text */}
			{/* {showText && (
        <span className={`font-bold text-foreground ${textSizeClasses[size]}`}>
          Univibes
        </span>
      )} */}
		</div>
	);

	if (href) {
		return <Link href={href}>{content}</Link>;
	}

	return content;
}
