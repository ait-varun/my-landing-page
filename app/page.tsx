"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Lenis from "lenis";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import Marquee from "react-fast-marquee";
gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Define the skills for the typewriter effect
    const skills = ["Front End", "Web"];

    // Create the typewriter effect animation
    function createTypewriterAnimation() {
      const tl = gsap.timeline({ repeat: -1 });

      skills.forEach((skill) => {
        tl.to("#typewriter", {
          duration: 2,
          text: skill,
          ease: "none",
          onComplete: () => {
            gsap.to("#typewriter", {
              duration: 0.5,
              delay: 0.5,
              text: "|",
              ease: "none",
            });
          },
        });
        tl.to({}, { duration: 3 }); // Pause between words
      });

      return tl;
    }
    const typewriterAnimation = createTypewriterAnimation();

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
        "#f0f0f0",
        "#000000",
        "#d0d0d0",
        "#c0c0c0",
        "#000000",
      ];
      return colors[index % colors.length];
    }

    // Typing animation for education section
    gsap.to(".typing-text", {
      duration: 5,
      text: "Bachelor&apos;s Degree in Computer Science from XYZ University.",
      ease: "none",
      scrollTrigger: {
        trigger: "#education",
        start: "top center",
        end: "top top",
        scrub: 1,
        // markers: true,
      },
    });

    // Project cards animation
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

    // Profile image transition
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

    return () => {
      lenis.destroy();
      typewriterAnimation.kill();
    };
  }, []);

  return (
    <>
      {/* <header className="header flex items-center justify-center">
        <h1 className="text-4xl font-bold">
          Welcome to Varun&apos;s Landing Page
        </h1>
      </header> */}
      <section className="section min-h-screen flex items-center justify-center font-mono">
        <span className="big-text text-6xl font-extrabold">
          Hello, I&apos;m Varun &nbsp;
        </span>
        <div className="big-text text-6xl font-extrabold" id="typewriter">
          |
        </div>
        <span className="big-text text-6xl font-extrabold">
          &nbsp;Developer
        </span>
      </section>
      <Marquee pauseOnHover>
        {" "}
        <div className="font-mono">
          <div className="w-full">
            <span className="text-3xl font-bold mx-28">Next.js</span>
            <span className="text-3xl font-bold mx-28">React</span>
            <span className="text-3xl font-bold mx-28">Nuxt.js</span>
            <span className="text-3xl font-bold mx-28">Vue</span>
            <span className="text-3xl font-bold mx-28">Svelte kit</span>
            <span className="text-3xl font-bold mx-28">Svelte</span>
          </div>
        </div>
      </Marquee>
      <section
        className="section min-h-screen flex flex-col items-center justify-center"
        id="about">
        <Image
          src="https://picsum.photos/300/300?random=1"
          alt="Varun"
          width={500}
          height={500}
          className="profile-image  mb-8"
        />
        <p className="reveal-text text-2xl mt-4 font-mono">
          Frontend Developer specializing in Next.js, React, Nuxt, Vue, Svelte,
          and SvelteKit.
        </p>
      </section>
      <section
        className="section min-h-screen flex flex-col items-center justify-center text-white font-mono"
        id="education">
        <h2 className="reveal-text text-6xl font-bold mb-4">Education</h2>
        <p className="typing-text text-4xl font-mono"></p>
        <div className="mt-8 space-y-4">
          <p className="reveal-text text-2xl font-mono">
            Master&apos;s in Web Development - ABC University (2020-2022)
          </p>
          <p className="reveal-text text-2xl font-mono">
            Certification in UI/UX Design - Design Institute (2019)
          </p>
          <p className="reveal-text text-2xl font-mono">
            Bachelor&apos;s in Computer Science - XYZ University (2016-2020)
          </p>
        </div>
      </section>
      <section
        className="section min-h-screen flex flex-col items-center justify-evenly font-mono"
        id="projects">
        <h2 className="reveal-text text-6xl font-bold mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="project-card bg-white p-6 rounded-lg shadow-lg opacity-0">
            <Image
              src="https://picsum.photos/400/300?random=1"
              alt="Project A"
              width={400}
              height={300}
              className="mb-4 rounded"
            />
            <h3 className="text-3xl font-bold mb-2">Project A</h3>
            <p>A responsive web application built with React and Next.js.</p>
          </div>
          <div className="project-card bg-white p-6 rounded-lg shadow-lg opacity-0">
            <Image
              src="https://picsum.photos/400/300?random=2"
              alt="Project B"
              width={400}
              height={300}
              className="mb-4 rounded"
            />
            <h3 className="text-3xl font-bold  mb-2">Project B</h3>
            <p>An e-commerce platform developed using Vue.js and Nuxt.</p>
          </div>
        </div>
      </section>
      <section
        className="section min-h-screen flex flex-col items-center justify-center font-mono"
        id="experience">
        <h2 className="reveal-text text-6xl font-extrabold mb-8">
          Work Experience
        </h2>
        <p className="reveal-text text-2xl">
          Senior Frontend Developer at TechCorp (2020-Present)
        </p>
        <p className="reveal-text text-2xl mt-4">
          Web Developer at InnoSoft (2018-2020)
        </p>
      </section>
      <section
        className="section min-h-screen flex flex-col items-center justify-center"
        id="contact">
        <div className="border-2 border-white rounded-lg p-8 flex flex-col items-center justify-center">
          {" "}
          <h2 className="reveal-text text-3xl font-bold mb-4 text-white">
            Contact
          </h2>
          <form className="reveal-text w-full max-w-md">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 mb-4 border rounded"
            />
            <textarea
              name="message"
              placeholder="Message"
              className="w-full p-2 mb-4 border rounded h-32"></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Send
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
