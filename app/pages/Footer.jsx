'use client';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaDiscord } from "react-icons/fa";
import { motion } from 'framer-motion';

export default function Footer({ displayName = 'Reza Arfana Rafi', isReza = true }) {
    const socials = [
        { icon: <FaGithub />, link: 'https://github.com/GorudenTaiga', public: true, private: true },
        { icon: <FaLinkedin />, link: 'https://www.linkedin.com/in/reza-arfana-rafi-301989272/', public: false, private: true },
        { icon: <FaInstagram />, link: 'https://www.instagram.com/reza_ar2706/', public: false, private: true },
        { icon: <FaInstagram />, link: 'https://www.instagram.com/gorudentaiga27/', public: true, private: false},
        { icon: <FaFacebook />, link: 'https://www.facebook.com/profile.php?id=100079582329887', public: true, private: true },
        { icon: <FaDiscord />, link: 'https://discordapp.com/users/gorudentaiga', public: true, private: true }
    ];

    return (
        <footer className="w-full bg-zinc-900 text-center text-sm text-zinc-400 py-4 bottom-0">
            <p className="text-zinc-400 text-sm mb-4">
                &copy; {new Date().getFullYear()} {displayName}. All rights reserved.
            </p>

            <div className="flex justify-center gap-6">
                {socials.map((social, index) => (
                    (isReza ? social.private : social.public) && (
                        <motion.a
                            key={index}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-indigo-400 text-2xl"
                            whileHover={{ scale: 1.2 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            {social.icon}
                        </motion.a>
                    )
                ))}
            </div>
        </footer>
    )
}