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
      text: "Bachelor's Degree in Electrical Engineering from Baddi University.",
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
      className="section min-h-screen flex flex-col items-center justify-center text-black font-mono px-4 text-center"
      id="education">
      <h2 className="reveal-text text-4xl md:text-6xl font-bold mb-4">
        Education
      </h2>
      <p className="typing-text text-2xl md:text-4xl font-mono"></p>
      <div className="mt-8 space-y-4">
        <p className="reveal-text text-lg md:text-2xl font-mono">
          Senior Secondary School Certification in Non-Medical from Gurukul
          Public School (2011)
        </p>
      </div>
    </section>
  );
}
