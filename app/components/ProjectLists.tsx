'use client';
import { FaLaravel, FaReact, FaHtml5, FaGithub, FaCss3 } from 'react-icons/fa';
import { SiJavascript, SiUnrealengine, SiTailwindcss, SiNextdotjs, SiBlender, SiGamedeveloper } from 'react-icons/si';


const projects = [
    {
        image: ['/images/portfolio_thumbnail.webp', '/videos/portfolio_video1.webp', 'https://simpanan.carakan.id/remote.php/webdav/Documentation/OPM/MilitaryCQC%20-%20Unreal%20Editor%202024-07-26%2010-08-30.mp4'],
        thumbnail: '/images/portfolio_thumbnail.webp',
        title: 'Portfolio Website',
        sinopsis: 'Personal Portfolio',
        description: 'Website Portfolio ini dibuat menggunakan teknologi React.js, TailwindCSS dan JavaScript. Website ini dibuat untuk memperkenalkan diri saya ke semua orang mengenai diri saya, keahlian saya, project-project yang saya miliki, bahkan kita bisa saling menghubungi satu-sama lain melalui platform yang telah tertera dibagian Contact',
        tags: ['React.js', 'Javascript', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS'],
        techIcons: [<FaReact />, <SiJavascript />, <SiNextdotjs />, <SiTailwindcss />, <FaHtml5 />, <FaCss3 />],
        date: '2025-04-05',
        liveUrl: 'https://gorudentaiga.vercel.app',
        repoUrl: 'https://github.com/GorudenTaiga/portfolio'
    },
    {
        image: ['/images/jelajah/scr1.jpeg', '/videos/jelajah_vid.webm', '/images/jelajah/scr2.jpeg', '/images/jelajah/scr3.jpeg', '/images/jelajah/scr4.jpeg', '/images/jelajah/scr5.jpeg', '/images/jelajah/scr6.jpeg', '/images/jelajah/scr7.jpeg', '/images/jelajah/scr8.jpeg', '/images/jelajah/scr9.jpeg', '/images/jelajah/scr10.jpeg', '/images/jelajah/scr11.jpeg'],
        thumbnail: '/images/jelajah/scr1.jpeg',
        title: 'Jelajah Nusantara',
        sinopsis: 'Game menjelajah Indonesia',
        description: 'Game Jelajah Nusantara adalah sebuah game yang ditujukan sebagai sebuah bentuk digitalisasi daripada Indonesia.\nPada game ini, player difasilitasi untuk menjelajahi berbagai keragaman adat, suku, budaya, serta berbagai macam khas dari daerah masing-masing yang berada di Indonesia.\nDengan menggunakan Unreal Engine 5 sebagai sarana pembuatan game ini, membuat game ini memiliki grafis dan mekanisme yang menyerupai aslinya',
        tags: ['Unreal Engine 5', 'Blender 3D', 'Games', 'Metahuman', 'Sketchfab'],
        techIcons: [<SiUnrealengine />, <SiBlender />, <SiGamedeveloper />],
        date: '2023-04-28',
        liveUrl: 'https://nusantara.digital/',
        repoUrl: null
    }
];

export default projects;