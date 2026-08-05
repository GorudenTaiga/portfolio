'use client';
import { useState, useRef, useEffect } from 'react';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

export default function Backsound() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [isMuted, setIsMuted] = useState(true)
    const [started, setStarted] = useState(false)

    const toggleMute = () => {
        if (!audioRef.current) return
        if (!started) setStarted(true)
        if (isMuted) {
            audioRef.current.play().catch(() => {setTimeout(() => audioRef.current?.play(), 5000)})
        } else {
            audioRef.current.pause()
        }
        setIsMuted(!isMuted)
    }

    useEffect(() => {
        if (!started || !audioRef.current) return
        audioRef.current.volume = 0.2
        audioRef.current.loop = true
    }, [started])

    return (
        <div className='fixed bottom-4 right-4 z-50'>
            <button
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
                className='bg-zinc-800/80 hover:bg-zinc-700 p-2 rounded-full text-white backdrop-blur'
            >
                {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
            </button>
            {started && (
                <audio
                    src="https://rqbcrttxfhxmcaxiropg.supabase.co/storage/v1/object/public/storage/audios/backsound.mp3"
                    ref={audioRef}
                    preload="none"
                />
            )}
        </div>
    )
}