import { cn } from "@/shared/lib/cn";
import Button from "../base/Button";

type BottomCTAButtonRootProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
  fixed?: boolean;
  background?: "white" | "black" | "none";
};

function BottomCTAButtonRoot({
  children,
  fixed = true,
  background = "none",
  className,
  ...props
}: BottomCTAButtonRootProps) {
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

type SingleBottomCTAButtonProps = React.ComponentProps<typeof Button>;

function SingleBottomCTAButton({ children, ...props }: SingleBottomCTAButtonProps) {
  return <Button {...props}>{children}</Button>;
}

type DoubleBottomCTAButtonProps = {
  leftButton: React.ReactNode;
  rightButton: React.ReactNode;
  className?: string;
};

function DoubleBottomCTAButton({ leftButton, rightButton, className }: DoubleBottomCTAButtonProps) {
  return (
    <div className={cn("flex", className)}>
      {leftButton}
      {rightButton}
    </div>
  );
}

type BottomCTAButtonComponent = typeof BottomCTAButtonRoot & {
  Single: typeof SingleBottomCTAButton;
  Double: typeof DoubleBottomCTAButton;
};

const BottomCTAButton: BottomCTAButtonComponent = Object.assign(BottomCTAButtonRoot, {
  Single: SingleBottomCTAButton,
  Double: DoubleBottomCTAButton,
});

export default BottomCTAButton;
