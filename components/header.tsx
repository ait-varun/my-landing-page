"use client";
import { useEffect } from "react";
import { gsap } from "gsap";

export default function Header() {
  useEffect(() => {
    const words = [
      "Varun.",
      "a Creator.",
      "a Web Designer.",
      "a Web Developer.",
    ];

    let cursor = gsap.to(".cursor", {
      opacity: 0,
      ease: "power2.inOut",
      repeat: -1,
    });

    let boxTl = gsap.timeline();

    boxTl
      .to(".type-box", {
        duration: 1,
        width: "20vw",
        delay: 0.5,
        ease: "power4.inOut",
      })
      .fromTo(
        ".type-text",
        {
          y: "7vw",
          ease: "power3.out",
        },
        {
          opacity: 1,
          duration: 1,
          y: "0",
          ease: "power3.out",
          onComplete: () => {
            masterTl.play();
          },
        }
      )
      .to(".type-box", {
        duration: 1,
        height: "7vw",
        ease: "elastic.out",
      })
      .to(".type-box", {
        duration: 2,
        autoAlpha: 1,
        yoyo: true,
        repeat: -1,
        ease: "rough({ template: none.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false})",
      });

    let masterTl = gsap.timeline({ repeat: -1 }).pause();

    words.forEach((word) => {
      let tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
      tl.to(".text", { duration: 2, text: word });
      masterTl.add(tl);
    });

    return () => {
      masterTl.kill();
    };
  }, []);

  return (
    <section className="section flex flex-col items-center justify-center font-mono px-4 text-center min-h-screen">
      <h1 className="type-heading">
        <span className="type-box"></span>
        <span className="type-text">Hi,I&apos;m&nbsp;</span>
        <span className="text"></span>
        <span className="cursor">_</span>
      </h1>
    </section>
  );
}
