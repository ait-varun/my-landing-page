"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Education() {
  useEffect(() => {
    gsap.to(".typing-text", {
      duration: 5,
      text: "Bachelor's Degree in Computer Science from XYZ University.",
      ease: "none",
      scrollTrigger: {
        trigger: "#education",
        start: "top center",
        end: "top top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <section
      className="section min-h-screen flex flex-col items-center justify-center text-white font-mono px-4 text-center"
      id="education">
      <h2 className="reveal-text text-4xl md:text-6xl font-bold mb-4">
        Education
      </h2>
      <p className="typing-text text-2xl md:text-4xl font-mono"></p>
      <div className="mt-8 space-y-4">
        <p className="reveal-text text-lg md:text-2xl font-mono">
          Master&apos;s in Web Development - ABC University (2020-2022)
        </p>
        <p className="reveal-text text-lg md:text-2xl font-mono">
          Certification in UI/UX Design - Design Institute (2019)
        </p>
        <p className="reveal-text text-lg md:text-2xl font-mono">
          Bachelor&apos;s in Computer Science - XYZ University (2016-2020)
        </p>
      </div>
    </section>
  );
}
