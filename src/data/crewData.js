import AyelenImg from '../assets/img/profile_vocalist_01.png';
import LucioImg from '../assets/img/profile_guitarist_01.png';
import MatiasImg from '../assets/img/profile_drummer_01.png';
import Project01 from '../assets/img/project_01.jpg';
import Project02 from '../assets/img/project_02.jpg';
import Project03 from '../assets/img/project_03.jpg';
import Project04 from '../assets/img/project_04.jpg';
import Project05 from '../assets/img/project_05.jpg';
import Project06 from '../assets/img/project_06.jpg';
import Project07 from '../assets/img/project_07.jpg';
import Project08 from '../assets/img/project_08.jpg';
import Project09 from '../assets/img/project_09.jpg';

export const crewData = {
  ayelen: {
    id: "ayelen",
    name: "AYELEN",
    role: "Lead Vocals & Frontend Architect",
    image: AyelenImg,
    bio: "Especialista en frecuencias altas y maquetación semántica. Lidera la armonía del equipo asegurando que cada componente resuene perfectamente en todos los dispositivos del universo.",
    skills: [
      { name: "Java", icon: "fa-brands fa-java", level: 95 },
      { name: "Angular", icon: "fa-brands fa-angular", level: 90 },
      { name: "React", icon: "fa-brands fa-react", level: 85 },
      { name: "JavaScript", icon: "fa-brands fa-js", level: 95 },
      { name: "Python", icon: "fa-brands fa-python", level: 60 },
      { name: "BPM", icon: "fa-solid fa-diagram-project", level: 80 }
    ],
    projects: [
      { id: 1, title: "Nebula UI Kit", img: Project01 },
      { id: 2, title: "Space E-Commerce", img: Project02 },
      { id: 3, title: "Galactic Dashboard", img: Project03 }
    ],
    socials: [
      { platform: "GitHub", icon: "fa-brands fa-github", url: "#" },
      { platform: "LinkedIn", icon: "fa-brands fa-linkedin-in", url: "#" },
      { platform: "Spotify", icon: "fa-brands fa-spotify", url: "#" }
    ]
  },
  lucio: {
    id: "lucio",
    name: "LUCIO",
    role: "Lead Guitar & Logic Engineer",
    image: LucioImg,
    bio: "Maestro de los solos y los algoritmos. Convierte el caos del estado y los hooks en melodías limpias y eficientes. Si hay un bug, su guitarra lo soluciona en tiempo récord.",
    skills: [
      { name: "JavaScript", icon: "fa-brands fa-js", level: 95 },
      { name: "React", icon: "fa-brands fa-react", level: 90 },
      { name: "Node.js", icon: "fa-brands fa-node-js", level: 80 },
      { name: "Git", icon: "fa-brands fa-git-alt", level: 85 },
      { name: "Python", icon: "fa-brands fa-python", level: 75 }
    ],
    projects: [
      { id: 1, title: "API Interstelar", img: Project04 },
      { id: 2, title: "Gravity Router", img: Project05 },
      { id: 3, title: "Apollo Hooks", img: Project06 }
    ],
    socials: [
      { platform: "GitHub", icon: "fa-brands fa-github", url: "#" },
      { platform: "Instagram", icon: "fa-brands fa-instagram", url: "#" },
      { platform: "SoundCloud", icon: "fa-brands fa-soundcloud", url: "#" }
    ]
  },
  matias: {
    id: "matias",
    name: "MATIAS",
    role: "Drums & Backend Percussion",
    image: MatiasImg,
    bio: "Marca el ritmo del proyecto. Encargado de las bases de datos y la persistencia del ritmo. Sin su metrónomo interno, la nave perdería el rumbo en el vacío espacial.",
    skills: [
      { name: "Node.js", icon: "fa-brands fa-node", level: 90 },
      { name: "Docker", icon: "fa-brands fa-docker", level: 85 },
      { name: "AWS", icon: "fa-brands fa-aws", level: 70 },
      { name: "Linux", icon: "fa-brands fa-linux", level: 80 },
      { name: "NPM", icon: "fa-brands fa-npm", level: 95 }
    ],
    projects: [
      { id: 1, title: "Meteor Data Sync", img: Project07 },
      { id: 2, title: "Cluster Manager", img: Project08 },
      { id: 3, title: "Orbit Auth Auth", img: Project09 }
    ],
    socials: [
      { platform: "GitHub", icon: "fa-brands fa-github", url: "#" },
      { platform: "LinkedIn", icon: "fa-brands fa-linkedin-in", url: "#" },
      { platform: "Twitch", icon: "fa-brands fa-twitch", url: "#" }
    ]
  }
};