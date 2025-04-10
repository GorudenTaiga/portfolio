'use client';
import { FaLaravel, FaReact, FaHtml5, FaGithub, FaCss3 } from 'react-icons/fa';
import { SiJavascript, SiUnrealengine, SiTailwindcss, SiNextdotjs, SiBlender, SiGamedeveloper } from 'react-icons/si';


const projects = [
    {
        id: 0,
        image: ['/images/portfolio_thumbnail.webp', '/videos/portfolio_vid1.webm'],
        thumbnail: '/images/portfolio_thumbnail.webp',
        title: 'Portfolio Website',
        sinopsis: 'Personal Portfolio Website',
        description: 'This portfolio website was built using React.js, TailwindCSS, and JavaScript. I created this website to introduce myself to everyone — showcasing who I am, my skills, my projects, and even providing a way for us to connect through the contact section.',
        tags: ['React.js', 'Javascript', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS'],
        techIcons: [<FaReact />, <SiJavascript />, <SiNextdotjs />, <SiTailwindcss />, <FaHtml5 />, <FaCss3 />],
        date: '2025-04-05',
        liveUrl: 'https://rezaar.vercel.app',
        repoUrl: 'https://github.com/GorudenTaiga/portfolio'
    },
    {
        id: 1,
        image: ['/videos/jelajah_vid.webm', '/images/jelajah/scr1.jpeg', '/images/jelajah/scr2.jpeg', '/images/jelajah/scr3.jpeg', '/images/jelajah/scr4.jpeg', '/images/jelajah/scr5.jpeg', '/images/jelajah/scr6.jpeg', '/images/jelajah/scr7.jpeg', '/images/jelajah/scr8.jpeg', '/images/jelajah/scr9.jpeg', '/images/jelajah/scr10.jpeg', '/images/jelajah/scr11.jpeg'],
        thumbnail: '/images/jelajah/scr1.jpeg',
        title: 'Jelajah Nusantara',
        sinopsis: 'Digital Representation of Indonesia',
        description: 'Jelajah Nusantara is a game designed as a digital representation of Indonesia. In this game, players can explore the diversity of cultures, ethnicities, traditions, and unique characteristics from various regions across Indonesia. Powered by Unreal Engine 5, this game offers realistic graphics and immersive gameplay experiences.',
        tags: ['Unreal Engine 5', 'Blender 3D', 'Games', 'Metahuman', 'Sketchfab'],
        techIcons: [<SiUnrealengine />, <SiBlender />, <SiGamedeveloper />],
        date: '2023-04-28',
        liveUrl: null,
        repoUrl: null
    },
    {
        id: 2,
        image: ['/videos/litedex_cinematic.webm', '/images/litedex/litedex_thumbnail.png', '/images/litedex/litedex1.png', '/images/litedex/litedex2.png'],
        thumbnail: '/images/litedex/litedex_thumbnail.png',
        title: 'LiteDex Protocol',
        sinopsis: 'Cyber Security Game',
        description: 'Litedex is a game where players act as hackers trying to break into a building called Litedex. Players must find creative ways to enter the building and retrieve important data from the Litedex company.',
        tags: ['Unreal Engine', 'Blender 3D', 'Games', 'Metahuman'],
        techIcons: [<SiUnrealengine />, <SiBlender />, <SiGamedeveloper />],
        date: '2023-07-03',
        liveUrl: null,
        repoUrl: null
    },
    {
        id: 3,
        image: ['/videos/pendopo_vid.webm', '/images/pendopo/pendopo1.png', '/images/pendopo/pendopo2.png'],
        thumbnail: '/images/pendopo/pendopo1.png',
        title: 'Pendopo',
        sinopsis: 'A Virtual Space of Jogja’s traditional house',
        description: 'A virtual space to showcase Jogja’s traditional house called "Pendopo." This was my very first project during my time at PT. Jivaloka Prasanna Sanasi.',
        tags: ['Unreal Engine', 'Blender 3D', 'Games', 'Metahuman'],
        techIcons: [<SiUnrealengine />, <SiBlender />, <SiGamedeveloper />],
        date: '2023-02-28',
        liveUrl: null,
        repoUrl: null
    }
];

export default projects;