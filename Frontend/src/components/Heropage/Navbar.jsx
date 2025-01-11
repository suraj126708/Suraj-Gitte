import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import profilepic from "../../assets/suraj_gitte.png";
import party from "party-js";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);

  // Refs for animation
  const navbarRef = useRef(null);
  const profileRef = useRef(null);
  const connectRef = useRef(null);
  const availableRef = useRef(null);
  const emailButtonRef = useRef(null); // Ref for the email button

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      profileRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: "power2.out" }
    );

    gsap.fromTo(
      connectRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: "power2.out" }
    );

    gsap.fromTo(
      availableRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: "power2.out" }
    );
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("suraj.gitte23@vit.edu");

    party.confetti(emailButtonRef.current, {
      count: party.variation.range(40, 60),
    });

    setCopyStatus(true);
    setTimeout(() => {
      setCopyStatus(false);
    }, 2000);
  };

  return (
    <nav
      ref={navbarRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#121212]/80 backdrop-blur-sm" : "bg-[#121212]"
      } border-b-purple-400 border-b-[1px]`}
    >
      <div className="container mx-auto md:py-2 px-4 md:px-8 flex flex-col md:flex-row items-center justify-around">
        {/* Left Section */}
        <div
          ref={connectRef}
          className="flex flex-col items-center md:items-start space-y-2"
        >
          <p className="hidden md:block text-gray-400 text-base font-medium deam-font">
            Lets Connect:
          </p>
          <div className="flex justify-between w-full">
            <a
              href="https://www.instagram.com/suraj_gitte_6708/"
              className="hidden md:block hover:text-purple-400 text-2xl"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://github.com/suraj126708"
              className="hidden md:block hover:text-purple-400 text-2xl"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/suraj-gitte-7b71a7288/"
              className="hidden md:block hover:text-purple-400 text-2xl"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>

        {/* Center Section */}
        <div
          ref={profileRef}
          className="mt-2 md:mt-0 flex items-center space-x-4"
        >
          <img
            src={profilepic}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h1 className="text-lg heading">Suraj Gitte</h1>
            <p className="text-base text-gray-400 font-inter deam-font">
              Web Designer
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div
          className="mt-4 flex flex-col sm:flex-row md:flex-col items-center"
          ref={availableRef}
        >
          <p className="text-base font-medium text-gray-400">
            <span className="text-green-500">●</span> Available for work
          </p>
          <div
            ref={emailButtonRef} // Set ref to the email button
            onClick={handleCopyEmail} // Call the handleCopyEmail function on click
            className="flex justify-start items-center gap-2 cursor-pointer"
          >
            <i className="fa-solid fa-copy"></i>
            <p
              className={`text-base font-medium ${
                copyStatus ? "text-purple-500" : ""
              }`}
            >
              {copyStatus ? "Copied!" : "suraj.gitte23@vit.edu"}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
