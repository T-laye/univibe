import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { queryKeys } from "@/services/query-keys";

export function useUserProfile() {
	return useQuery({
		queryKey: queryKeys.user.profile,
		queryFn: userService.getProfile,
	});
}
