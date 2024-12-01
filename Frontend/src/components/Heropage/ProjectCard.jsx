/* eslint-disable react/prop-types */
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ name, year, description, image, link }) => {
  const priceCardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      priceCardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: priceCardRef.current,
          start: "top 80%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  return (
    <div
      ref={priceCardRef}
      className="text-gray-300 px-2 rounded-md flex flex-col shadow-sm h-[400px]"
    >
      <div className="flex justify-between text-sm text-gray-400 px-2 py-2">
        <span>{description}</span>
        <span>{year}</span>
      </div>
      <div className="flex items-center bg-[#121212] justify-between w-full px-4 py-2 border-t border-x border-gray-500 rounded-t-lg">
        <div className="flex space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
        </div>

        <div className="flex-grow text-center">
          <span className="text-lg font-medium">{name}</span>
        </div>

        <div className="text-orange-500">
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-grow overflow-hidden rounded-b-md border border-gray-500"
      >
        <img
          src={image}
          alt={`${name} project`}
          className="object-cover h-full w-full transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </a>
    </div>
  );
};

export default ProjectCard;
