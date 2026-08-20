import { useState } from "react";
import Modal from "./Modal";

export interface ConfirmOptions {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
}

type ConfirmRequest = {
  options: ConfirmOptions;
  resolve: (confirmed: boolean) => void;
};

/**
 * window.confirm과 같은 방식(`await confirm(...)`)으로 shared/ui의 Modal을 띄운다.
 * 반환된 confirmModal을 트리 어딘가(보통 페이지 최상단)에 한 번 렌더링해두면 된다.
 */
export function useConfirmModal() {
  const [request, setRequest] = useState<ConfirmRequest | null>(null);

  function confirm(options: ConfirmOptions) {
    return new Promise<boolean>((resolve) => {
      setRequest({ options, resolve });
    });
  }

  function close(confirmed: boolean) {
    request?.resolve(confirmed);
    setRequest(null);
  }

  const confirmModal = (
    <Modal
      open={request !== null}
      title={request?.options.title ?? ""}
      description={request?.options.description ?? ""}
      secondaryActionLabel={request?.options.cancelLabel ?? "취소"}
      onSecondaryAction={() => close(false)}
      primaryActionLabel={request?.options.confirmLabel ?? ""}
      onPrimaryAction={() => close(true)}
      onDismiss={() => close(false)}
    />
  );

  return { confirm, confirmModal };
}
