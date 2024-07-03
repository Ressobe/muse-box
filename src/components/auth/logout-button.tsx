"use client";

import { logoutAction } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LogoutButtonProps = {
  children?: React.ReactNode;
  className?: string;
};

export function LogoutButton({ children, className }: LogoutButtonProps) {
  const handleClick = () => {
    logoutAction();
  };
  return (
    <Button
      onClick={handleClick}
      className={cn(
        "hover:cursor-pointer transform transition-all active:scale-110",
        className,
      )}
    >
      {children}
    </Button>
  );
}
