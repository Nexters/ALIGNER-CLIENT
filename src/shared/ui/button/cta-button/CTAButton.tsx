import { cn } from "@/shared/lib/cn";
import Button from "../base/Button";

type CTAButtonRootProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
  fixed?: boolean;
  background?: "white" | "black" | "none";
};

function CTAButtonRoot({
  children,
  fixed = true,
  background = "none",
  className,
  ...props
}: CTAButtonRootProps) {
  return (
    <div
      className={cn(
        "px-[2rem] py-[1.6rem]",
        fixed ? "fixed-center bottom-0" : "mt-auto",
        background === "white" ? "bg-white" : undefined,
        background === "black" ? "bg-black" : undefined,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type SingleCTAButtonProps = React.ComponentProps<typeof Button>;

function SingleCTAButton({ children, ...props }: SingleCTAButtonProps) {
  return <Button {...props}>{children}</Button>;
}

type DoubleCTAButtonProps = {
  leftButton: React.ReactNode;
  rightButton: React.ReactNode;
  className?: string;
};

function DoubleCTAButton({ leftButton, rightButton, className }: DoubleCTAButtonProps) {
  return (
    <div className={cn("flex gap-[1.6rem]", className)}>
      {leftButton}
      {rightButton}
    </div>
  );
}

type CTAButtonComponent = typeof CTAButtonRoot & {
  Single: typeof SingleCTAButton;
  Double: typeof DoubleCTAButton;
};

const CTAButton: CTAButtonComponent = Object.assign(CTAButtonRoot, {
  Single: SingleCTAButton,
  Double: DoubleCTAButton,
});

export default CTAButton;
