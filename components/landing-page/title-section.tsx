"use client";
import { useSectionInView } from "@/hooks/hooks";
import logo from "@/public/logo.png";
import { useAnimate } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

const TitleSection = () => {
  const [scope, animate] = useAnimate();
  const { ref } = useSectionInView("Home");

  useEffect(() => {
    if (scope.current) {
      const handleAnimation = async () => {
        // Start logo animation slightly before the text
        const logoAnimationPromise = animate(
          "#logo",
          {
            opacity: [0, 1],
            scale: [0.5, 1], // Add a subtle scale effect for the logo
          },
          {
            duration: 1.2, // Slightly longer duration for a smoother effect
            ease: "easeInOut", // This easing function can make the animation feel more natural
          }
        );

        // Delay the start of the title animation so it overlaps with the logo's
        const titleAnimationPromise = animate(
          "h1",
          {
            opacity: [0, 1],
            x: [-50, 0], // Keeping your original animation but making sure it's synced well with the logo
          },
          {
            delay: 0.2, // Short delay to allow the logo to start appearing first
            duration: 1, // Similar duration to the logo for cohesion
            ease: "easeIn",
          }
        );

        // Wait for both animations to complete
        await Promise.all([logoAnimationPromise, titleAnimationPromise]);
      };

      handleAnimation();
    }
  }, [scope, animate]);

  return (
    <>
      <div className="absolute top-0" id="home"></div>
      <section ref={ref} aria-labelledby="main-title" className="mt-20">
        <header className="flex flex-col gap-2">
          <div
            ref={scope}
            className="flex flex-row items-center justify-center gap-2"
          >
            <Image
              id="logo"
              src={logo}
              alt="App Logo"
              width={80}
              height={80}
              className="rounded-full"
            />
            <h1 className="text-3xl sm:text-4xl font-semibold text-glow">
              Math Base
            </h1>
          </div>

          <p className="text-xl text-muted-foreground mt-8">
            Your all-in-one AI-assisted math learning platform.
          </p>
        </header>
      </section>
    </>
  );
};

export default TitleSection;
