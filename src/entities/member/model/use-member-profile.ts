import { useQuery } from "@tanstack/react-query";
import { membersApi } from "@/shared/api";
import { memberQueryKeys, type Member } from "./member";

export function useMemberProfile() {
  return useQuery<Member>({
    queryKey: memberQueryKeys.me,
    queryFn: async () => {
      const response = await membersApi.getMyProfile();
      return response.data;
    },
  });
}
