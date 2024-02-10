"use client";

import { useSectionInView } from "@/hooks/hooks";
import { faqData } from "@/lib/data";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const FAQ = () => {
  const { ref } = useSectionInView("FAQ");
  return (
    <section ref={ref} id="faq" className="w-full pt-20 scroll-mb-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 text-center">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((data, index) => (
              <React.Fragment key={index}>
                <AccordionItem value={index.toString()}>
                  <AccordionTrigger>{data.question}</AccordionTrigger>
                  <AccordionContent>{data.answer}</AccordionContent>
                </AccordionItem>
              </React.Fragment>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
