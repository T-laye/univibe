import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export const metadata: Metadata = {
	title: "Univibes - Discover Events",
	description:
		"Discover and join university events. Connect with your campus community.",
	generator: "v0.app",
	// viewport: {
	//   width: 'device-width',
	//   initialScale: 1,
	//   maximumScale: 1,
	//   userScalable: false,
	// },
	icons: {
		icon: [
			{
				url: "/logos/favicon-32x32.png",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/logos/favicon-32x32.png",
				media: "(prefers-color-scheme: dark)",
			},
			{
				url: "/logos/favicon.svg",
				type: "image/svg+xml",
			},
		],
		apple: "/logos/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			data-scroll-behavior="smooth"
			lang="en"
			className="dark bg-background"
		>
			<body className="antialiased bg-background text-foreground flex flex-col min-h-screen">
				<Providers>
					<div className="flex-1">{children}</div>
					{/* <Toaster theme="dark" position="top-right" richColors /> */}
					{/* {process.env.NODE_ENV === "production" && <Analytics />} */}
				</Providers>
			</body>
		</html>
	);
}
