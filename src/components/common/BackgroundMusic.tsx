import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AUDIO_SRC = '/mickeyscat-moment-of-peace-mickeyscat-554494.mp3';
const DEFAULT_VOLUME = 0.28;

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      return localStorage.getItem('portfolio_music_muted') === 'true';
    } catch {
      return false;
    }
  });
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Initialize Audio
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = DEFAULT_VOLUME;
    audioRef.current = audio;

    // Listen to play/pause events directly on the audio element
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    // Browser autoplay policy: attempt playback on the first user interaction
    const handleFirstInteraction = () => {
      setHasInteracted(true);
      const userMuted = localStorage.getItem('portfolio_music_muted') === 'true';
      if (!userMuted && audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay blocked or suppressed
          });
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.pause();
      audio.src = '';
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const togglePlayback = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setIsMuted(true);
      try {
        localStorage.setItem('portfolio_music_muted', 'true');
      } catch {}
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
          try {
            localStorage.setItem('portfolio_music_muted', 'false');
          } catch {}
        })
        .catch((err) => {
          console.warn('Playback request was prevented:', err);
        });
    }
  };

  return (
    <div
      className="fixed bottom-6 left-6 z-40 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex items-center">
        {/* Floating Ambient Audio Button */}
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? 'Mute Background Audio' : 'Play Background Audio'}
          className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full border backdrop-blur-md transition-all duration-300 shadow-xl ${
            isPlaying
              ? 'bg-[#080D16]/90 border-orange-500/50 shadow-orange-500/15 text-white hover:border-orange-400'
              : 'bg-[#080D16]/70 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          {/* Animated EQ Bars */}
          <div className="flex items-end gap-[3px] h-3.5 w-3.5">
            <span
              className={`w-[2.5px] rounded-full transition-all duration-300 ${
                isPlaying
                  ? 'bg-orange-400 animate-[pulse_0.8s_ease-in-out_infinite] h-3'
                  : 'bg-slate-600 h-1.5'
              }`}
            />
            <span
              className={`w-[2.5px] rounded-full transition-all duration-300 ${
                isPlaying
                  ? 'bg-amber-400 animate-[pulse_1.2s_ease-in-out_infinite_0.2s] h-3.5'
                  : 'bg-slate-600 h-1'
              }`}
            />
            <span
              className={`w-[2.5px] rounded-full transition-all duration-300 ${
                isPlaying
                  ? 'bg-blue-400 animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-2.5'
                  : 'bg-slate-600 h-2'
              }`}
            />
          </div>

          {/* Sound State Label */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider font-semibold">
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-orange-200 hidden sm:inline">SOUND ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-slate-400 hidden sm:inline">SOUND OFF</span>
              </>
            )}
          </div>
        </button>

        {/* Hover Track Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10, y: 0 }}
              animate={{ opacity: 1, x: 14, y: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.2 }}
              className="absolute left-full top-1/2 -translate-y-1/2 ml-1 px-3 py-1.5 rounded-lg bg-[#05070B]/95 border border-slate-700/80 backdrop-blur-md shadow-2xl text-[10px] font-mono text-slate-300 whitespace-nowrap pointer-events-none flex items-center gap-2"
            >
              <Music className="w-3 h-3 text-orange-400 shrink-0" />
              <span>Moment of Peace</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">Mickeyscat</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
export default BackgroundMusic;
