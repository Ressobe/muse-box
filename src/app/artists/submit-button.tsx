"use client";

import { Button } from "@/src/components/ui/button";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  text: string;
};

export function SubmitButton({ text }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="sm" variant="outline" disabled={pending}>
      {text}
    </Button>
  );
}
