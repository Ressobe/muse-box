"use client";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
};

export function SubmitButton({
  children,
  className,
  disabled,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      className={className}
      type="submit"
      size="sm"
      variant="outline"
      disabled={disabled === true ? disabled : pending}
    >
      {children}
    </Button>
  );
}
