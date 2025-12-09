import React from "react";
import { SlideLayout } from "../SlideLayout";
import { motion } from "framer-motion";
import { TextAnimation } from "../TextAnimation";

const TrophyIcon = () => (
  <svg
    className="w-28 h-28 relative z-10 drop-shadow-2xl"
    viewBox="0 0 64 64"
    fill="none"
  >
    <defs>
      <linearGradient id="trophyBody" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="50%" stopColor="#facc15" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
      <linearGradient id="trophyBase" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#e5e7eb" />
        <stop offset="100%" stopColor="#9ca3af" />
      </linearGradient>
    </defs>

    <path d="M16 18C12 18 9 21 9 25C9 30 12.5 34 18 35" stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round" />
    <path d="M48 18C52 18 55 21 55 25C55 30 51.5 34 46 35" stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round" />

    <path
      d="M20 14H44V26C44 32 39.5 38 32 38C24.5 38 20 32 20 26V14Z"
      fill="url(#trophyBody)"
      stroke="#fbbf24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M32 19L33.7 22.8L37.8 23.1L34.6 25.8L35.6 29.8L32 27.7L28.4 29.8L29.4 25.8L26.2 23.1L30.3 22.8L32 19Z"
      fill="#fef9c3"
    />

    <rect x="28" y="38" width="8" height="6" rx="2" fill="url(#trophyBody)" />

    <rect x="24" y="46" width="16" height="4" rx="1" fill="url(#trophyBase)" />
    <rect x="22" y="50" width="20" height="4" rx="1" fill="url(#trophyBase)" />
  </svg>
);

export const TopContestSlide = ({ data }) => {
  const contest = data.topContest;

  return (
    <SlideLayout gradientStart="#0ea5e9" gradientEnd="#0369a1">
      <div className="flex-1 flex flex-col items-center justify-center text-center">

        <TextAnimation
          text="Your Best Contest Performance."
          className="text-xl font-mono text-sky-100 mb-8 uppercase tracking-widest"
        />

        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1.2 }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-sky-300/20 blur-3xl rounded-full"></div>
          <TrophyIcon />
        </motion.div>

        <TextAnimation
          text={contest.name}
          className="text-xl font-serif text-sky-100/80 mb-3 tracking-wide"
          delay={0.3}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="relative mt-10 w-full flex items-center justify-center"
        >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className="text-[8rem] md:text-[10rem] font-black text-white/5 tracking-tighter leading-none">
                    RANK
                </span>
            </div>
            
            <div className="relative z-10 text-center">
                <motion.div
                    initial={{ scale: 0.8, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 1, type: "spring" }}
                >
                    <p className="text-6xl md:text-7xl font-black text-white font-mono tracking-tight drop-shadow-2xl">
                        #{contest.rank}
                    </p>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-2 flex items-center justify-center gap-2"
                >
                    <div className="h-[1px] w-8 bg-sky-400/50"></div>
                    <p className="text-sky-300 text-xs font-bold tracking-[0.3em] uppercase">
                        Global Standing
                    </p>
                    <div className="h-[1px] w-8 bg-sky-400/50"></div>
                </motion.div>
            </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
            className="mt-12 px-6 py-2 border border-sky-500/30 rounded-full bg-sky-900/20 backdrop-blur-sm"
        >
            <p className="text-sm text-sky-200 font-mono">
                Outperforming the crowd.
            </p>
        </motion.div>

      </div>
    </SlideLayout>
  );
};

export default TopContestSlide;
