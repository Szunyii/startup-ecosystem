import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionEcosystem() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          1. What is the Startup Ecosystem page?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            It is a matchmaking platform for startups that helps them connect
            with members of the ecosystem in specific categories.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          2. What data is shown for ecosystem player?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            how many companies there are in each category and which ones they
            are.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>3. Where is the data sourced from?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Official sources: Hungarian Company Registry, Dealroom, official
            webpages of the entities.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          4. Can you list my entity on the Startup Ecosystem webpage?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Yes. Use the <q>Registration</q> button on the navigation and fill
            out the relevant form.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>5. Who verifies the data?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Data is verified by our team (Hungarian Innovation Agency) using
            publicly available sources.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
