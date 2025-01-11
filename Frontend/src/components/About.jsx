import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AboutIntro from "./Heropage/AboutIntro";
import AboutWork from "./Heropage/AboutWork";
import Achievements from "./Heropage/Achievements";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function About() {
  // Creating references for the sections
  const introRef = useRef(null);
  const achievementRef = useRef(null);
  const workRef = useRef(null);

  useEffect(() => {
    // Animation for the Introduction section
    gsap.fromTo(
      introRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 80%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      achievementRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: achievementRef.current,
          start: "top 80%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animation for the Experience section
    gsap.fromTo(
      workRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: workRef.current,
          start: "top 80%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div className="text-gray-400 min-auto md:p-8 px-4 md:px-14">
      <h1 className="text-4xl text-center font-bold mb-8 heading text-gray-400">
        About Me
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 md:mx-8">
        <div className="max-w-auto md:pr-8 md:border-r-[1px] md:border-gray-400">
          {/* Introduction Section */}
          <div ref={introRef}>
            <h2 className="text-2xl font-semibold mb-2 text-white heading">
              Introduction
            </h2>
            <div className="border-t border-purple-500 mb-6"></div>
            <AboutIntro />
          </div>

          {/* Achievements Section */}
          <div ref={achievementRef}>
            <h2 className="text-2xl font-semibold text-white heading mb-2">
              Achievements and Certifications
            </h2>
            <div className="border-t border-purple-500 mb-6"></div>
            <Achievements />
          </div>
        </div>

        {/* Row Divider (Visible only on smaller screens) */}

        {/* Work/Experience Section */}
        <div className="mt-6 md:mt-0" ref={workRef}>
          <h2 className="text-2xl font-semibold text-white heading mb-2">
            Experience
          </h2>
          <div className="border-t border-purple-500 mb-6"></div>
          <AboutWork />
        </div>
      </div>
    </div>
  );
}

export default About;
