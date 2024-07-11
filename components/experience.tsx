"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Experience() {
  useEffect(() => {
    // Animation for the first text
    gsap.to(".first-text", {
      duration: 4,
      text: "Web Developer In Analytic It Services (2023-Present)",
      ease: "none",
      scrollTrigger: {
        trigger: "#experience",
        start: "top center",
        toggleActions: "play none none none",
      },
    });

    // Animation for the second text
    gsap.to(".second-text", {
      duration: 4,
      text: "Web Designer In Toxsl Technology Pvt. Ltd. (2022-2023) (Intern)",
      ease: "none",
      delay: 4,
      scrollTrigger: {
        trigger: ".second-text",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);
  return (
    <section
      className="section min-h-screen flex flex-col items-center justify-center font-mono px-4 text-center"
      id="experience">
      <h2 className="reveal-text text-4xl md:text-6xl font-extrabold mb-8">
        Work Experience
      </h2>
      <p className="first-text text-lg md:text-2xl"></p>
      <p className="second-text text-lg md:text-2xl mt-4"></p>
    </section>
  );
}
