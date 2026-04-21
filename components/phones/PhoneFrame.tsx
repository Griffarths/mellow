import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function PhoneFrame({ children, className = "" }: Props) {
  return (
    <div
      className={`phone-frame relative mx-auto aspect-[9/19] w-full max-w-[320px] ${className}`}
    >
      <div className="absolute inset-[6px] overflow-hidden rounded-[42px] bg-white">
        {children}
      </div>
    </div>
  );
}
