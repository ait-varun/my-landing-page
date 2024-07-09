"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  useEffect(() => {
    gsap.to(".project-card", {
      opacity: 1,
      y: 10,
      stagger: 0.2,
      duration: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#projects",
        start: "top center",
        end: "top 20%",
        scrub: 0.8,
      },
    });
  }, []);

  return (
    <section
      className="section min-h-screen flex flex-col items-center justify-evenly font-mono px-4"
      id="projects">
      <h2 className="reveal-text text-4xl md:text-6xl font-bold mb-8">
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="project-card bg-white p-4 md:p-6 rounded-lg shadow-lg opacity-0">
          <Image
            src="https://picsum.photos/400/300?random=1"
            alt="Project A"
            width={400}
            height={300}
            className="mb-4 rounded w-full h-48 object-cover"
          />
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Project A</h3>
          <p className="text-sm md:text-base">
            A responsive web application built with React and Next.js.
          </p>
        </div>
        <div className="project-card bg-white p-4 md:p-6 rounded-lg shadow-lg opacity-0">
          <Image
            src="https://picsum.photos/400/300?random=2"
            alt="Project B"
            width={400}
            height={300}
            className="mb-4 rounded w-full h-48 object-cover"
          />
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Project B</h3>
          <p className="text-sm md:text-base">
            An e-commerce platform developed using Vue.js and Nuxt.
          </p>
        </div>
        <div className="project-card bg-white p-4 md:p-6 rounded-lg shadow-lg opacity-0">
          <Image
            src="https://picsum.photos/400/300?random=3"
            alt="Project A"
            width={400}
            height={300}
            className="mb-4 rounded w-full h-48 object-cover"
          />
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Project C</h3>
          <p className="text-sm md:text-base">
            A landing page for a new startup.
          </p>
        </div>
        <div className="project-card bg-white p-4 md:p-6 rounded-lg shadow-lg opacity-0">
          <Image
            src="https://picsum.photos/400/300?random=4"
            alt="Project B"
            width={400}
            height={300}
            className="mb-4 rounded w-full h-48 object-cover"
          />
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Project D</h3>
          <p className="text-sm md:text-base">
            A html template for a new website.
          </p>
        </div>
      </div>
    </section>
  );
}
