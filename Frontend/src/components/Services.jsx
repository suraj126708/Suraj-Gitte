/* eslint-disable react/no-unescaped-entities */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import EducationDetails from "./Heropage/ServicesItem";
import ServicesStack from "./Heropage/ServicesStack";
import ServicesTestimonials from "./Heropage/ServicesTestimonials";

gsap.registerPlugin(ScrollTrigger);

const ServicesPage = () => {
  const educationRef = useRef(null);
  const stackRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      educationRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: educationRef.current,
          start: "top 80%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animation for the Stack section
    gsap.fromTo(
      stackRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: stackRef.current,
          start: "top 80%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animation for the Testimonials section
    gsap.fromTo(
      testimonialsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 80%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div className="text-gray-400 min-auto p-8 md:px-14">
      <h1 className="text-4xl text-center font-bold mb-8 heading text-gray-400">
        Education & Stack
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 md:mx-8">
        <div
          ref={educationRef}
          className="max-w-auto md:pr-8 md:border-r-[1px] md:border-gray-400"
        >
          <h2 className="text-2xl font-semibold text-white heading mb-2">
            Education
          </h2>
          <div className="border-t border-purple-500 mb-6"></div>
          <EducationDetails />
        </div>

        {/* Row Divider (Visible only on smaller screens) */}

        <div className="mt-6 md:mt-0" ref={stackRef}>
          <h2 className="text-2xl font-semibold text-white heading mb-2">
            Stack
          </h2>
          <div className="border-t border-purple-500 mb-6"></div>
          <ServicesStack />

          <h2 className="text-2xl font-semibold mt-6 text-white heading mb-2">
            Testimonials
          </h2>
          <div className="border-t border-purple-500 mb-6"></div>
          <ServicesTestimonials />
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
