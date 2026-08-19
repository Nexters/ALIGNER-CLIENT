import { useMutation } from "@tanstack/react-query";
import { membersApi } from "@/shared/api";

export function useWithdrawMember() {
  return useMutation<void, unknown, void>({
    mutationFn: async () => {
      await membersApi.withdraw();
    },
  });
}
