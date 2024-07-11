"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import TechMarquee from "./techMarquee";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  useEffect(() => {
    const profileImage = document.querySelector(".profile-image");
    gsap.fromTo(
      profileImage,
      {
        clipPath: "circle(0% at 50% 50%)",
      },
      {
        clipPath: "circle(50% at 50% 50%)",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
          end: "top -10%",
          scrub: 1,
        },
      }
    );

    // Typewriter effect for Frontend Developer text
    gsap.fromTo(
      ".typeWriter-text",
      {
        width: "0",
        borderRight: "2px solid rgb(255, 255, 255)",
      },
      {
        width: "100%",
        borderRight: "2px solid transparent",
        ease: "steps(44)",
        duration: 3,
        scrollTrigger: {
          trigger: ".typeWriter-text",
          start: "top 90%",
          toggleActions: "play reset play reset",
        },
      }
    );
  }, []);

  return (
    <section
      className="section min-h-screen flex flex-col items-center justify-evenly px-4 text-center text-white"
      id="about">
      <TechMarquee />
      <div className="flex flex-col items-center justify-center">
        {" "}
        <Image
          src="/fotor.jpg"
          alt="Varun"
          width={300}
          height={300}
          className="profile-image mb-8 w-60 h-60 md:w-96 md:h-96 object-none md:object-cover rounded-full"
        />
        <p className="reveal-text text-lg md:text-2xl mt-4 font-mono typeWriter-text">
          Frontend Developer specializing in Next.js, React, Nuxt, Vue, Svelte
          and SvelteKit.
        </p>
      </div>
    </section>
  );
}
