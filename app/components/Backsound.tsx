'use client';
import { useState, useRef, useEffect } from 'react';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

export default function Backsound() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [isMuted, setIsMuted] = useState(false)

    const toggleMute = () => {
        if (!audioRef.current) return
        if (isMuted) {
            audioRef.current.play().catch(() => {})
        } else {
            audioRef.current.pause()
        }
        setIsMuted(!isMuted)
    }

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return
        audio.volume = 0.2
        audio.loop = true
        audio.play().catch(() => {})
    }, [])

    return (
        <div className='fixed bottom-4 right-4 z-50'>
            <button onClick={() => toggleMute()} className='bg-zinc-800/80 hover:bg-zinc-700 p-2 rounded-full text-white backdrop-blur'>
                {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
                <audio src="/backsound.mp3" ref={audioRef}></audio>
            </button>
        </div>
    )
}