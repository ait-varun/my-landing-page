"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

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
  }, []);

  return (
    <section
      className="section min-h-screen flex flex-col items-center justify-center px-4 text-center"
      id="about">
      <Image
        src="/fotor.jpg"
        alt="Varun"
        width={300}
        height={300}
        className="profile-image mb-8 w-60 h-60 md:w-96 md:h-96 object-none md:object-cover rounded-full"
      />
      <p className="reveal-text text-lg md:text-2xl mt-4 font-mono">
        Frontend Developer specializing in Next.js, React, Nuxt, Vue, Svelte,
        and SvelteKit.
      </p>
    </section>
  );
}
