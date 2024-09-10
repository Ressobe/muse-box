import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";

const FAQ: {
  question: string;
  answer: string;
}[] = [
  {
    question: "Is Musebox free to use?",
    answer:
      "Yes, Musebox is completely free to use with the option to upgrade for premium features.",
  },
  {
    question: "Can I share music from other platforms?",
    answer: "Absolutely! You can link your tracks from popular music platforms",
  },
  {
    question: "How do I follow my friends?",
    answer:
      "Simply search for your friends profiles and click the 'Follow' button to stay updated on their musical activities",
  },
];

export function Faq() {
  return (
    <section className="flex w-full justify-between py-20">
      <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
      <Accordion type="multiple" className="w-3/5">
        {FAQ.map((item, idx) => {
          return (
            <AccordionItem key={item.question} value={`item-${idx + 1}`}>
              <AccordionTrigger className="data-[state=open]:text-indigo-400">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}
