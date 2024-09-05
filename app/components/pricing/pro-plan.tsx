import { ESubscriptionPeriod } from "@/types";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/config";
import Image from "next/image";

type TProPlanProps = {
  price: number;
  benefits?: string[];
  missing?: string[];
  planName?: string;
  subscriptionPeriod?: ESubscriptionPeriod;
  showFloatBanner?: boolean;
  floatBannerLabel?: string;
};

export function ProPlan({
  price,
  benefits,
  missing,
  planName = "Pro",
  subscriptionPeriod = ESubscriptionPeriod.Month,
  showFloatBanner = false,
  floatBannerLabel = "Popular",
}: TProPlanProps) {
  return (
    <div className="relative flex flex-col p-6 bg-primary-foreground shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-purple-500">
      {showFloatBanner && (
        <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {floatBannerLabel}
        </div>
      )}
      <div>
        <h3 className="text-2xl font-bold text-center">{planName}</h3>
        <div className="mt-4 text-center">
          <span className="text-4xl font-bold">${price}</span> /{" "}
          {subscriptionPeriod === ESubscriptionPeriod.Month ? "month" : "year"}
        </div>
        <ul className="mt-4 space-y-2">
          {benefits?.map((item) => {
            return (
              <li key={item} className="flex items-center gap-x-2">
                <Check className="text-green-500 w-10 h-10" />
                <span>{item}</span>
              </li>
            );
          })}
          {missing?.map((item) => {
            return (
              <li key={item} className="flex items-center gap-x-2">
                <X className="text-red-400 w-10 h-10" />
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-6">
        <Button className="w-full flex gap-x-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:brightness-150 transition-all transform active:scale-110">
          <Image src="/rocket.png" width={30} height={30} alt="icon" /> Get Get{" "}
          {APP_NAME}
        </Button>
      </div>
    </div>
  );
}
