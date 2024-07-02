"use client";

import { logoutAction } from "@/actions/logout";
import { Button } from "@/components/ui/button";

type LogoutButtonProps = {
  children?: React.ReactNode;
};

export function LogoutButton({ children }: LogoutButtonProps) {
  const handleClick = () => {
    logoutAction();
  };
  return (
    <Button
      onClick={handleClick}
      className="hover:cursor-pointer transform transition-all active:scale-110"
    >
      {children}
    </Button>
  );
}
