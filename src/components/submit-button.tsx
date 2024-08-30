"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { TailSpin } from "react-loader-spinner";

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
      className={clsx(className, "relative px-8")}
      type="submit"
      size="sm"
      variant="outline"
      disabled={disabled === true ? disabled : pending}
    >
      {pending && (
        <TailSpin
          visible={true}
          height="15"
          width="15"
          color="#6d28d9"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperClass="absolute left-2"
        />
      )}
      {children}
    </Button>
  );
}
