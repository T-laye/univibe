"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { useAuthBootstrap } from "../hooks/auth/use-auth-bootstrap";

// Stable singleton outside the component
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
		},
	},
});

// Separate inner component so it's inside QueryClientProvider
function AuthBootstrap() {
	useAuthBootstrap();
	return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthBootstrap />
			{children}
			<Toaster theme="dark" position="top-right" richColors />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

// "use client";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { Toaster } from "sonner";
// import { useState } from "react";
// import { useAuthBootstrap } from "../hooks/auth/use-auth-bootstrap";

// export function Providers({ children }: { children: React.ReactNode }) {
// 	useAuthBootstrap();

// 	const [queryClient] = useState(
// 		() =>
// 			new QueryClient({
// 				defaultOptions: {
// 					queries: {
// 						staleTime: 60 * 1000,
// 					},
// 				},
// 			}),
// 	);

// 	return (
// 		<QueryClientProvider client={queryClient}>
// 			{children}
// 			<Toaster theme="dark" position="top-right" richColors />
// 			<ReactQueryDevtools initialIsOpen={false} />
// 		</QueryClientProvider>
// 	);
// }
