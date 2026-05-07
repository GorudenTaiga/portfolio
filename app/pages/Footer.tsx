'use client';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaDiscord } from "react-icons/fa";
import { SiWhatsapp } from "react-icons/si";
import { motion } from 'framer-motion';

export default function Footer({ displayName = 'GorudenTaiga', isPrivate = false }) {
    interface Social {
        icon: React.ReactNode;
        label: string;
        link: string;
        public: boolean;
        private: boolean;
    }

    const socials: Social[] = [
        { icon: <FaGithub />, label: 'GitHub', link: 'https://github.com/GorudenTaiga', public: true, private: true },
        { icon: <FaLinkedin />, label: 'LinkedIn', link: 'https://www.linkedin.com/in/reza-arfana-rafi-301989272/', public: false, private: true },
        { icon: <FaInstagram />, label: 'Instagram', link: 'https://www.instagram.com/reza_ar2706/', public: false, private: true },
        { icon: <FaInstagram />, label: 'Instagram', link: 'https://www.instagram.com/gorudentaiga27/', public: true, private: false},
        { icon: <FaFacebook />, label: 'Facebook', link: 'https://www.facebook.com/profile.php?id=100079582329887', public: true, private: true },
        { icon: <FaDiscord />, label: 'Discord', link: 'https://discordapp.com/users/gorudentaiga', public: true, private: true },
        { icon: <SiWhatsapp />, label: 'WhatsApp', link: 'https://wa.me/6287743160171', public: true, private: true }
    ];

    return (
        <motion.footer
            className="w-full bg-zinc-900 text-center text-sm text-zinc-400 py-8 bottom-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <p className="text-zinc-400 text-sm mb-4">
                &copy; {new Date().getFullYear()} {displayName}. All rights reserved.
            </p>
            <p className="text-zinc-300 text-sm mb-4">
                Open to collaboration and freelance work.
            </p>
            <a
                href="#contact"
                className="min-h-11 inline-flex items-center justify-center mb-5 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
            >
                Start a Project With Me
            </a>

            <div className="flex justify-center gap-6">
                {socials.map((social, index) => (
                    (isPrivate ? social.private : social.public) && (
                        <motion.a
                            key={index}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${social.label}`}
                            title={social.label}
                            className="w-11 h-11 flex items-center justify-center text-zinc-400 hover:text-indigo-400 text-2xl rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                            whileHover={{ scale: 1.2 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            {social.icon}
                        </motion.a>
                    )
                ))}
            </div>
        </motion.footer>
    )
}
