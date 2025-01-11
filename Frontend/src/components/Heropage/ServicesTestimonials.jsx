function ServicesTestimonials() {
  const achievements = [
    {
      text: "Solved 100+ DSA problems on LeetCode, focusing on algorithms and problem-solving techniques.",
      detail: "LeetCode Proficiency",
    },
    {
      text: "Built multiple full-stack web applications using the MERN stack (MongoDB, Express, React, Node.js).",
      detail: "Full-Stack Development",
    },
    {
      text: "Contributed to open-source projects on GitHub, improving coding skills and collaborating with global developers.",
      detail: "Open-Source Contribution",
    },
    {
      text: "Completed certifications in JavaScript, React, and Node.js through platforms like Udemy and Coursera.",
      detail: "Certifications & Learning",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Wrapper for responsive design */}
      <div className="flex flex-wrap md:flex-nowrap md:space-x-8 md:animate-scroll-left">
        {achievements.map((achievement, index) => (
          <blockquote
            key={index}
            className="w-full md:w-[calc(50%-1rem)] mb-3 md:mb-0 flex flex-col justify-between"
          >
            <p className="text-lg">{achievement.text}</p>
            <cite className="block mt-2 text-sm text-gray-400">
              - {achievement.detail}
            </cite>
          </blockquote>
        ))}
      </div>
    </div>
  );
}

export default ServicesTestimonials;
