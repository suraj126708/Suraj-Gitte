function AboutWork() {
  return (
    <div className="text-gray-400 min-h-screen p-8">
      {/* Abhivriddhi - Graphic Design Head */}
      <div className="mb-12">
        {/* Logo Image */}
        <div className="mb-4 flex justify-start items-center gap-4">
          <img
            src="https://media.licdn.com/dms/image/v2/D4D0BAQHmfZjyCqdF-A/company-logo_100_100/company-logo_100_100/0/1687788410133/stnd_vit_pune_logo?e=1741219200&v=beta&t=r4BxpycoVyfQEBm949cjxI7twBpUX1pU7zOwbH9J4Fw"
            alt="Abhivriddhi Logo"
            className="w-8 h-8 object-contain"
          />
          <h2 className="text-2xl text-white font-semibold">
            Graphic Design Head
          </h2>
        </div>
        {/* Job Title and Description */}
        <p className="text-lg text-gray-500 mb-4">
          Abhivriddhi - Student Training & Development Committee, VIT Pune
        </p>
        <p className="text-sm text-gray-400">Aug 2024 - Present · 4 months</p>
        <ul className="mt-4 list-disc pl-5 text-lg">
          <li>
            Leading a talented team to create visually compelling and impactful
            designs.
          </li>
          <li>Ensuring high-quality standards in all design projects.</li>
          <li>
            Fostering a collaborative environment to drive innovation in design
            work.
          </li>
          <li>
            Utilizing design tools such as Adobe Illustrator, Canva, Figma, and
            Photoshop.
          </li>
        </ul>
        <p className="text-sm text-gray-500 mt-2">
          Location: Pune, Maharashtra, India (On-site)
        </p>
      </div>

      <div>
        <div className="mb-4 flex justify-start items-center gap-4">
          <img
            src="https://media.licdn.com/dms/image/v2/D4D0BAQHmfZjyCqdF-A/company-logo_100_100/company-logo_100_100/0/1687788410133/stnd_vit_pune_logo?e=1741219200&v=beta&t=r4BxpycoVyfQEBm949cjxI7twBpUX1pU7zOwbH9J4Fw"
            alt="Abhivriddhi Logo"
            className="w-8 h-8 object-contain"
          />
          <h2 className="text-2xl text-white font-semibold">
            Graphic Design Coordinator
          </h2>
        </div>
        <p className="text-lg text-gray-500 mb-4">
          Abhivriddhi - Student Training & Development Committee, VIT Pune
        </p>
        <p className="text-sm text-gray-400">Oct 2023 - Aug 2024 · 11 months</p>
        <ul className="mt-4 list-disc pl-5 text-lg">
          <li>
            Organized and facilitated workshops, seminars, and events for
            student development.
          </li>
          <li>
            Collaborated with other coordinators and trainers to ensure the
            success of programs.
          </li>
          <li>Enhanced project management and teamwork skills.</li>
          <li>
            Contributed to the growth and development of the student community
            at VIT Pune.
          </li>
        </ul>
        <p className="text-sm text-gray-500 mt-2">
          Location: Pune, Maharashtra, India
        </p>
      </div>
    </div>
  );
}

export default AboutWork;
