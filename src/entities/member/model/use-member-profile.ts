import { useQuery } from "@tanstack/react-query";
import { membersApi } from "@/shared/api/http";
import type { Member } from "./member";

export function useMemberProfile() {
  return useQuery<Member>({
    queryKey: ["member", "me"],
    queryFn: async () => {
      const response = await membersApi.getMyProfile();
      return response.data;
    },
  });
}
