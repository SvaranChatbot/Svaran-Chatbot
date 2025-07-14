import React from 'react';
import '../styles/team.css';
import professorImg from '../assets/1521176440492.jpg';
import kunalImg from '../assets/Screenshot 2025-03-29 165750.png';
import ronakImg from '../assets/WhatsApp Image 2025-04-18 at 22.31.33_baee17c2.jpg';
import sumitImg from '../assets/1707585755298.jpg';
import krupaImg from '../assets/WhatsApp Image 2025-04-19 at 14.55.16_b2df5500.jpg';

interface TeamMember {
  name: string;
  image: string;
  contributions: string[];
  linkedin?: string;
  github?: string;
  email?: string;
}

const TeamPage: React.FC = () => {
  const professor = {
    name: "Gaurav Varshney",
    department: "Computer Science Department",
    image: professorImg,
    description: "Project Guide and Mentor"
  };

  const teamMembers: TeamMember[] = [
    {
      name: "Sumit Chaudhary",
      image: sumitImg,
      contributions: [
        "Model Training",
        "Rasa Integration",
        "Dynamic Real Time Data Retreival",
        "Multilingual Feature"
      ],
      linkedin: "https://www.linkedin.com/in/sumit-chaudhary-857855281/",
      github: "https://github.com/git-sumitchaudhary",
      email: "2023ume0277@iitjammu.ac.in"
    },
    {
      name: "Kunal Sharma",
      image: kunalImg,
      contributions: [
        "Website Frontend Development",
        "React Component Development",
        "UI/UX Design",
      ],
      linkedin: "https://linkedin.com/in/ks-iitjmu",
      github: "https://github.com/ks-iitjmu",
      email: "2023uma0221@iitjammu.ac.in"
    },
    {
      name: "Ronak Bagri",
      image: ronakImg,
      contributions: [
        "Backend Development and Integration",
        "Mobile App Development using ReactNative",
        "API Integration",
      ],
      linkedin: "https://linkedin.com/in/ronakbagri",
      github: "https://github.com/ronakbagri",
      email: "2023uma0233@iitjammu.ac.in"
    },
    {
      name: "Krupa Bawane",
      image: krupaImg,
      contributions: [
        "Data Cleaning",
        "Integration Testing",
        "Documentation"
      ],
      linkedin: "https://www.linkedin.com/in/krupa-bawane-00285a282/",
      github: "https://github.com/KrupaBawane",
      email: "2023uma0220@iitjammu.ac.in"
    }
  ];

  return (
    <div className="team-container appear">
      <div className="team-header">
        <h1>Our Team</h1>
        <p>Meet the talented individuals behind this AI chatbot project</p>
      </div>

      <div className="professor-section">
        <h2>Project Mentor</h2>
        <div className="professor-card">
          <div className="professor-image">
            <img src={professor.image} alt={professor.name} />
          </div>
          <div className="professor-info">
            <h3>{professor.name}</h3>
            <p className="department">{professor.department}</p>
            <p className="description">{professor.description}</p>
          </div>
        </div>
      </div>

      <div className="team-section">
        <h2>Team Members</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="member-card" key={index}>
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <div className="contributions">
                  <h4>Contributions:</h4>
                  <ul>
                    {member.contributions.map((contribution, idx) => (
                      <li key={idx}>{contribution}</li>
                    ))}
                  </ul>
                </div>
                <div className="social-links">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                      <i className="react-icons">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-2v-8h2v8zm-1-9.268c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm13 9.268h-2v-4c0-1.104-.896-2-2-2s-2 .896-2 2v4h-2v-8h2v1.268c.586-.586 1.354-.768 2.354-.768 2.206 0 3.646 1.79 3.646 4v3.5z" />
                        </svg>
                      </i>
                    </a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="social-icon github">
                      <i className="react-icons">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.653.241 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.623-5.479 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576 4.765-1.588 8.2-6.084 8.2-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </i>
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="social-icon email">
                      <i className="react-icons">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                          <path d="M12 12.713l11.985-8.713h-23.97l11.985 8.713zm0 2.287l-12-8.713v12.713h24v-12.713l-12 8.713z" />
                        </svg>
                      </i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
