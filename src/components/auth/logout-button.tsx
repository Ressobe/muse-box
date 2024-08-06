"use client";

import { logoutAction } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type LogoutButtonProps = {
  children?: React.ReactNode;
  className?: string;
};

export function LogoutButton({ children, className }: LogoutButtonProps) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const handleClick = async () => {
    await logoutAction();

    let fullUrl = pathName;
    const params = searchParams.toString();
    if (params) {
      fullUrl += `?${params}`;
    }

    const callbackUrl = encodeURIComponent(fullUrl);
    router.push(`/auth/login?callbackUrl=${callbackUrl}`);
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
