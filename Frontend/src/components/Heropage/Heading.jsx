import { useEffect, useRef } from "react";
import gsap from "gsap";

function Heading() {
  // Refs for animations
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    // Animate the heading text
    timeline.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Animate the subtext
    timeline.fromTo(
      subtextRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.5"
    );

    timeline.fromTo(
      ctaRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" },
      "-=0.5"
    );
  }, []);

  return (
    <div className="border-b-[1px] border-b-gray-400 w-full mt-[5vh] h-[65vh] md:h-[65vh] flex flex-col items-center justify-center pt-20 md:pt-24">
      {/* Animated Heading */}
      <h1
        ref={headingRef}
        className="heading uppercase font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-center leading-relaxed sm:leading-loose md:leading-loose tracking-wide px-4 sm:px-6 md:px-8"
      >
        Code is like humor. When you have to explain it, it’s bad.
      </h1>

      {/* Subtext and CTA */}
      <div
        className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6 md:mt-8"
        ref={ctaRef}
      >
        <p
          ref={subtextRef}
          className="text-sm sm:text-base text-gray-400 font-inter text-center"
        >
          Want to know more about my journey and skills?
        </p>
        <a
          href="https://acrobat.adobe.com/id/urn:aaid:sc:AP:93bbeaaa-ffe3-400f-9e7f-826c6c6530f8"
          target="_blank"
          className="hover:cursor-pointer"
          rel="noopener noreferrer"
        >
          <h4 className="text-base sm:text-lg heading text-center flex justify-center items-center gap-2 hover:text-purple-400 hover:cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out">
            View Resume
            <i className="fa-solid fa-arrow-right text-xl sm:text-2xl transition-transform duration-300 ease-in-out hover:translate-x-2"></i>
          </h4>
        </a>
      </div>
    </div>
  );
}

export default Heading;
