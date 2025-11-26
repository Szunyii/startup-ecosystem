import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionDatabase() {
  return (
    <Accordion type="single" collapsible className="w-full z-50">
      <AccordionItem value="item-1">
        <AccordionTrigger>1. What is the Startup Database?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            A detailed directory of Hungarian startups, including historical
            data and metrics.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          2. How is it different from the Ecosystem map?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Includes more companies and deeper historical data; ecosystem page
            excludes startups, only shows entities who are working in/on the
            Hungarian startup ecosystem.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          3. Can I update my company’s entries?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>Yes. Use the “Join the Startup Database” form below.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          4. Can you list my startup on the page?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Yes. Use the <q>Registration</q> button on the navigation and fill
            out the relevant form. Also, register and list your startup on the
            Dealroom (URL: https://app.dealroom.co/) database. We will not
            upload any data without Dealroom registration and proper profile.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>
          5. Do you publish private or sensitive data?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Only publicly reported data is displayed; no confidential info is
            shared.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
