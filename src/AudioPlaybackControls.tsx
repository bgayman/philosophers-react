import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward, faGauge } from '@fortawesome/free-solid-svg-icons';
import colors from './color';

interface AudioPlaybackControlsProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  onPlayPause: () => void;
}

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);
  
  return parts.join(' ');
};

const AudioPlaybackControls: React.FC<AudioPlaybackControlsProps> = ({
  audioRef,
  isPlaying,
  onPlayPause
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [audioRef]);

  const handleSkipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 15;
    }
  };

  const handleSkipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 15;
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  const handlePlaybackRateChange = () => {
    if (!audioRef.current) return;
    const rates = [1, 1.25, 1.5, 1.75, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
    audioRef.current.playbackRate = nextRate;
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '600px',
      backgroundColor: colors.white,
      borderTop: `4px solid ${colors.tan}`,
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      zIndex: 100
    }}>
      {/* Progress bar */}
      <div 
        ref={progressRef}
        onClick={handleProgressClick}
        style={{
          width: '100%',
          height: '4px',
          backgroundColor: `${colors.black}20`,
          borderRadius: '2px',
          cursor: 'pointer',
          position: 'relative'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${(currentTime / duration) * 100}%`,
            backgroundColor: colors.blue,
            borderRadius: '2px'
          }}
        />
      </div>
      
      {/* Time display */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '12px',
        color: `${colors.black}80`,
      }}>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        marginTop: '8px'
      }}>
        <button 
          onClick={handlePlaybackRateChange}
          style={{
            background: 'none',
            border: 'none',
            color: `${colors.black}80`,
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <FontAwesomeIcon icon={faGauge} />
          <span style={{ fontSize: '14px' }}>{playbackRate}x</span>
        </button>
        
        <button 
          onClick={handleSkipBackward}
          style={{
            background: 'none',
            border: 'none',
            color: `${colors.black}80`,
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <FontAwesomeIcon icon={faBackward} />
          <span style={{ fontSize: '12px' }}>15</span>
        </button>
        
        <button 
          onClick={onPlayPause}
          style={{
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '24px',
            backgroundColor: colors.blue,
            color: colors.white,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="lg" />
        </button>
        
        <button 
          onClick={handleSkipForward}
          style={{
            background: 'none',
            border: 'none',
            color: `${colors.black}80`,
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <FontAwesomeIcon icon={faForward} />
          <span style={{ fontSize: '12px' }}>15</span>
        </button>
      </div>
    </div>
  );
};

export default AudioPlaybackControls;