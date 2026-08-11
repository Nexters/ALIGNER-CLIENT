import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto w-full bg-gray-99 min-h-screen max-w-(--container-max-width) px-[2rem]">
      {children}
    </div>
  );
}
