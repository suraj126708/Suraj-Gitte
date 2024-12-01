function EducationDetails() {
  const educationData = [
    {
      institution: "Vishwakarma Institute Of Technology",
      degree: "Bachelor of Technology, Computer Science and Engineering (AI)",
      duration: "2023 - 2027",
      grade: "8.76 SGPA",
    },
    {
      institution: "Yogeshwari Mahavidyalaya, Ambajogai",
      degree: "Jr College",
      duration: "Jun 2021 - Apr 2023",
      grade: "73.80% in 12th",
    },
    {
      institution: "New High School Parli, Beed",
      degree: "High School Diploma",
      duration: "Jun 2019 - Apr 2020",
      grade: "96% in 10th",
    },
  ];

  return (
    <div className="space-y-3">
      {educationData.map((item, index) => (
        <div key={index}>
          <h3 className="text-xl font-semibold text-white">
            {item.institution}
          </h3>
          <p className="font-medium text-gray-400">{item.degree}</p>
          <p className="text-gray-400">{item.duration}</p>
          {item.grade && <p className="text-gray-400">{item.grade}</p>}
        </div>
      ))}
    </div>
  );
}

export default EducationDetails;
