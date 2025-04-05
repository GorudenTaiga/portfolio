'use client';
import { FaLaravel, FaReact, FaHtml5, FaGithub, FaCss3 } from 'react-icons/fa';
import { SiJavascript, SiUnrealengine, SiTailwindcss } from 'react-icons/si';


const projects = [
    {
        image: '/images/portfolio_thumbnail.webp',
        title: 'Portfolio Website',
        sinopsis: 'Personal portfolio built with React, Tailwind, and Framer Motion.',
        description: 'Website Portfolio ini dibuat menggunakan teknologi React.js, TailwindCSS dan JavaScript. Website ini dibuat untuk memperkenalkan diri saya ke semua orang mengenai diri saya, keahlian saya, project-project yang saya miliki, bahkan kita bisa saling menghubungi satu-sama lain melalui platform yang telah tertera dibagian Contact',
        tags: ['React', 'Tailwind CSS', 'Framer Motion'],
        techIcons: [<FaReact />, <SiJavascript />, <SiTailwindcss />],
        date: '2025-04-05',
        liveUrl: null,
        repoUrl: 'https://github.com/GorudenTaiga/portfolio'
    },
    {
        image: '/images/stackoverflow_thumbnail.png',
        title: 'Website Sejuta Umat',
        sinopsis: 'Website penyedia bantuan koding',
        description: 'Website ini adalah sebuah alat bantu dalam permasalahan kodingan, jadi jika kalian memiliki error pada kode kalian, kalian bisa mengunjungi link berikut ini',
        tags: ['JavaScript', 'HTML', 'CSS'],
        techIcons: [<SiJavascript />, <FaHtml5 />, <FaCss3 />],
        date: '2016-01-01',
        liveUrl: 'https://stackoverflow.com/',
        repoUrl: null
    }
];

export default projects;