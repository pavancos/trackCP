import { SlideLayout } from '../SlideLayout';
import { motion } from 'framer-motion';
import { TextAnimation } from '../TextAnimation';
import CodeIcon from '../../../assets/rewind/code.svg';

export const TotalProblemsSlide = ({ data }) => {
  
  return (
    <SlideLayout gradientStart="#059669" gradientEnd="#064e3b">
      <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10">
        
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
             <span className="text-[20rem] font-bold text-white">{`{ }`}</span>
        </div>

        <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8"
        >
            <img src={CodeIcon} alt="Code" className="w-20 h-20 opacity-90 drop-shadow-lg" />
        </motion.div>

        <TextAnimation
          text="PROBLEMS CRUSHED"
          className="text-lg font-mono text-emerald-200/80 mb-4 tracking-[0.3em] uppercase"
        />

        <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="relative"
        >
            <h1 className="text-9xl font-black text-white tracking-tighter drop-shadow-2xl">
                {data.totalProblemsSolved}
            </h1>
        </motion.div>

        <TextAnimation
          text="Logic mastered."
          className="text-2xl font-serif italic text-emerald-100 mt-4"
          delay={0.8}
        />

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 px-6 py-2 border border-emerald-500/30 rounded-full bg-emerald-900/20 backdrop-blur-sm"
        >
            <p className="text-sm text-emerald-200 font-mono">
                One by one. Line by line.
            </p>
        </motion.div>

      </div>
    </SlideLayout>
  );
};