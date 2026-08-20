import { useQuery } from "@tanstack/react-query";
import { membersApi } from "@/shared/api";
import { memberQueryKeys, type Member } from "./member";

export function useMemberProfile(options?: { enabled?: boolean }) {
  return useQuery<Member>({
    queryKey: memberQueryKeys.me,
    queryFn: async () => {
      const response = await membersApi.getMyProfile();
      return response.data;
    },
    enabled: options?.enabled,
  });
}
