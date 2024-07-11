"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Education() {
  useEffect(() => {
    // Animation for the first text
    gsap.to(".typing-text", {
      duration: 4,
      text: "Bachelor's Degree in Electrical Engineering from Baddi University",
      ease: "none",
      stagger: 0.2,
      scrollTrigger: {
        trigger: "#education",
        start: "top center",
        toggleActions: "play none none none",
      },
    });

    // Animation for the second text
    gsap.to(".secondary-school-text", {
      duration: 4,
      text: "Senior Secondary School Certification in Non-Medical from Gurukul Public School (2011)",
      ease: "none",
      delay: 4,
      scrollTrigger: {
        trigger: ".secondary-school-text",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section
      className="section min-h-screen flex flex-col items-center justify-center text-black font-mono px-4 text-center"
      id="education">
      <h2 className="education-title text-4xl md:text-6xl font-bold mb-4">
        Education
      </h2>
      <p className="typing-text text-2xl md:text-4xl font-mono"></p>
      <div className="mt-8 space-y-4">
        <p className="secondary-school-text text-lg md:text-2xl font-mono"></p>
      </div>
    </section>
  );
}
