"use client";

import { useSectionInView } from "@/hooks/hooks";
import { features } from "@/lib/data";
import { motion } from "framer-motion";
import SectionHeading from "../ui/section-heading";
import Feature from "./feature";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Child variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Features = () => {
  const { ref } = useSectionInView("About");
  return (
    <motion.section
      id="about"
      ref={ref}
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
      className="flex flex-col justify-center items-center mb-20 sm:mb-28 w-[min(100%,38rem)] text-center pt-20 mt-20"
    >
      <SectionHeading className="">Why Math Base?</SectionHeading>
      <motion.ul
        className="grid grid-cols-1 gap-2 sm:grid-cols-2  w-full items-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {features.map((feature, index) => (
          <motion.li variants={itemVariants} key={index}>
            <Feature {...feature} />
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
};

export default Features;
