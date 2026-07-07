import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionOverview() {
  return (
    <Accordion type="single" collapsible className="w-full z-50">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          1. What does the Startup Overview page show?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            A yearly snapshot of the Hungarian startup ecosystem: sector
            breakdown, funding trends, and the list of currently active
            startups.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          2. Why aren&apos;t the numbers the same in the tables?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            The &quot;Companies by Sector&quot; table covers the year 2024,
            while the list of active startups covers the entire startup
            ecosystem. Discrepancies may arise due to differences in the year of
            founding or the availability of financial reports.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          3. What does “Companies by sector” mean?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Active companies grouped by their primary sector. Each bar&apos;s
            length is relative to the largest sector for that year.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>4. What do the funding trends show?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Aggregate funding raised by Hungarian startups over time, so you can
            see how investment volume evolves year over year.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>
          5. Which startups count as “active”?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>Companies that have an active tax ID number.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>6. Where does the data come from?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Publicly reported data from official sources (Hungarian Company
            Registry, Dealroom, Opten), curated and verified by the Hungarian
            Innovation Agency (NIÜ).
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
