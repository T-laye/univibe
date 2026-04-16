"use client";

import { useState } from "react";
import { ProfileSection } from "./Profile";
import { KycSection } from "./Kyc";
import { PasswordSection } from "./Password";

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
	const [loading, setLoading] = useState(false);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 max-w-3xl max-sm:pb-20 overflow-x-hidden mx-auto">
			<ProfileSection
				profile={profile}
				loading={loading}
				setLoading={setLoading}
			/>

			<div className="space-y-6">
				<KycSection
					profile={profile}
					loading={loading}
					setLoading={setLoading}
				/>

				<PasswordSection loading={loading} setLoading={setLoading} />
			</div>
		</div>
	);
}
