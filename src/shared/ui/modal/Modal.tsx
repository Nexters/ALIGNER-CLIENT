import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/shared/lib/cn";

export interface ModalProps {
  open: boolean;
  title: string;
  description: string;
  secondaryActionLabel: string;
  onSecondaryAction: () => void;
  primaryActionLabel: string;
  onPrimaryAction: () => void;
  /** 오버레이 클릭 또는 Esc로 닫으려 할 때 호출된다. 넘기지 않으면 오버레이/Esc로 닫히지 않는다 */
  onDismiss?: () => void;
  className?: string;
}

export default function Modal({
  open,
  title,
  description,
  secondaryActionLabel,
  onSecondaryAction,
  primaryActionLabel,
  onPrimaryAction,
  onDismiss,
  className,
}: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onDismiss?.();
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onDismiss]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-[2rem]">
      <div aria-hidden="true" onClick={onDismiss} className="absolute inset-0 bg-overlay-dim" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative flex w-full min-w-[32rem] max-w-[40rem] flex-col overflow-hidden rounded-[1.6rem] bg-bg-surface",
          className,
        )}
      >
        <div className="flex w-full flex-col gap-[0.8rem] p-[2.8rem] [word-break:break-word]">
          <p id={titleId} className="typo-title-3-emphasized w-full text-ink-strong">
            {title}
          </p>
          <p className="typo-body-regular w-full text-ink-base">{description}</p>
        </div>
        <div className="flex w-full flex-wrap items-start justify-end gap-y-[2.4rem] px-[2.8rem] pb-[2rem]">
          <div className="flex flex-1 items-center gap-[2rem]">
            <button
              type="button"
              onClick={onSecondaryAction}
              className="typo-body-emphasized flex-1 rounded-[0.8rem] bg-border-base p-[1.2rem] text-center text-gray-40"
            >
              {secondaryActionLabel}
            </button>
            <button
              type="button"
              onClick={onPrimaryAction}
              className="typo-body-emphasized flex-1 rounded-[0.8rem] bg-accent-strong p-[1.2rem] text-center text-accent-base"
            >
              {primaryActionLabel}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
