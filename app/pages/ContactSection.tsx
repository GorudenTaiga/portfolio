'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors: { name?: string; email?: string; message?: string } = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        if (!validate()) return;

        setLoading(true);

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            setLoading(false);
            setSuccess(false);
            console.error('EmailJS config is missing. Please check NEXT_PUBLIC_EMAILJS_* variables.');
            alert('Email service is not configured yet. Please contact site owner.');
            return;
        }
        emailjs.send(
            serviceId,
            templateId,
            {
                name: formData.name,
                email: formData.email,
                message: formData.message
            },
            publicKey
        )
        .then(() => {
            setLoading(false);
            setSuccess(true);
            setFormData({ name: '', email: '', message: '' });
        })
        .catch((e) => {
            setLoading(false);
            setSuccess(false);
            console.error('EmailJS error:', e);
            alert('Failed to send message. Please try again later.');
        });
    };

    // Auto-hide success after 5s
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    return (
        <motion.section
            id="contact"
            className='min-h-screen flex flex-col justify-center items-center px-4 py-16 md:py-24 font-inter'
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1, ease: 'easeOut' }}
        >
                <h2 className='text-3xl md:text-5xl font-bold text-center mb-8 text-white'>Contact Me</h2>

                <form onSubmit={sendEmail} className='flex flex-col gap-4 w-full max-w-xl'>
                    <div>
                        <label htmlFor="contact-name" className="sr-only">Your name</label>
                        <input
                            id="contact-name"
                            type="text"
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Your name'
                            required
                            className='p-3 rounded-lg bg-zinc-800 text-white border border-white/10 focus:border-indigo-500/60 focus:outline-none transition-colors w-full'
                        />
                        {errors.name && <p className='text-red-400 text-sm mt-1'>{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="contact-email" className="sr-only">Your email</label>
                        <input
                            id="contact-email"
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Your email'
                            required
                            className='p-3 rounded-lg bg-zinc-800 text-white border border-white/10 focus:border-indigo-500/60 focus:outline-none transition-colors w-full'
                        />
                        {errors.email && <p className='text-red-400 text-sm mt-1'>{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="contact-message" className="sr-only">Your message</label>
                        <textarea
                            id="contact-message"
                            name='message'
                            value={formData.message}
                            onChange={handleChange}
                            placeholder='Your message'
                            rows={4}
                            required
                            className='p-3 rounded-lg bg-zinc-800 text-white border border-white/10 focus:border-indigo-500/60 focus:outline-none transition-colors resize-none w-full'
                        ></textarea>
                        {errors.message && <p className='text-red-400 text-sm mt-1'>{errors.message}</p>}
                    </div>
                    <button
                        type='submit'
                        disabled={loading}
                        className='min-h-11 bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded font-semibold transition-all disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300'
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>

                    {success && <p role="status" className='text-green-400 mt-2 text-center'>Message sent successfully! I&apos;ll get back to you soon.</p>}
                </form>
                <p className="mt-5 text-sm text-zinc-400 text-center">
                    Prefer direct chat?{' '}
                    <a
                        href="https://wa.me/6287743160171"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-300 hover:text-indigo-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 rounded"
                    >
                        Message me on WhatsApp
                    </a>
                </p>
            </motion.section>

    )
}
