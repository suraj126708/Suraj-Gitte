import Navbar from "../components/Heropage/Navbar";
import Heading from "../components/Heropage/Heading";
import Projects from "../components/Projects";
import ServicesPage from "../components/Services";
import "../App.css";
import About from "../components/About";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";

function HeroPage() {
  return (
    <div>
      <Navbar />
      <Heading />
      <Projects />
      <ServicesPage />
      <About />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default HeroPage;
