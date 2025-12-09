import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { TitleSlide } from './slides/TitleStory';
import { TotalProblemsSlide } from './slides/TotalProblemsSlide';
import { ActiveMonthSlide } from './slides/ActiveMonthSlide';
import { TopPlatformSlide } from './slides/TopPlatformSlide';
import { TotalContestsParticipatedSlide } from './slides/TotalContestsParticipatedSlide';
import { TopContestSlide } from './slides/TopContestSlide';
import { MonthWiseSlide } from './slides/MonthWiseSlide';
import { SummarySlide } from './slides/SummarySlide';
import CloseIcon from '../../assets/rewind/Close.svg';
import PlayIcon from '../../assets/rewind/play.svg';
import PauseIcon from '../../assets/rewind/pause.svg';


const SLIDE_DURATION_MS = 5000;

const SlideType = {
  TITLE: 0,
  TOTAL_PROBLEMS_SOLVED: 1,
  ACTIVE_MONTH: 2,
  TOP_PLATFORM: 3,
  TOTAL_CONTESTS_PARTICIPATED: 4,
  TOP_CONTEST: 5,
  MONTH_WISE_REPORT: 6,
  SUMMARY: 7
};

export const StoryContainer = ({ data, onComplete, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const isPaused = isHolding || isManuallyPaused;
  const totalSlides = 8;
  const progressIntervalRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const handleNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
      setProgress(0);
      setIsManuallyPaused(false);
    } else {
      onComplete();
    }
  }, [currentSlide, onComplete]);

  const handlePrev = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      setProgress(0);
      setIsManuallyPaused(false);
    }
  }, [currentSlide]);

  // Timer Logic
  useEffect(() => {
    if (isPaused) return;

    const startTime = Date.now();
    const startProgress = progress;

    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(100, startProgress + (elapsed / SLIDE_DURATION_MS) * 100);
      
      setProgress(newProgress);

      if (newProgress < 100) {
        progressIntervalRef.current = requestAnimationFrame(animateProgress);
      } else {
        handleNext();
      }
    };

    progressIntervalRef.current = requestAnimationFrame(animateProgress);

    return () => {
      if (progressIntervalRef.current) cancelAnimationFrame(progressIntervalRef.current);
    };
  }, [currentSlide, isPaused, handleNext]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === ' ') {
        e.preventDefault(); // Prevent scrolling
        setIsManuallyPaused(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Gestures
  const touchStartX = useRef(0);
  const longPressTimer = useRef(null);

  const handlePointerDown = (e) => {
    if ((e.target).closest('button, a, input')) return;

    touchStartX.current = e.clientX;
    setIsHolding(true);
    
    longPressTimer.current = window.setTimeout(() => {
    }, 200);
  };

  const handlePointerUp = (e) => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    setIsHolding(false);

    if ((e.target).closest('button, a, input')) return;

    const diff = e.clientX - touchStartX.current;
    
    if (Math.abs(diff) < 10) {
      const screenWidth = window.innerWidth;
      if (e.clientX < screenWidth / 3) {
        handlePrev();
      } else {
        handleNext();
      }
    }
  };

  const renderSlide = () => {
    switch (currentSlide) {
      case SlideType.TITLE: return <TitleSlide data={data} />;
      case SlideType.TOTAL_PROBLEMS_SOLVED: return <TotalProblemsSlide data={data} />;
      case SlideType.ACTIVE_MONTH: return <ActiveMonthSlide data={data} />;
      case SlideType.TOP_PLATFORM: return <TopPlatformSlide data={data} />;
      case SlideType.TOTAL_CONTESTS_PARTICIPATED: return <TotalContestsParticipatedSlide data={data} />;
      case SlideType.TOP_CONTEST: return <TopContestSlide data={data} />;
      case SlideType.MONTH_WISE_REPORT: return <MonthWiseSlide data={data} />;
      case SlideType.SUMMARY: return <SummarySlide data={data} />;
      default: return <div className="text-white flex items-center justify-center h-full">Slide {currentSlide + 1} Coming Soon</div>;
    }
  };

  return (
    <div 
      className="fixed inset-0 w-full h-[100dvh] bg-black select-none cursor-pointer overflow-hidden touch-none"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => setIsHolding(false)}
    >
      {/* Progress Bar */}
      <div className="absolute top-4 left-2 right-2 flex gap-1 z-50">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <div key={idx} className="h-1 flex-1 bg-neutral-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white"
              style={{ 
                width: idx < currentSlide ? '100%' : idx === currentSlide ? `${progress}%` : '0%' 
              }}
            />
          </div>
        ))}
      </div>

      <div className="absolute top-8 right-4 z-50 flex items-center gap-2">
        <button 
          onClick={(e) => { e.stopPropagation(); setIsManuallyPaused(!isManuallyPaused); }}
          className="opacity-50 hover:opacity-100 p-2 hover:bg-white/10 rounded-full transition-all"
        >
          {isManuallyPaused ? (
            <img src={PlayIcon} alt="Play" className="w-5 h-5" />
          ) : (
            <img src={PauseIcon} alt="Pause" className="w-5 h-5" />
          )}
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="opacity-50 hover:opacity-100 p-2 hover:bg-white/10 rounded-full transition-all"
        >
          <img src={CloseIcon} alt="Close" className='w-5' />
        </button>
      </div>

      <AnimatePresence mode="popLayout" initial={false}>
        <div key={currentSlide} className="w-full h-full">
          {renderSlide()}
        </div>
      </AnimatePresence>
    </div>
  );
};