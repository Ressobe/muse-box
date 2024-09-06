import { BasicPlan } from "@/components/pricing/basic-plan";
import { ProPlan } from "@/components/pricing/pro-plan";

export function Pricing() {
  const benefits = [
    "Unlimited Cards",
    "Unlimited Boards",
    "Store larger files, up to 250 MB each",
    "Streamline your workflow with saved searches",
  ];

  const missing = ["Store larger files, up to 1 GB each"];

  return (
    <section className="w-full flex items-center justify-center">
      <div className="grid grid-cols-2 gap-x-6">
        <BasicPlan price={29} benefits={benefits} missing={missing} />
        <ProPlan price={99} benefits={benefits} missing={missing} />
      </div>
    </section>
  );
}
