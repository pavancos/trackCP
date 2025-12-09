import { SlideLayout } from '../SlideLayout';
import { motion } from 'framer-motion';
import { TextAnimation } from '../TextAnimation';
import SwordsIcon from '../../../assets/rewind/swords.svg';

export const TotalContestsParticipatedSlide = ({ data }) => {
  const total = data.totalContestsParticipated;

  return (
    <SlideLayout gradientStart="#d97706" gradientEnd="#78350f">
      <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10">
        
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-6"
        >
            <img src={SwordsIcon} alt="Arena" className="w-20 h-20 opacity-80" />
        </motion.div>

        <TextAnimation
          text="TOTAL CONTESTS"
          className="text-lg font-mono text-yellow-200/80 mb-2 tracking-[0.3em] uppercase"
        />

        <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="relative"
        >
            <h1 className="text-8xl md:text-9xl font-black text-white tracking-tighter drop-shadow-2xl">
                {total}
            </h1>
        </motion.div>

        <TextAnimation
          text="Participated"
          className="text-3xl font-serif italic text-yellow-100 mt-2"
          delay={0.8}
        />

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 px-6 py-2 border border-yellow-500/30 rounded-full bg-yellow-900/20 backdrop-blur-sm"
        >
            <p className="text-sm text-yellow-200 font-mono">
                You showed up to the arena.
            </p>
        </motion.div>

      </div>
    </SlideLayout>
  );
};

export default TotalContestsParticipatedSlide;
