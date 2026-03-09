import techInnovationsLogo from "../../assets/TechInnovation.png";
import techzDadaLogo from "../../assets/techzdada.png";

function AboutWork() {
  return (
    <div className="text-gray-400 min-h-screen p-8">
      {/* TechInnovations Industry Project */}
      <div className="mb-12">
        <div className="mb-4 flex justify-start items-center gap-4">
          <img
            src={techInnovationsLogo}
            alt="TechInnovations Logo"
            className="w-8 h-8 object-contain"
          />
          <h2 className="text-2xl text-white font-semibold">
            Full Stack Developer
          </h2>
        </div>

        <p className="text-lg text-gray-500 mb-4">
          TechInnovations Industry Project — EDUAI: Question Paper Generation
          and Evaluation System
        </p>

        <p className="text-sm text-gray-400">
          Sept 2025 - Jan 2026 · 5 months
        </p>

        <ul className="mt-4 list-disc pl-5 text-lg">
          <li>
            Built a scalable multi-tenant web platform with secure role-based
            access for automated question paper generation and evaluation.
          </li>
          <li>
            Implemented a RAG-powered backend using FastAPI and Qdrant Cloud to
            support efficient document retrieval and AI-based processing.
          </li>
          <li>
            Developed a hybrid PDF parsing engine using asynchronous OCR to
            process documents with significantly reduced latency.
          </li>
          <li>
            Designed system architecture capable of handling high concurrency
            and secure data isolation across multiple users.
          </li>
        </ul>

        <p className="text-sm text-gray-500 mt-2">
          Location: Pune, Maharashtra, India
        </p>
      </div>

      {/* TechzDada Platform */}
      <div>
        <div className="mb-4 flex justify-start items-center gap-4">
          <img
            src={techzDadaLogo}
            alt="TechzDada Logo"
            className="w-8 h-8 object-contain"
          />
          <h2 className="text-2xl text-white font-semibold">
            Full Stack Developer
          </h2>
        </div>

        <p className="text-lg text-gray-500 mb-4">
          TechzDada Educational Platform
        </p>

        <p className="text-sm text-gray-400">
          Apr 2025 - June 2025 · 3 months
        </p>

        <ul className="mt-4 list-disc pl-5 text-lg">
          <li>
            Developed a production-scale MERN + ML platform providing college
            analysis and percentile prediction for students.
          </li>
          <li>
            Implemented scalable REST APIs and optimized backend data handling
            for efficient application performance.
          </li>
          <li>
            Built features supporting thousands of users and high traffic with
            fast response times.
          </li>
          <li>
            Contributed to improving user experience by designing reliable
            backend workflows and data-driven insights.
          </li>
        </ul>

        <p className="text-sm text-gray-500 mt-2">
          Location: Remote
        </p>
      </div>
    </div>
  );
}

export default AboutWork;
