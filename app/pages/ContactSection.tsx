'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Footer from './Footer';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const services = String(process.env.MAIL_SERVICE);
        const template = String(process.env.MAIL_TEMPLATE);
        const mailApi = String(process.env.MAIL_API);
        emailjs.send(
            services,
            template,
            {
                name: formData.name,
                email: formData.email,
                message: formData.message
            },
            mailApi
        )
        .then(() => {
            setLoading(false);
            setSuccess(true);
            setFormData({ name: '', email: '', message: '' });
        })
        .catch((e) => {
            setLoading(false);
            alert("Failed to send message. Try again later")
            console.log(e);
        })
    }

    return (
        <>
            <motion.section
                id="contact"
                className='py-20 px-4 max-w-3xl mx-auto'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className='text-3xl font-bold text-center mb-8 text-white'>Contact Me</h2>

                <form onSubmit={sendEmail} className='flex flex-col gap-4'>
                    <input
                        type="text"
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='Your name'
                        required
                        className='p-3 rounded bg-zinc-800 text-white'
                    />
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Your email'
                        required
                        className='p-3 rounded bg-zinc-800 text-white'
                    />
                    <textarea
                        name='message'
                        value={formData.message}
                        onChange={handleChange}
                        placeholder='Yoru message'
                        required
                        className='p-3 rounded bg-zinc-800 text-white'
                    >
                    </textarea>
                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded font-semibold transition-all'
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>

                    {success && <p className='text-green-400 mt-2'>Message sent successfully!</p>}
                </form>
            </motion.section>
        </>
    )
}