"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { projectsData } from "@/data/data";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  useEffect(() => {
    gsap.to(".project-card", {
      opacity: 1,
      y: 10,
      stagger: 0.8,
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
      className="section min-h-screen flex flex-col items-center justify-evenly font-mono px-4 transition-all duration-600 ease-in-out"
      id="projects">
      <h2 className="reveal-text text-4xl md:text-6xl font-bold mb-8 text-white opacity-0 project-card">
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 w-full max-w-6xl cursor-pointer">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="project-card bg-white p-4 md:p-6 rounded-lg shadow-lg opacity-0 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-110 cursor-pointer">
            <Link href={project.url} target="_blank">
              {" "}
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={300}
                className="mb-4 rounded w-full h-48 object-cover"
              />
              <div className="flex flex-row justify-between items-start transition-colors duration-300 ease-in-out hover:text-blue-600">
                {" "}
                <h3 className="text-2xl font-bold mb-2 ">{project.title}</h3>
                <h2 className="text-lg md:text-ellipsis flex items-center gap-2">
                  <span>-</span>
                  {project.frameWork}
                </h2>
              </div>
              <p className="text-sm md:text-base">{project.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
