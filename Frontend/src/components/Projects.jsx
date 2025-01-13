import ProjectCard from "./Heropage/ProjectCard";
import ngo from "../assets/ngo.png";
import gym from "../assets/gym.png";
import coalMine from "../assets/coalmine.png";
import advisor from "../assets/Screenshot 2025-01-13 131409.png";


function Projects() {
  const projectData = [
    {
      name: "NGO Website",
      year: 2023,
      description: "Social Impact Website",
      image: ngo,
      link: "https://suraj126708.github.io/EDAI/",
    },
    {
      name: "Fit4You",
      year: 2024,
      description: "Gym Website",
      image: gym,
      link: "https://gym-website-lake.vercel.app/",
    },
    {
      name: "MineSafe",
      year: 2024,
      description: "coal mine Worker safety Sysytem",
      image: coalMine,
      link: "https://coal-mines-worker-safety-website-ui.vercel.app/",
    },
    {
      name: "Financial Advisor",
      year:"2024",
      description: "Financial Advisor",
      image: advisor,
      link: "https://build-a-website-hackathon.vercel.app/",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-gray-400 text-2xl heading sm:text-3xl md:text-4xl font-bold mb-8">
        My Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {projectData.map((project, index) => (
          <ProjectCard
            key={index}
            name={project.name}
            year={project.year}
            description={project.description}
            image={project.image}
            link={project.link}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;
