function ServicesStack() {
  const techStack = [
    { icon: "fa-html5", label: "HTML" },
    { icon: "fa-css3-alt", label: "CSS" },
    { icon: "fa-js", label: "Javascript" },
    { icon: "fa-react", label: "ReactJs" },
    { icon: "fa-node", label: "NodeJS" },
    { icon: "fa-database", label: "SQL" },
    { icon: "fa-github", label: "Github" },
    { icon: "fa-bootstrap", label: "Bootstrap" },
    { icon: "fa-figma", label: "Figma" },
  ];

  return (
    <div className="overflow-hidden">
      <div className="flex space-x-10 md:space-x-8 animate-scroll-right ">
        <div className="flex space-x-10 md:space-x-8">
          {techStack.map((item, index) => (
            <span
              key={index}
              className="flex flex-col items-center space-y-1 transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
            >
              {item.icon ? (
                <i className={`fa-brands ${item.icon} text-2xl`} />
              ) : item.image ? (
                <img src={item.image} alt={item.label} className="w-10 h-10" />
              ) : null}
              <span className="text-sm text-gray-400">{item.label}</span>
            </span>
          ))}
        </div>
        <div className="flex space-x-10 md:space-x-8">
          {techStack.map((item, index) => (
            <span key={index} className="flex flex-col items-center space-y-1">
              {item.icon ? (
                <i className={`fa-brands ${item.icon} text-2xl`} />
              ) : item.image ? (
                <img src={item.image} alt={item.label} className="w-10 h-10" />
              ) : null}
              <span className="text-sm text-gray-400">{item.label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServicesStack;
