"use client";
import { useSectionInView } from "@/hooks/hooks";
import { mathSubjects } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const TopicsPreview = () => {
  const { ref } = useSectionInView("Topics");
  return (
    <motion.section
      ref={ref}
      id="topics"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1.5,
      }}
      viewport={{
        once: true,
      }}
    >
      <Card className="w-full mt-20 p-6 rounded-lg shadow-lg shadow-violet-700">
        <CardHeader className="text-white text-2xl font-bold text-center mb-4">
          <CardTitle>Subjects We Cover</CardTitle>
          <CardDescription>
            Explore a variety of math subjects with personalized learning
            experiences tailored to your needs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center"
          >
            {mathSubjects.map((subject, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                whileInView={{}}
                className="bg-violet-700 hover:bg-violet-800 text-white p-4 rounded-lg cursor-pointer transition duration-300"
              >
                {subject}
              </motion.li>
            ))}
          </motion.ul>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default TopicsPreview;
