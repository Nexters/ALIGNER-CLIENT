import { useMutation, useQueryClient } from "@tanstack/react-query";
import { membersApi } from "@/shared/api/http";
import type { UpdateMemberProfileRequest } from "@/shared/api/generated/data-contracts";
import { memberQueryKeys, type Member } from "./member";

export function useUpdateMemberProfile() {
  const queryClient = useQueryClient();

  return useMutation<Member, unknown, UpdateMemberProfileRequest>({
    mutationFn: async (data) => {
      const response = await membersApi.updateMyProfile(data);
      return response.data;
    },
    onSuccess: (member) => {
      queryClient.setQueryData(memberQueryKeys.me, member);
    },
  });
}
