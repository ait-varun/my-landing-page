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

    // Animation for the first text
    gsap.to(".about-text", {
      duration: 10,
      text: ` “...if you always put limits on what you can do, physical or anything
          else, it’ll spread over into the rest of your life. It’ll spread into
          your work, into your morality, into your entire being. There are no
          limits. There are plateaus, but you must not stay there, you must go
          beyond them. If it kills you, it kills you. A man must constantly
          exceed his level.”  ― Bruce Lee`,
      ease: "none",
      scrollTrigger: {
        trigger: "#about",
        start: "top 90%",
        toggleActions: "play reset play reset",
      },
    });
  }, []);

  return (
    <section
      className="section min-h-screen flex flex-col items-center justify-evenly px-4 text-center text-white"
      id="about">
      <TechMarquee />
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
        <Image
          src="/fotor.jpg"
          alt="Varun"
          width={300}
          height={300}
          className="profile-image mb-8 w-60 h-60 md:w-96 md:h-96 object-none md:object-cover rounded-full"
        />
        <p className="quote-text text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-4 font-mono opacity-0"></p>
        <p className="about-text text-lg md:text-2xl mt-4"></p>
      </div>
    </section>
  );
}
