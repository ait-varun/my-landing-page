"use client";
import Marquee from "react-fast-marquee";

export default function TechMarquee() {
  const technologies = [
    "Next.js",
    "React",
    "Nuxt",
    "Vue",
    "Svelte kit",
    "Svelte",
  ];

  return (
    <Marquee pauseOnHover className="py-4">
      <div className="font-mono flex">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="text-xl md:text-3xl font-bold mx-4 md:mx-24">
            {tech}
          </span>
        ))}
      </div>
    </Marquee>
  );
}
