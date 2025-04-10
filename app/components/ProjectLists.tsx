'use client';
import { FaLaravel, FaReact, FaHtml5, FaGithub, FaCss3 } from 'react-icons/fa';
import { SiJavascript, SiUnrealengine, SiTailwindcss, SiNextdotjs, SiBlender, SiGamedeveloper } from 'react-icons/si';


const projects = [
    {
        id: 0,
        image: ['/images/portfolio_thumbnail.webp', '/videos/portfolio_video1.webp'],
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
        id: 1,
        image: ['/videos/jelajah_vid.webm', '/images/jelajah/scr1.jpeg', '/images/jelajah/scr2.jpeg', '/images/jelajah/scr3.jpeg', '/images/jelajah/scr4.jpeg', '/images/jelajah/scr5.jpeg', '/images/jelajah/scr6.jpeg', '/images/jelajah/scr7.jpeg', '/images/jelajah/scr8.jpeg', '/images/jelajah/scr9.jpeg', '/images/jelajah/scr10.jpeg', '/images/jelajah/scr11.jpeg'],
        thumbnail: '/images/jelajah/scr1.jpeg',
        title: 'Jelajah Nusantara',
        sinopsis: 'Game menjelajah Indonesia',
        description: 'Game Jelajah Nusantara adalah sebuah game yang ditujukan sebagai sebuah bentuk digitalisasi daripada Indonesia.\nPada game ini, player difasilitasi untuk menjelajahi berbagai keragaman adat, suku, budaya, serta berbagai macam khas dari daerah masing-masing yang berada di Indonesia.\nDengan menggunakan Unreal Engine 5 sebagai sarana pembuatan game ini, membuat game ini memiliki grafis dan mekanisme yang menyerupai aslinya',
        tags: ['Unreal Engine 5', 'Blender 3D', 'Games', 'Metahuman', 'Sketchfab'],
        techIcons: [<SiUnrealengine />, <SiBlender />, <SiGamedeveloper />],
        date: '2023-04-28',
        liveUrl: 'https://nusantara.digital/',
        repoUrl: null
    },
    {
        id: 2,
        image: ['/videos/litedex_cinematic.webm', '/images/litedex/litedex_thumbnail.png', '/images/litedex/litedex1.png', '/images/litedex/litedex2.png'],
        thumbnail: '/images/litedex/litedex_thumbnail.png',
        title: 'Cyber DEX',
        sinopsis: 'Game mengenai Cyber Security',
        description: 'Game Litedex adalah sebuah game yang mana pemain akan melakukan sebuah percobaan peretasan pada sebuah gedung yang bernama Litedex, dan disana player diharuskan untuk menemukan cara supaya player dapat memasuki gedung tersebut, lalu player juga diharuskan untuk mengambil data dari perusahaan Litedex tersebut.',
        tags: ['Unreal Engine', 'Blender 3D', 'Games', 'Metahuman'],
        techIcons: [<SiUnrealengine />, <SiBlender />, <SiGamedeveloper />],
        date: '2023-07-03',
        liveUrl: null,
        repoUrl: null
    },
    {
        id: 3,
        image: ['/videos/pendopo_vid.webm', '/images/pendopo/pendopo1.png', 'images/pendopo/pendopo2.png'],
        thumbnail: '/images/pendopo/pendopo1.png',
        title: 'Pendopo',
        sinopsis: 'Rumah adat Jogja',
        description: 'Sebuah tempat untuk menunjukkan rumah adat jogja yang bernama Pendopo, dan ini adalah project pertamaku ketika berada di PT. Jivaloka Prasanna Sanasi',
        tags: ['Unreal Engine', 'Blender 3D', 'Games', 'Metahuman'],
        techIcons: [<SiUnrealengine />, <SiBlender />, <SiGamedeveloper />],
        date: '2023-02-28',
        liveUrl: null,
        repoUrl: null
    }
];

export default projects;