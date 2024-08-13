"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { UserNewAvatar } from "./user-new-avatar";
import { FaUser } from "react-icons/fa";
import { cn } from "@/lib/utils";

type UserProfileAvatarProps = {
  canEdit: boolean;
  avatarUrl?: string | null;
  className?: string;
};

export function UserProfileAvatar({
  canEdit,
  avatarUrl,
  className,
}: UserProfileAvatarProps) {
  const [modalOpen, setModalOpen] = useState(false);

  if (!canEdit) {
    return (
      <div className="relative w-fit mb-10">
        <Avatar className={cn("h-40 w-40", className)}>
          <AvatarImage src={avatarUrl || ""} />
          <AvatarFallback>
            <FaUser className="w-20 h-20" />
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }

  return (
    <div className="relative w-fit mb-10">
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <Avatar className={cn("h-40  w-40", className)}>
          <AvatarImage src={avatarUrl || ""} />
          <AvatarFallback>
            <FaUser className="w-20 h-20" />
          </AvatarFallback>
        </Avatar>
        <DialogTrigger asChild>
          <button
            onClick={() => setModalOpen(true)}
            className="absolute -bottom-3 left-[40%] w-8 h-8 bg-muted p-2 rounded-full border border-muted-foreground hover:opacity-80 transition-all"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <UserNewAvatar closeModal={() => setModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
