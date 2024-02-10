"use client";
import { sendEmail } from "@/actions/sendEmail";
import { useSectionInView } from "@/hooks/hooks";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import SectionHeading from "../ui/section-heading";
import { Textarea } from "../ui/textarea";

const Contact = () => {
  const { ref } = useSectionInView("Contact");
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center pt-20 mt-10"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>Contact Us</SectionHeading>
      <form
        ref={formRef}
        className="flex flex-col gap-2 text-gray-900"
        action={sendEmail}
      >
        <Label className="self-start" htmlFor="senerEmail">
          Your Email
        </Label>
        <Input
          type="email"
          name="senderEmail"
          className="dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none caret-black"
          placeholder="Johndoe@mathbase.com"
        />
        <Label className="self-start" htmlFor="message">
          Message
        </Label>
        <Textarea
          className="dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none min-h-36 caret-black"
          name="message"
        />
      </form>
    </motion.section>
  );
};

export default Contact;
