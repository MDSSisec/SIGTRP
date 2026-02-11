"use client"

import { ChevronDown } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

export default function AccordionUsage() {
  return (
    <div className="space-y-2">
      <Collapsible>
        <div className="rounded-md border">
          <CollapsibleTrigger
            className="flex w-full items-center justify-between px-4 py-3 text-left font-medium hover:bg-muted/50 [&[data-state=open]>svg]:rotate-180"
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <span>Accordion 1</span>
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform" />
          </CollapsibleTrigger>
          <CollapsibleContent id="panel1-content">
            <div className="border-t px-4 py-3 text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      <Collapsible>
        <div className="rounded-md border">
          <CollapsibleTrigger
            className="flex w-full items-center justify-between px-4 py-3 text-left font-medium hover:bg-muted/50 [&[data-state=open]>svg]:rotate-180"
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <span>Accordion 2</span>
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform" />
          </CollapsibleTrigger>
          <CollapsibleContent id="panel2-content">
            <div className="border-t px-4 py-3 text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      <Collapsible defaultOpen>
        <div className="rounded-md border">
          <CollapsibleTrigger
            className="flex w-full items-center justify-between px-4 py-3 text-left font-medium hover:bg-muted/50 [&[data-state=open]>svg]:rotate-180"
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <span>Accordion Actions</span>
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform" />
          </CollapsibleTrigger>
          <CollapsibleContent id="panel3-content">
            <div className="border-t px-4 py-3 text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </div>
            <div className="flex justify-end gap-2 border-t px-4 py-2">
              <Button variant="outline" size="sm">Cancel</Button>
              <Button size="sm">Agree</Button>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  )
}
