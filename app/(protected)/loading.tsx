"use client";

import { PulseLoader } from "react-spinners";

export default function LoadingProtected() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <PulseLoader color="#6d28d9" loading={true} />
    </div>
  );
}
