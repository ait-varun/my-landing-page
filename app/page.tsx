"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

import Header from "@/components/header";
import About from "@/components/about";
import Education from "@/components/education";
import Projects from "@/components/projects";
import Experience from "@/components/experience";
import Contact from "@/components/contact";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1500);
    });

    gsap.ticker.lagSmoothing(0);

    // function raf(time: number) {
    //   lenis.raf(time);
    //   requestAnimationFrame(raf);
    // }

    // requestAnimationFrame(raf);

    // Section color transitions
    const sections = document.querySelectorAll(".section");
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () =>
          gsap.to("body", { backgroundColor: getColor(index), duration: 0.8 }),
        onEnterBack: () =>
          gsap.to("body", { backgroundColor: getColor(index), duration: 0.8 }),
      });
    });

    function getColor(index: number) {
      const colors = [
        "#ffffff",
        "#000000",
        "#ffffff",
        "#000000",
        "#ffffff",
        "#000000",
      ];
      return colors[index % colors.length];
    }

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Header />
      <About />
      <Education />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
