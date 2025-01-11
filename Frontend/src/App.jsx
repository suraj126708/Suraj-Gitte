import "./App.css";
import HeroPage from "./Pages/HeroPage";
import { ToastContainer } from "react-toastify";
import { gsap } from "gsap";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    gsap.set(".ball", { xPercent: -50, yPercent: -50 });
    let targets = gsap.utils.toArray(".ball");
    window.addEventListener("mousemove", (e) => {
      gsap.to(targets, {
        duration: 0.5,
        x: e.clientX,
        y: e.clientY,
        ease: "power1.out",
        overwrite: "auto",
        stagger: 0.02,
      });
    });
  }, []);

  return (
    <>
      <div className="h-screen" id="hero-page">
        <div className="ball bg-purple-500 w-4 h-4 fixed top-0 left-0 rounded-full z-50 pointer-events-none"></div>
        <div className="ball bg-purple-500 w-4 h-4 fixed top-0 left-0 rounded-full z-50 pointer-events-none"></div>
        <div className="ball bg-purple-500 w-4 h-4 fixed top-0 left-0 rounded-full z-50 pointer-events-none"></div>
        <div className="ball bg-purple-500 w-4 h-4 fixed top-0 left-0 rounded-full z-50 pointer-events-none"></div>
        <div className="ball bg-purple-500 w-4 h-4 fixed top-0 left-0 rounded-full z-50 pointer-events-none"></div>
        <HeroPage />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
